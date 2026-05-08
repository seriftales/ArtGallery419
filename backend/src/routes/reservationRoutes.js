const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { makeReservation,updateReservation,cancelReservation,getMyReservations } = require('../controllers/reservationController');

//ROUTELAR
router.post('/', verifyToken, makeReservation);
router.patch('/:id', verifyToken, updateReservation);
router.delete('/:id', verifyToken, cancelReservation);
router.get('/my-reservations', verifyToken, getMyReservations);

module.exports = router;