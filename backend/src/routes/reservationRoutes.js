const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { makeReservation } = require('../controllers/reservationController');

// Sadece giriş yapmış kullanıcılar rezervasyon yapabilir
router.post('/', verifyToken, makeReservation);

module.exports = router;