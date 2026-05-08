const pool = require('../config/db.js');

// Etkinlik Ekleme 
const addEvent = async (req, res) => {
    const organizerId = req.user.userId; 
    const { title, eventDate, capacity, price, description, imageUrl: bodyImageUrl } = req.body;

    const finalImageUrl = req.file ? `/uploads/${req.file.filename}` : bodyImageUrl;

    if (!title || !eventDate || !capacity || !price) {
        return res.status(400).json({ error: "Başlık, Tarih, Kontenjan ve Fiyat zorunludur!" });
    }

    try {
        const newEvent = await pool.query(
            `INSERT INTO Events (Organizer_ID, Title, Event_Date, Capacity, Price, Description, Image_URL) 
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [organizerId, title, eventDate, capacity, price, description, finalImageUrl]
        );

        res.status(201).json({ success: true, message: "Etkinlik başarıyla oluşturuldu.", data: newEvent.rows[0] });
    } catch (error) {
        console.error("Etkinlik ekleme hatası:", error.message);
        res.status(500).json({ error: "Sunucu hatası." });
    }
};

// Etkinlikleri Listeleme 
const getAllEvents = async (req, res) => {
    
    try {
        const query = `
            SELECT 
                Event_ID, Title, Description, Capacity, Price, Image_URL,
                TO_CHAR(Event_Date, 'YYYY-MM-DD') as date,
                TO_CHAR(Event_Date, 'HH24:MI') as time
            FROM Events 
            ORDER BY Event_Date ASC`;
            
        const { rows } = await pool.query(query);
        res.status(200).json({ success: true, count: rows.length, data: rows });
    } catch (error) {
        res.status(500).json({ error: "Etkinlikler getirilemedi." });
    }
};

// Etkinlik Detayı 
const getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT *, 
                TO_CHAR(Event_Date, 'YYYY-MM-DD') as date, 
                TO_CHAR(Event_Date, 'HH24:MI') as time 
            FROM Events WHERE Event_ID = $1`;
            
        const { rows } = await pool.query(query, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: "Etkinlik bulunamadı." });
        }
        res.status(200).json({ success: true, data: rows[0] });
    } catch (error) {
        res.status(500).json({ error: "Sunucu hatası." });
    }
};

// Kampanyalı Etkinlikleri Listeleme
const getCampaignEvents = async (req, res) => {
    try {
        
        const query = 'SELECT * FROM Events WHERE "is_campaign" = true';
        
        const result = await pool.query(query);
        
        
        res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ error: "Kampanyalı etkinlikler listelenemedi." });
        console.error("Hata:", error.message);
        
    }
};

module.exports = { 
    addEvent, 
    getAllEvents, 
    getEventById, 
    getCampaignEvents };