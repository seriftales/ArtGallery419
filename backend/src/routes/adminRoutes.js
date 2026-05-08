const express = require('express');
const router = express.Router();
const { getArtworkStats, getEventStats, getDashboardSummary } = require('../controllers/adminController');
const { verifyToken } = require('../middlewares/authMiddleware'); // Kendi dosya yoluna göre güncelle

// Senior Güvenlik Duvarı (Inline Middleware)
// Sadece Admin ve Manager rollerini içeri alır
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin' && req.user.role !== 'Manager') {
        return res.status(403).json({ error: "Erişim reddedildi. Bu istatistikleri sadece yöneticiler görebilir." });
    }
    next();
};

// Rotalara önce giriş kontrolü (verifyToken), sonra yetki kontrolü (isAdmin) ekliyoruz
router.get('/stats/artworks', verifyToken, isAdmin, getArtworkStats);
router.get('/stats/events', verifyToken, isAdmin, getEventStats);
router.get('/summary', verifyToken, isAdmin, getDashboardSummary);

module.exports = router;