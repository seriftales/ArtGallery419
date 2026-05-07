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

module.exports = { makeReservation };