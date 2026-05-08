const express = require('express');
const router = express.Router();
const { getArtworkStats, getEventStats, getDashboardSummary,updateReservationStatus } = require('../controllers/adminController');
const { verifyToken } = require('../middlewares/authMiddleware'); 

//Adminler ve yöneticiler için erişim kontrolü middleware'i
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin' && req.user.role !== 'Manager') {
        return res.status(403).json({ error: "Erişim reddedildi. Bu istatistikleri sadece yöneticiler görebilir." });
    }
    next();
};

//ROUTELAR
router.get('/stats/artworks', verifyToken, isAdmin, getArtworkStats);
router.get('/stats/events', verifyToken, isAdmin, getEventStats);
router.get('/summary', verifyToken, isAdmin, getDashboardSummary);
router.patch('/reservations/:reservationId/status', verifyToken, isAdmin, updateReservationStatus);

module.exports = router;