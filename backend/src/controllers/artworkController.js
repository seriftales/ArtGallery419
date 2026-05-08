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

const addArtwork = async (req, res) => {
    // 1. Frontend'den gelen veriyi body'den çıkar
    const { artistId, title, description, price, category, imageUrl: bodyImageUrl } = req.body;

    // Senior Manevrası: Eğer fiziksel dosya gelirse (Multer), onun yolunu al. 
    // Eğer gelmezse (Thunder Client ücretsiz sürüm), body içindeki imageUrl metnini al.
    const finalImageUrl = req.file ? `/uploads/${req.file.filename}` : bodyImageUrl;

    if (!artistId || !title || !price || !finalImageUrl) {
        return res.status(400).json({ error: "Eksik bilgi! Lütfen tüm alanları (veya imageUrl metnini) doldurun." });
    }
    
    // SENİOR DOKUNUŞU: Girdi Doğrulama (Input Validation)
    // Veritabanına inmeden önce zorunlu alanların dolu olduğundan emin ol.
    if (!artistId || !title || !price) {
        return res.status(400).json({ error: "Sanatçı ID, Başlık ve Fiyat alanları zorunludur!" });
    }

    try {
        // 2. Referans Bütünlüğü (Referential Integrity) Kontrolü
        // Frontend saçma sapan bir artistId göndermiş olabilir. Önce o sanatçı gerçekten var mı diye bakıyoruz.
        const checkArtist = await pool.query("SELECT Artist_ID FROM Artists WHERE Artist_ID = $1", [artistId]);
        
        if (checkArtist.rows.length === 0) {
            return res.status(404).json({ error: "Veritabanında bu ID'ye sahip bir sanatçı bulunamadı." });
        }

        // 3. Her şey yolundaysa yeni eseri veritabanına kaydet
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

// Eserin Beğeni Sayısını 1 Artır (Spam'e açık versiyon)
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

module.exports = {
    getAllArtworks,
    deleteArtwork,
    addArtwork,
    incrementLike
};