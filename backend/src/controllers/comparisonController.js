const pool = require('../config/db.js'); // Veritabanı bağlantı dosyanın yolunu kendi projene göre ayarla

// 1. Karşılaştırma için Verileri Toplu Getirme (Bu kısım aynı kalıyor, ANY ile veri çekiyoruz)
const getItemsToCompare = async (req, res) => {
    const { ids, type } = req.query; 
    
    if (!ids || !type) return res.status(400).json({ error: "Eksik parametre." });

    // Gelen ID'leri diziye çevir ve kenarlarındaki boşlukları (trim) temizle
    const idList = (Array.isArray(ids) ? ids : ids.split(',')).map(id => id.trim());

    try {
        let query;
        if (type === 'Event') {
            query = "SELECT Event_ID, Title, Price, Capacity, Event_Date FROM Events WHERE Event_ID = ANY($1)";
        } else {
            // Senior Dokunuşu: Artworks ve Artists tablolarını JOIN ile birleştiriyoruz.
            // DİKKAT: "art.Name" ve "a.Artist_ID" kısımlarını kendi Artists tablondaki gerçek kolon isimlerine göre düzeltmelisin.
            query = `
                SELECT 
                    a.Artwork_ID, 
                    a.Title, 
                    a.Price, 
                    a.Category, 
                    art.Full_Name AS Artist_Name 
                FROM Artworks a
                INNER JOIN Artists art ON a.Artist_ID = art.Artist_ID
                WHERE a.Artwork_ID = ANY($1)
            `;
        }

        const { rows } = await pool.query(query, [idList]);
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ error: "Veriler getirilemedi." });
    }
};

// 2. Karşılaştırmayı JSONB Olarak Kaydetme (SENİN TABLONA GÖRE GÜNCELLENDİ)
const saveComparison = async (req, res) => {
    const userId = req.user.userId;
    // itemIds yerine artık itemsData (JSON array) alıyoruz
    const { comparisonType, itemsData, title } = req.body; 

    if (!comparisonType || !itemsData) {
        return res.status(400).json({ error: "Karşılaştırma tipi ve veri paketi zorunludur." });
    }

    try {
        // node-postgres kütüphanesi JavaScript objelerini (itemsData) otomatik olarak JSONB'ye çevirir.
        const newSave = await pool.query(
            "INSERT INTO Saved_Comparisons (User_ID, Comparison_Type, Items_Data, Title) VALUES ($1, $2, $3, $4) RETURNING *",
            [userId, comparisonType, JSON.stringify(itemsData), title]
        );
        res.status(201).json({ success: true, message: "Karşılaştırma başarıyla kaydedildi.", data: newSave.rows[0] });
    } catch (error) {
        console.error("Kaydetme hatası:", error.message);
        res.status(500).json({ error: "Kaydetme sırasında hata oluştu." });
    }
};

// EKSTRA: Kaydedilen Karşılaştırmaları Listeleme (Frontend için şart)
const getSavedComparisons = async (req, res) => {
    const userId = req.user.userId;

    try {
        const { rows } = await pool.query(
            "SELECT Comparison_ID, Comparison_Type, Title, Items_Data, Created_At FROM Saved_Comparisons WHERE User_ID = $1 ORDER BY Created_At DESC",
            [userId]
        );
        res.status(200).json({ success: true, count: rows.length, data: rows });
    } catch (error) {
        res.status(500).json({ error: "Karşılaştırmalar getirilemedi." });
    }
};

module.exports = { getItemsToCompare, saveComparison, getSavedComparisons };