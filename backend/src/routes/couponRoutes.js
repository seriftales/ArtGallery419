const express = require('express');
const router = express.Router();
const { validateCoupon } = require('../controllers/couponController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Kupon denemek için giriş yapmış olmak şart
router.post('/validate', verifyToken, validateCoupon);

module.exports = router;