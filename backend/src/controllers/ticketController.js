const pool = require('../config/db');

// 1. Yeni Destek Talebi Açma (Transaction İçerir)
const createTicket = async (req, res) => {
    const { subject, message } = req.body;
    const userId = req.user.userId;

    const client = await pool.connect(); // Transaction için özel bağlantı alıyoruz

    try {
        await client.query('BEGIN'); // Gümrük kapılarını kitle, işlem başlıyor!

        // Adım 1: Ana tabloya bileti oluştur
        const ticketResult = await client.query(
            "INSERT INTO Support_Tickets (User_ID, Subject) VALUES ($1, $2) RETURNING Ticket_ID",
            [userId, subject]
        );
        const newTicketId = ticketResult.rows[0].ticket_id;

        // Adım 2: Detay tablosuna ilk mesajı yaz
        await client.query(
            "INSERT INTO Ticket_Messages (Ticket_ID, Sender_ID, Message) VALUES ($1, $2, $3)",
            [newTicketId, userId, message]
        );

        await client.query('COMMIT'); // Her şey başarılı, veritabanına kalıcı olarak yaz.
        res.status(201).json({ success: true, message: "Destek talebiniz başarıyla oluşturuldu.", ticketId: newTicketId });
    } catch (error) {
        await client.query('ROLLBACK'); // Hata çıkarsa her şeyi geri al (Temizlik)
        console.error("Bilet oluşturma hatası:", error.message);
        res.status(500).json({ error: "Destek talebi oluşturulamadı." });
    } finally {
        client.release(); // Bağlantıyı havuza geri bırak (Önemli!)
    }
};

// 2. Kullanıcının Kendi Taleplerini Görüntülemesi
const getMyTickets = async (req, res) => {
    const userId = req.user.userId;
    try {
        const result = await pool.query(
            "SELECT * FROM Support_Tickets WHERE User_ID = $1 ORDER BY Created_At DESC",
            [userId]
        );
        res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ error: "Talepleriniz listelenemedi." });
    }
};

// 3. Mesaj Sistemi (Mevcut Talebe Cevap Yazma)
const replyToTicket = async (req, res) => {
    const { ticketId } = req.params;
    const { message } = req.body;
    const userId = req.user.userId;

    try {
        // Güvenlik: Bu bilet gerçekten bu adama mı ait? (IDOR Koruması)
        const ticketCheck = await pool.query(
            "SELECT * FROM Support_Tickets WHERE Ticket_ID = $1 AND User_ID = $2",
            [ticketId, userId]
        );

        if (ticketCheck.rows.length === 0) {
            return res.status(403).json({ error: "Bu bilete mesaj yazma yetkiniz yok." });
        }

        // Bilet onunsa mesajı ekle
        const result = await pool.query(
            "INSERT INTO Ticket_Messages (Ticket_ID, Sender_ID, Message) VALUES ($1, $2, $3) RETURNING *",
            [ticketId, userId, message]
        );

        res.status(201).json({ success: true, message: "Mesaj gönderildi.", data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: "Mesaj gönderilemedi." });
    }
};

// 4. Biletin İçine Girip Tüm Mesajları Okuma
const getTicketDetails = async (req, res) => {
    const { ticketId } = req.params;
    const userId = req.user.userId;

    try {
        const ticketInfo = await pool.query("SELECT * FROM Support_Tickets WHERE Ticket_ID = $1 AND User_ID = $2", [ticketId, userId]);
        
        if (ticketInfo.rows.length === 0) {
            return res.status(404).json({ error: "Bilet bulunamadı veya erişim izniniz yok." });
        }

        const messages = await pool.query("SELECT * FROM Ticket_Messages WHERE Ticket_ID = $1 ORDER BY Created_At ASC", [ticketId]);

        res.status(200).json({ 
            success: true, 
            ticket: ticketInfo.rows[0],
            messages: messages.rows 
        });
    } catch (error) {
        res.status(500).json({ error: "Bilet detayları alınamadı." });
    }
};

module.exports = { createTicket, getMyTickets, replyToTicket, getTicketDetails };