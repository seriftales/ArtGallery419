const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/authMiddleware');

// Bu rota korunuyor! verifyToken'dan geçemeyen buraya giremez.
router.get('/profile', verifyToken, (req, res) => {
    res.json({ 
        message: "Gizli bölgeye girdin!", 
        userData: req.user // Token içinden çıkan userId ve role burada
    });
});

module.exports = router;