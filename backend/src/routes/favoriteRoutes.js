const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/authMiddleware'); // Kendi dosya yolunu kontrol et
const { addFavorite,getFavorites,removeFavorite } = require('../controllers/favoriteController');

//ROUTELAR
router.post('/', verifyToken, addFavorite);
router.get('/', verifyToken, getFavorites);
router.delete('/:id', verifyToken, removeFavorite);

module.exports = router;