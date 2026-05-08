const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { createTicket, getMyTickets, replyToTicket, getTicketDetails } = require('../controllers/ticketController');

// Tüm destek işlemleri için giriş yapmış olmak şart
router.use(verifyToken); 

// SENIOR UYARISI: Sabit rotalar joker rotalardan ÖNCE yazılır!
router.get('/my-tickets', getMyTickets); 

// Bilet Oluşturma (İletişim Formu)
router.post('/', createTicket);

// Belirli bir biletin detayını görme
router.get('/:ticketId', getTicketDetails);

// Mesaj Sistemini Kullanma (Cevap yazma)
router.post('/:ticketId/messages', replyToTicket);

module.exports = router;