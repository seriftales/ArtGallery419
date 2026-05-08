const pool = require('../config/db');

// Kupon Doğrulama (İndirim Kuponu Kullanma & Belirli Kullanıcılara Özel Fırsatlar)
const validateCoupon = async (req, res) => {
    const { code } = req.body;
    const userId = req.user.userId; // verifyToken'dan gelecek

    try {
        // 1. Gümrük Kontrolü: Kod var mı ve aktif mi?
        const result = await pool.query(
            "SELECT * FROM Coupons WHERE Code = $1 AND Is_Active = TRUE",
            [code]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Geçersiz veya pasif bir kupon kodu girdiniz." });
        }

        const coupon = result.rows[0];

        // 2. Zaman Kontrolü: Kuponun süresi geçmiş mi?
        if (new Date(coupon.valid_until) < new Date()) {
            return res.status(400).json({ error: "Bu kuponun kullanım süresi dolmuş." });
        }

        // 3. SENIOR KİLİDİ (Kişiye Özel Fırsat Kontrolü): 
        // Eğer target_user_id doluysa ve istek atan kişinin ID'si ile eşleşmiyorsa reddet!
        if (coupon.target_user_id !== null && coupon.target_user_id !== userId) {
            return res.status(403).json({ error: "Bu kupon kodu sadece belirli bir kullanıcıya özeldir." });
        }

        // Tüm güvenlik duvarları aşıldıysa indirimi ver
        res.status(200).json({
            success: true,
            message: "Kupon başarıyla uygulandı.",
            discountPercent: coupon.discount_percent
        });

    } catch (error) {
        console.error("Kupon doğrulama hatası:", error.message);
        res.status(500).json({ error: "Kupon doğrulanırken sunucu hatası oluştu." });
    }
};

module.exports = { validateCoupon };