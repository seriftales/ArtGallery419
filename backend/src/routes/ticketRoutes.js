const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { createTicket, getMyTickets, replyToTicket, getTicketDetails,updateTicketStatus } = require('../controllers/ticketController');


//ROUTELAR
router.use(verifyToken); 
router.get('/my-tickets', getMyTickets); 
router.post('/', createTicket);
router.get('/:ticketId', getTicketDetails);
router.post('/:ticketId/messages', replyToTicket);
router.patch('/:ticketId/status', updateTicketStatus);

module.exports = router;