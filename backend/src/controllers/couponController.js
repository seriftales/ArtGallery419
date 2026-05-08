const pool = require('../config/db');

// Kupon Doğrulama (
const validateCoupon = async (req, res) => {
    const { code } = req.body;
    const userId = req.user.userId; // verifyToken'dan gelecek

    try {
        const result = await pool.query(
            "SELECT * FROM Coupons WHERE Code = $1 AND Is_Active = TRUE",
            [code]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Geçersiz veya pasif bir kupon kodu girdiniz." });
        }

        const coupon = result.rows[0];

        if (new Date(coupon.valid_until) < new Date()) {
            return res.status(400).json({ error: "Bu kuponun kullanım süresi dolmuş." });
        }

        if (coupon.target_user_id !== null && coupon.target_user_id !== userId) {
            return res.status(403).json({ error: "Bu kupon kodu sadece belirli bir kullanıcıya özeldir." });
        }

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