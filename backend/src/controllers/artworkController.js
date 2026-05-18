const pool = require('../config/db.js'); 

// Tüm eserleri getirme
const getAllArtworks = async (req, res) => {
    try {
        
        const query = `
            SELECT 
                aw.Artwork_ID, 
                aw.Title, 
                aw.Description, 
                aw.Price, 
                aw.Category, 
                aw.Image_URL, 
                aw.Stock_Status,
                aw.View_Count,
                aw.Like_Count,
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

// Eseri Silme 
const deleteArtwork = async (req, res) => {

    const { id } = req.params; 

    try {
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

// Yeni Eser Ekleme
const addArtwork = async (req, res) => {
    const { artistId, title, description, price, category, imageUrl: bodyImageUrl } = req.body;

    const finalImageUrl = req.file ? `/uploads/${req.file.filename}` : bodyImageUrl;

    if (!artistId || !title || !price || !finalImageUrl) {
        return res.status(400).json({ error: "Eksik bilgi! Lütfen tüm alanları  doldurun." });
    }
    
    if (!artistId || !title || !price) {
        return res.status(400).json({ error: "Sanatçı ID, Başlık ve Fiyat alanları zorunludur!" });
    }

    try {
        const checkArtist = await pool.query("SELECT Artist_ID FROM Artists WHERE Artist_ID = $1", [artistId]);
        
        if (checkArtist.rows.length === 0) {
            return res.status(404).json({ error: "Veritabanında bu ID'ye sahip bir sanatçı bulunamadı." });
        }

        const newArtwork = await pool.query(
            `INSERT INTO Artworks (Artist_ID, Title, Description, Price, Category, Image_URL) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [artistId, title, description, price, category, finalImageUrl]
        );

        res.status(201).json({
            success: true,
            message: "Yeni eser başarıyla galeriye eklendi.",
            data: newArtwork.rows[0]
        });

    } catch (error) {
        console.error("Eser eklerken hata:", error.message);
        res.status(500).json({ error: "Sunucu hatası, eser eklenemedi." });
    }
};

// Eseri Beğenme 
const incrementLike = async (req, res) => {
    const { artworkId } = req.params;

    try {
        const result = await pool.query(
            "UPDATE Artworks SET Like_Count = Like_Count + 1 WHERE Artwork_ID = $1 RETURNING Like_Count",
            [artworkId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Eser bulunamadı." });
        }

        res.status(200).json({ 
            success: true, 
            message: "Eser beğenildi.", 
            likes: result.rows[0].like_count 
        });
    } catch (error) {
        res.status(500).json({ error: "Beğeni işlemi başarısız." });
    }
};


// Eseri Görüntüleme (view_count +1)
const incrementView = async (req, res) => {
    const { artworkId } = req.params;
    try {
        const result = await pool.query(
            "UPDATE Artworks SET View_Count = View_Count + 1 WHERE Artwork_ID = $1 RETURNING View_Count",
            [artworkId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Eser bulunamadı." });
        }
        res.status(200).json({ success: true, views: result.rows[0].view_count });
    } catch (error) {
        res.status(500).json({ error: "Görüntülenme artırılamadı." });
    }
};

// Kampanyalı Eserleri Görüntüleme
const getCampaignArtworks = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM Artworks WHERE Is_Campaign = TRUE"
        );
        res.status(200).json({ success: true, data: result.rows });
    } catch (error) {
        res.status(500).json({ error: "Kampanyalı eserler listelenemedi." });
    }
};


module.exports = {
    getAllArtworks,
    deleteArtwork,
    addArtwork,
    incrementLike,
    incrementView,
    getCampaignArtworks
};