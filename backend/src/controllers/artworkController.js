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
const deleteArtwork = async (req, res) => {
    // URL'den (parametrelerden) silinecek eserin ID'sini alıyoruz
    const { id } = req.params; 

    try {
        // RETURNING * kısmı önemli; silinen veriyi geri döndürür, böylece gerçekten silindiğinden emin oluruz.
        const result = await pool.query(
            "DELETE FROM Artworks WHERE Artwork_ID = $1 RETURNING *", 
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Silinecek eser bulunamadı veya zaten silinmiş." });
        }

        res.status(200).json({ 
            success: true, 
            message: "Eser veritabanından kalıcı olarak silindi.",
            deletedArtwork: result.rows[0].Title
        });

    } catch (error) {
        console.error("Eser silinirken hata:", error.message);
        res.status(500).json({ error: "Sunucu hatası, eser silinemedi." });
    }
};

module.exports = {
    getAllArtworks,
    deleteArtwork
};