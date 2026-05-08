const pool = require('../config/db.js'); // Veritabanı bağlantı dosyanın yolunu kendi projene göre ayarla

// 1. Etkinlik Ekleme (Admin İçin - Mocking Destekli)
const addEvent = async (req, res) => {
    // organizerId'yi tokendan (req.user) de alabilirsin, body'den de. 
    // Ama güvenli olan tokendan almaktır (Senin auth yapına göre req.user.userId)
    const organizerId = req.user.userId; 
    const { title, eventDate, capacity, price, description, imageUrl: bodyImageUrl } = req.body;

    // Resim fiziksel gelirse onu, gelmezse body'den gelen metni al
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

// 2. Etkinlikleri Listeleme (Herkese Açık)
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

// 3. Etkinlik Detayı (Herkese Açık)
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

const getCampaignEvents = async (req, res) => {
    console.log("\n--- 🕵️‍♂️ DEBUG BAŞLADI: getCampaignEvents ---");
    try {
        console.log("Adım 1: İstek API'ye ulaştı.");
        
        // Hangi sorgunun çalıştığını net görelim
        const query = 'SELECT * FROM Events WHERE "is_campaign" = true';
        console.log("Adım 2: SQL Sorgusu çalıştırılıyor ->", query);
        
        const result = await pool.query(query);
        
        console.log("Adım 3: Veritabanı cevap verdi. Bulunan satır sayısı:", result.rowCount);
        console.log("--- 🕵️‍♂️ DEBUG BİTTİ (BAŞARILI) ---\n");
        
        res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        console.error("\n🚨 Adım 4: SİSTEM PATLADI! HATA YAKALANDI 🚨");
        console.error("Hata Mesajı (Message):", error.message);
        console.error("Hata Kodu (Code):", error.code); // PostgreSQL hata kodunu verir
        console.error("--- 🕵️‍♂️ DEBUG BİTTİ (HATALI) ---\n");
        
        res.status(500).json({ error: "Kampanyalı etkinlikler listelenemedi." });
    }
};

module.exports = { addEvent, getAllEvents, getEventById, getCampaignEvents };