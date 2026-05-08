const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { createOrder,getMyOrders } = require('../controllers/orderController');

//ROUTELAR
router.post('/', verifyToken, createOrder);
router.get('/my-orders', verifyToken, getMyOrders);

module.exports = router;