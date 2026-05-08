const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware'); // Senin daha önce yazdığın Multer kalkanı
const { addEvent, getAllEvents, getEventById,getCampaignEvents } = require('../controllers/eventController');

//ROUTELAR
router.get('/campaigns', getCampaignEvents);
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', verifyToken, isAdmin, upload.single('image'), addEvent);

module.exports = router;