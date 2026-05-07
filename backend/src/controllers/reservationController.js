const pool = require('../config/db.js'); // Veritabanı bağlantı dosyanın yolunu kendi projene göre ayarla

const makeReservation = async (req, res) => {
    // 1. Kimliği ve İstekleri Al
    const userId = req.user.userId;
    const { eventId, participantCount } = req.body;

    if (!eventId || !participantCount || participantCount < 1) {
        return res.status(400).json({ error: "Geçerli bir etkinlik ve katılımcı sayısı gereklidir." });
    }

    // 2. Transaction Başlat (pool.query yerine pool.connect ile özel bir istemci alıyoruz)
    const client = await pool.connect();

    try {
        await client.query('BEGIN'); // İşlemleri kilitliyoruz

        // 3. Etkinliği Bul ve Kontenjanı Kontrol Et
        // SENIOR DOKUNUŞU: 'FOR UPDATE' komutu, biz bu işlemi bitirene kadar 
        // başka hiçbir isteğin bu etkinliğin kapasitesini değiştirmesine izin vermez.
        const eventQuery = await client.query(
            "SELECT Capacity, Price FROM Events WHERE Event_ID = $1 FOR UPDATE", 
            [eventId]
        );

        if (eventQuery.rows.length === 0) {
            throw new Error("Etkinlik bulunamadı.");
        }

        const event = eventQuery.rows[0];

        // 4. Kapasite Yeterli mi?
        if (event.capacity < participantCount) {
            throw new Error(`Yetersiz kontenjan. Kalan kapasite: ${event.capacity}`);
        }

        // 5. Ücreti Hesapla ve Rezervasyonu Kaydet
        const totalPrice = event.price * participantCount;

        const resQuery = await client.query(
            `INSERT INTO Reservations (User_ID, Event_ID, Participant_Count, Total_Price) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [userId, eventId, participantCount, totalPrice]
        );

        // 6. Etkinliğin Kapasitesini Düşür
        await client.query(
            "UPDATE Events SET Capacity = Capacity - $1 WHERE Event_ID = $2",
            [participantCount, eventId]
        );

        await client.query('COMMIT'); // Her şey başarılı, değişiklikleri kalıcı yap!

        res.status(201).json({ 
            success: true, 
            message: "Rezervasyon başarıyla oluşturuldu.", 
            data: resQuery.rows[0] 
        });

    } catch (error) {
        await client.query('ROLLBACK'); // Hata varsa hiçbir şeyi değiştirme, geri al!
        console.error("Rezervasyon hatası:", error.message);
        
        // Hata mesajını frontend'e düzgün ilet
        const status = error.message.includes("Yetersiz") || error.message.includes("bulunamadı") ? 400 : 500;
        res.status(status).json({ error: error.message || "Rezervasyon işlemi başarısız." });
    } finally {
        client.release(); // İstemciyi (bağlantıyı) havuza geri bırak ki sistem tıkanmasın
    }
};

const updateReservation = async (req, res) => {
    const { id } = req.params; // Reservation_ID
    const userId = req.user.userId;
    const { newEventId, newParticipantCount } = req.body;

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Mevcut rezervasyonu bul (Güvenlik için User_ID kontrolüyle)
        const oldResQuery = await client.query(
            "SELECT * FROM Reservations WHERE Reservation_ID = $1 AND User_ID = $2",
            [id, userId]
        );

        if (oldResQuery.rows.length === 0) {
            throw new Error("Rezervasyon bulunamadı veya bu işlem için yetkiniz yok.");
        }

        const oldRes = oldResQuery.rows[0];
        const targetEventId = newEventId || oldRes.event_id;
        const targetCount = newParticipantCount || oldRes.participant_count;

        // --- ADIM 1: Eski Etkinliğe Kapasiteyi İade Et ---
        await client.query(
            "UPDATE Events SET Capacity = Capacity + $1 WHERE Event_ID = $2",
            [oldRes.participant_count, oldRes.event_id]
        );

        // --- ADIM 2: Yeni Etkinlikte Yer Var mı Kontrol Et ---
        const eventQuery = await client.query(
            "SELECT Capacity, Price FROM Events WHERE Event_ID = $1 FOR UPDATE",
            [targetEventId]
        );

        if (eventQuery.rows.length === 0) throw new Error("Hedef etkinlik bulunamadı.");
        const event = eventQuery.rows[0];

        if (event.capacity < targetCount) {
            throw new Error(`Yetersiz kontenjan. Mevcut boş yer: ${event.capacity}`);
        }

        // --- ADIM 3: Yeni Kapasiteyi Düş ve Rezervasyonu Güncelle ---
        const newTotalPrice = event.price * targetCount;

        await client.query(
            "UPDATE Events SET Capacity = Capacity - $1 WHERE Event_ID = $2",
            [targetCount, targetEventId]
        );

        const updatedRes = await client.query(
            `UPDATE Reservations 
             SET Event_ID = $1, Participant_Count = $2, Total_Price = $3 
             WHERE Reservation_ID = $4 RETURNING *`,
            [targetEventId, targetCount, newTotalPrice, id]
        );

        await client.query('COMMIT');
        res.status(200).json({ success: true, message: "Rezervasyon güncellendi.", data: updatedRes.rows[0] });

    } catch (error) {
        await client.query('ROLLBACK');
        res.status(400).json({ error: error.message });
    } finally {
        client.release();
    }
};

// 2. Rezervasyonu İptal Etme
const cancelReservation = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Rezervasyonu silmeden önce bilgilerini al (Kapasite iadesi için)
        const resQuery = await client.query(
            "DELETE FROM Reservations WHERE Reservation_ID = $1 AND User_ID = $2 RETURNING *",
            [id, userId]
        );

        if (resQuery.rows.length === 0) {
            throw new Error("İptal edilecek rezervasyon bulunamadı.");
        }

        const deletedRes = resQuery.rows[0];

        // Kapasiteyi Etkinliğe İade Et
        await client.query(
            "UPDATE Events SET Capacity = Capacity + $1 WHERE Event_ID = $2",
            [deletedRes.participant_count, deletedRes.event_id]
        );

        await client.query('COMMIT');
        res.status(200).json({ success: true, message: "Rezervasyon iptal edildi, kontenjan güncellendi." });

    } catch (error) {
        await client.query('ROLLBACK');
        res.status(400).json({ error: error.message });
    } finally {
        client.release();
    }
};

module.exports = { makeReservation, updateReservation, cancelReservation };