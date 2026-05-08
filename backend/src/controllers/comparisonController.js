const pool = require('../config/db.js'); 


// Karşılaştırma için Verileri Toplu Getirme
const getItemsToCompare = async (req, res) => {
    const { ids, type } = req.query; 
    
    if (!ids || !type) return res.status(400).json({ error: "Eksik parametre." });

    const idList = (Array.isArray(ids) ? ids : ids.split(',')).map(id => id.trim());

    try {
        let query;
        if (type === 'Event') {
            query = "SELECT Event_ID, Title, Price, Capacity, Event_Date FROM Events WHERE Event_ID = ANY($1)";
        } else {
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

// Karşılaştırmayı kaydetme
const saveComparison = async (req, res) => {
    const userId = req.user.userId;
    const { comparisonType, itemsData, title } = req.body; 

    if (!comparisonType || !itemsData) {
        return res.status(400).json({ error: "Karşılaştırma tipi ve veri paketi zorunludur." });
    }

    try {
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

//Kayıtlı karşılaştırmaları getirme
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

module.exports = { 
    getItemsToCompare, 
    saveComparison, 
    getSavedComparisons };