const pool = require('../config/db.js'); 

// Favori Ekleme
const addFavorite = async (req, res) => {
    try {
        const userId = req.user.userId; 
        console.log("Token'dan Gelen Veri (req.user):", req.user);
        
        const { artworkId } = req.body;

        if (!artworkId) {
            return res.status(400).json({ error: "Favorilere eklenecek eserin ID'si eksik!" });
        }

        const checkArtwork = await pool.query("SELECT Artwork_ID FROM Artworks WHERE Artwork_ID = $1", [artworkId]);
        if (checkArtwork.rows.length === 0) {
            return res.status(404).json({ error: "Böyle bir eser bulunamadı." });
        }

        const checkFavorite = await pool.query(
            "SELECT * FROM Favorites WHERE User_ID = $1 AND Artwork_ID = $2",
            [userId, artworkId]
        );

        if (checkFavorite.rows.length > 0) {
            return res.status(400).json({ error: "Bu eser zaten favorilerinde ekli!" });
        }

        await pool.query(
            "INSERT INTO Favorites (User_ID, Artwork_ID) VALUES ($1, $2)",
            [userId, artworkId]
        );

        res.status(201).json({ success: true, message: "Eser başarıyla favorilere eklendi." });

    } catch (error) {
        console.error("Favori ekleme hatası:", error.message);
        res.status(500).json({ error: "Sunucu hatası, favori eklenemedi." });
    }
};

// Favorileri Listeleme
const getFavorites = async (req, res) => {
    try {
        const userId = req.user.userId;

        const query = `
            SELECT 
                a.Artwork_ID,
                a.Title,
                a.Image_URL,
                a.Price,
                ar.Full_Name AS Artist_Name
            FROM Favorites f
            INNER JOIN Artworks a ON f.Artwork_ID = a.Artwork_ID
            LEFT JOIN Artists ar ON a.Artist_ID = ar.Artist_ID
            WHERE f.User_ID = $1;
        `;

        const { rows } = await pool.query(query, [userId]);

        res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });

    } catch (error) {
        console.error("Favoriler getirilirken hata:", error.message);
        res.status(500).json({ error: "Sunucu hatası, favoriler alınamadı." });
    }
};

// Favorilerden Kaldırma
const removeFavorite = async (req, res) => {
    const userId = req.user.userId; 
    const { id: artworkId } = req.params; 

    try {
        const result = await pool.query(
            "DELETE FROM Favorites WHERE User_ID = $1 AND Artwork_ID = $2 RETURNING *",
            [userId, artworkId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Bu eser favorilerinizde bulunamadı." });
        }

        res.status(200).json({ success: true, message: "Eser başarıyla favorilerden çıkarıldı." });

    } catch (error) {
        console.error("Favori silme hatası:", error.message);
        res.status(500).json({ error: "Sunucu hatası, işlem gerçekleştirilemedi." });
    }
};
module.exports = { 
    addFavorite, 
    getFavorites , 
    removeFavorite};