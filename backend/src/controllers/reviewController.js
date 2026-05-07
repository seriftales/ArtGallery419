const pool = require('../config/db.js'); // Veritabanı bağlantı dosyanın yolunu kendi projene göre ayarla

// 1. Yorum Ekleme
const addReview = async (req, res) => {
    const userId = req.user.userId;
    const { targetId, targetType, rating, commentText } = req.body;

    if (!targetId || !targetType || !rating) {
        return res.status(400).json({ error: "Eksik parametre." });
    }

    try {
        // --- 1. GÜVENLİK DUVARI: Çoklu Yorum Engeli ---
        const existingReview = await pool.query(
            "SELECT * FROM Reviews WHERE User_ID = $1 AND Target_ID = $2 AND Target_Type = $3",
            [userId, targetId, targetType]
        );
        if (existingReview.rows.length > 0) {
            return res.status(400).json({ error: "Bu içeriğe zaten yorum yaptınız." });
        }

        // --- 2. GÜVENLİK DUVARI: Polimorfik Veri Doğrulama ve Katılım Kontrolü ---
        if (targetType === 'Event') {
            // Etkinlik var mı?
            const eventCheck = await pool.query("SELECT * FROM Events WHERE Event_ID = $1", [targetId]);
            if (eventCheck.rows.length === 0) return res.status(404).json({ error: "Etkinlik bulunamadı." });

            // Kullanıcı bu etkinliğe katılmış mı? (Rezervasyonu var mı?)
            const attendanceCheck = await pool.query(
                "SELECT * FROM Reservations WHERE User_ID = $1 AND Event_ID = $2",
                [userId, targetId]
            );
            if (attendanceCheck.rows.length === 0) {
                return res.status(403).json({ error: "Sadece katıldığınız (rezervasyon yaptığınız) etkinliklere yorum yapabilirsiniz." });
            }
        } else if (targetType === 'Artwork') {
            // Eser var mı?
            const artworkCheck = await pool.query("SELECT * FROM Artworks WHERE Artwork_ID = $1", [targetId]);
            if (artworkCheck.rows.length === 0) return res.status(404).json({ error: "Eser bulunamadı." });
        } else {
            return res.status(400).json({ error: "Geçersiz Target_Type." });
        }

        // --- 3. KAYIT İŞLEMİ ---
        const newReview = await pool.query(
            "INSERT INTO Reviews (User_ID, Target_ID, Target_Type, Rating, Comment_Text) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [userId, targetId, targetType, rating, commentText]
        );

        res.status(201).json({ success: true, message: "Yorum eklendi.", data: newReview.rows[0] });

    } catch (error) {
        console.error("Yorum ekleme hatası:", error.message);
        res.status(500).json({ error: "Sunucu hatası." });
    }
};

// 2. Yorumları Görüntüleme (Public - Herkes Görebilir)
// 2. Yorumları Görüntüleme (Public - Herkes Görebilir)
const getReviews = async (req, res) => {
    const { targetId } = req.params;
    // Eğer önceki aşamadaki sortBy özelliğini de korumak istersen buraya ekleyebilirsin
    const { sortBy } = req.query; 

    let orderByClause = "ORDER BY r.Created_At DESC"; // Varsayılan

    if (sortBy === 'highest_rating') {
        orderByClause = "ORDER BY r.Rating DESC, r.Created_At DESC";
    } else if (sortBy === 'most_helpful') {
        orderByClause = "ORDER BY r.Helpful_Votes DESC, r.Created_At DESC";
    }

    try {
        // Senin query'ni bozmadan Reply_Text ve Replied_At kolonlarını ekledik
        const query = `
            SELECT 
                r.Review_ID, 
                r.Rating, 
                r.Comment_Text, 
                r.Helpful_Votes,
                r.Reply_Text, -- Yöneticinin yazdığı cevap
                TO_CHAR(r.Replied_At, 'YYYY-MM-DD HH24:MI') as Reply_Date, -- Cevap tarihi
                TO_CHAR(r.Created_At, 'YYYY-MM-DD') as Date,
                u.First_Name, 
                u.Last_Name 
            FROM Reviews r
            INNER JOIN Users u ON r.User_ID = u.User_ID
            WHERE r.Target_ID = $1
            ${orderByClause}
        `;

        const { rows } = await pool.query(query, [targetId]);

        res.status(200).json({ success: true, count: rows.length, data: rows });
    } catch (error) {
        console.error("Yorumları çekme hatası:", error.message);
        res.status(500).json({ error: "Yorumlar getirilemedi." });
    }
};

// 2. Faydalı Bulma Oyu Verme
const voteReview = async (req, res) => {
    const { reviewId } = req.params;

    try {
        // Senior Uyarısı: Burada normalde 'User_ID' ile kontrol yapıp 
        // mükerrer oyu engellememiz gerekir. Şimdilik sadece sayacı artırıyoruz.
        const result = await pool.query(
            "UPDATE Reviews SET Helpful_Votes = Helpful_Votes + 1 WHERE Review_ID = $1 RETURNING Helpful_Votes",
            [reviewId]
        );

        if (result.rows.length === 0) return res.status(404).json({ error: "Yorum bulunamadı." });

        res.status(200).json({ success: true, newVotes: result.rows[0].helpful_votes });
    } catch (error) {
        res.status(500).json({ error: "Oy verme işlemi başarısız." });
    }
};

// 3. Ortalama Puan Bilgilerini Getirme
const getAverageRating = async (req, res) => {
    const { targetId } = req.params;

    try {
        const query = `
            SELECT 
                COUNT(*) as total_reviews,
                ROUND(AVG(Rating), 1) as average_rating,
                COUNT(*) FILTER (WHERE Rating = 5) as stars_5,
                COUNT(*) FILTER (WHERE Rating = 4) as stars_4,
                COUNT(*) FILTER (WHERE Rating = 3) as stars_3,
                COUNT(*) FILTER (WHERE Rating = 2) as stars_2,
                COUNT(*) FILTER (WHERE Rating = 1) as stars_1
            FROM Reviews 
            WHERE Target_ID = $1
        `;

        const { rows } = await pool.query(query, [targetId]);
        
        if (rows[0].total_reviews === '0') {
            return res.status(200).json({ message: "Henüz yorum yapılmamış.", average: 0 });
        }

        res.status(200).json({ success: true, stats: rows[0] });
    } catch (error) {
        res.status(500).json({ error: "İstatistikler hesaplanamadı." });
    }
};

const replyToReview = async (req, res) => {
    const { reviewId } = req.params;
    const { replyText } = req.body;
    const userRole = req.user.role; // Middleware'den gelen rol bilgisi

    // --- SENIOR GÜVENLİK DUVARI ---
    if (userRole !== 'Admin' && userRole !== 'Manager') {
        return res.status(403).json({ error: "Bu işlem için yetkiniz yok. Sadece yöneticiler yanıt verebilir." });
    }

    if (!replyText) return res.status(400).json({ error: "Yanıt metni boş olamaz." });

    try {
        const result = await pool.query(
            "UPDATE Reviews SET Reply_Text = $1, Replied_At = CURRENT_TIMESTAMP WHERE Review_ID = $2 RETURNING *",
            [replyText, reviewId]
        );

        if (result.rows.length === 0) return res.status(404).json({ error: "Yanıt verilecek yorum bulunamadı." });

        res.status(200).json({ 
            success: true, 
            message: "Yönetici yanıtı eklendi.", 
            data: result.rows[0] 
        });
    } catch (error) {
        console.error("Yanıt ekleme hatası:", error.message);
        res.status(500).json({ error: "Yanıt kaydedilemedi." });
    }
};

module.exports = { addReview, getReviews, voteReview, getAverageRating ,replyToReview};