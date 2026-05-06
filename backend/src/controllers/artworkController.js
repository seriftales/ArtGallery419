const pool = require('../config/db.js'); // Veritabanı bağlantı dosyanın yolunu kendi projene göre ayarla

// Tüm eserleri getir
const getAllArtworks = async (req, res) => {
    try {
        // Senior Dokunuşu: Sadece Artworks'ü çekmiyoruz, Artists tablosuyla birleştiriyoruz.
        // Çünkü frontend'e "550e8400-e29b-..." gibi bir UUID göndermek hiçbir işe yaramaz.
        const query = `
            SELECT 
                aw.Artwork_ID, 
                aw.Title, 
                aw.Description, 
                aw.Price, 
                aw.Category, 
                aw.Image_URL, 
                aw.Stock_Status,
                ar.Full_Name AS Artist_Name
            FROM Artworks aw
            LEFT JOIN Artists ar ON aw.Artist_ID = ar.Artist_ID
            ORDER BY aw.Created_At DESC;
        `;
        
        const { rows } = await pool.query(query);

        res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });

    } catch (error) {
        console.error("Artworks çekilirken hata:", error.message);
        res.status(500).json({
            success: false,
            message: "Sunucu hatası, eserler getirilemedi."
        });
    }
};

module.exports = {
    getAllArtworks
};