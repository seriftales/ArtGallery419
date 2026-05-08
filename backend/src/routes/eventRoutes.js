const express = require('express');
const router = express.Router();

// Middleware'leri içeri alıyoruz
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware'); // Senin daha önce yazdığın Multer kalkanı

// Controller fonksiyonları
const { addEvent, getAllEvents, getEventById,getCampaignEvents } = require('../controllers/eventController');

// GET rotaları: Herkese açık (Kalkan yok)
router.get('/campaigns', getCampaignEvents);

router.get('/', getAllEvents);
router.get('/:id', getEventById);

// POST rotası: Sadece Adminler etkinlik açabilir (Zincirleme Kalkan)
router.post('/', verifyToken, isAdmin, upload.single('image'), addEvent);

module.exports = router;