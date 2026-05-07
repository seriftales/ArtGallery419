const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { createOrder,getMyOrders } = require('../controllers/orderController');

// Sadece giriş yapmış kullanıcılar sipariş verebilir
router.post('/', verifyToken, createOrder);
router.get('/my-orders', verifyToken, getMyOrders);

module.exports = router;