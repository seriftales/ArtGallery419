const pool = require('../config/db.js'); // Veritabanı bağlantı dosyanın yolunu kendi projene göre ayarla

const addFavorite = async (req, res) => {
    try {
        // SENİOR DOKUNUŞU: req.user, senin yazdığın 'verifyToken' middleware'inden geliyor!
        // Kullanıcının ID'sini frontend'den (req.body'den) ALMIYORUZ, güvenli olan token'dan çekiyoruz.
        const userId = req.user.userId; // Not: Token üretirken id'yi 'user_id' olarak kaydettiğinden emin ol.
        console.log("Token'dan Gelen Veri (req.user):", req.user);
        
        const { artworkId } = req.body;

        if (!artworkId) {
            return res.status(400).json({ error: "Favorilere eklenecek eserin ID'si eksik!" });
        }

        // 1. Eser gerçekten veritabanında var mı? (Data Integrity Kontrolü)
        const checkArtwork = await pool.query("SELECT Artwork_ID FROM Artworks WHERE Artwork_ID = $1", [artworkId]);
        if (checkArtwork.rows.length === 0) {
            return res.status(404).json({ error: "Böyle bir eser bulunamadı." });
        }

        // 2. Bu eser zaten bu kullanıcının favorilerinde var mı? (Primary Key hatası yememek için)
        const checkFavorite = await pool.query(
            "SELECT * FROM Favorites WHERE User_ID = $1 AND Artwork_ID = $2",
            [userId, artworkId]
        );

        if (checkFavorite.rows.length > 0) {
            return res.status(400).json({ error: "Bu eser zaten favorilerinde ekli!" });
        }

        // 3. Her şey yolundaysa eşleştirmeyi yapıp veritabanına yaz.
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

const getFavorites = async (req, res) => {
    try {
        // Yine güvenli limanımız olan token'dan ID'yi alıyoruz
        const userId = req.user.userId;

        // Senior SQL Hamlesi: Sadece favori ID'sini değil, eserin ve sanatçının detaylarını da çekiyoruz.
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

module.exports = { addFavorite, getFavorites };