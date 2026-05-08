const pool = require('../config/db');

// Destek Talebi Oluşturma
const createTicket = async (req, res) => {
    const { subject, message } = req.body;
    const userId = req.user.userId;

    const client = await pool.connect(); 

    try {
        await client.query('BEGIN'); 

        const ticketResult = await client.query(
            "INSERT INTO Support_Tickets (User_ID, Subject) VALUES ($1, $2) RETURNING Ticket_ID",
            [userId, subject]
        );
        const newTicketId = ticketResult.rows[0].ticket_id;

        await client.query(
            "INSERT INTO Ticket_Messages (Ticket_ID, Sender_ID, Message) VALUES ($1, $2, $3)",
            [newTicketId, userId, message]
        );

        await client.query('COMMIT'); 
        res.status(201).json({ success: true, message: "Destek talebiniz başarıyla oluşturuldu.", ticketId: newTicketId });
    } catch (error) {
        await client.query('ROLLBACK'); 
        console.error("Bilet oluşturma hatası:", error.message);
        res.status(500).json({ error: "Destek talebi oluşturulamadı." });
    } finally {
        client.release(); 
    }
};

//Talep Listesi (Kullanıcının Kendi Talepleri)
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

// Bilet Detayına Mesaj Yazma
const replyToTicket = async (req, res) => {
    const { ticketId } = req.params;
    const { message } = req.body;
    const userId = req.user.userId;

    try {
        const ticketCheck = await pool.query(
            "SELECT * FROM Support_Tickets WHERE Ticket_ID = $1 AND User_ID = $2",
            [ticketId, userId]
        );

        if (ticketCheck.rows.length === 0) {
            return res.status(403).json({ error: "Bu bilete mesaj yazma yetkiniz yok." });
        }

        const result = await pool.query(
            "INSERT INTO Ticket_Messages (Ticket_ID, Sender_ID, Message) VALUES ($1, $2, $3) RETURNING *",
            [ticketId, userId, message]
        );

        res.status(201).json({ success: true, message: "Mesaj gönderildi.", data: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: "Mesaj gönderilemedi." });
    }
};

// Bilet Detaylarını Görüntüleme
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

// Bilet Durumu Güncelleme (Admin/Manager için)
const updateTicketStatus = async (req, res) => {
    const { ticketId } = req.params;
    const { status } = req.body;
    const userId = req.user.userId;

    const allowedStatuses = ['Open', 'Resolved', 'Closed'];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ error: "Geçersiz statü. Sadece Open, Resolved veya Closed kullanılabilir." });
    }

    try {
        const result = await pool.query(
            "UPDATE Support_Tickets SET Status = $1 WHERE Ticket_ID = $2 AND User_ID = $3 RETURNING *",
            [status, ticketId, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Bilet bulunamadı veya bu işlemi yapmaya yetkiniz yok." });
        }

        res.status(200).json({ 
            success: true, 
            message: `Bilet durumu ${status} olarak güncellendi.`, 
            data: result.rows[0] 
        });
    } catch (error) {
        console.error("Durum güncelleme hatası:", error.message);
        res.status(500).json({ error: "Bilet durumu güncellenemedi." });
    }
};

module.exports = { 
    createTicket, 
    getMyTickets, 
    replyToTicket, 
    getTicketDetails , 
    updateTicketStatus};