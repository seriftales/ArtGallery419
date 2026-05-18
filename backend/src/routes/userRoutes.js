const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { updateProfile, changePassword } = require('../controllers/userController');
const pool = require('../config/db');

// Profil bilgilerini DB'den getir (first_name, last_name, email dahil)
router.get('/profile', verifyToken, async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT user_id, first_name, last_name, email, role, created_at FROM Users WHERE user_id = $1",
            [req.user.userId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Kullanıcı bulunamadı." });
        }
        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error("Profil çekme hatası:", error.message);
        res.status(500).json({ error: "Profil bilgileri alınamadı." });
    }
});

router.patch('/profile', verifyToken, updateProfile);
router.put('/change-password', verifyToken, changePassword);

module.exports = router;
