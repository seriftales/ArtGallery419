const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { addReview, getReviews,getAverageRating,voteReview ,replyToReview} = require('../controllers/reviewController');

// Sadece giriş yapanlar yorum ekleyebilir
router.post('/', verifyToken, addReview);
router.get('/:targetId', getReviews);
router.get('/:targetId/stats', getAverageRating); // Ortalama puan ve yıldız dağılımı
router.patch('/:reviewId/vote', verifyToken, voteReview); // Faydalı oyu ver
router.patch('/:reviewId/reply', verifyToken, replyToReview);

module.exports = router;