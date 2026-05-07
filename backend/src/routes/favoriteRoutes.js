const express = require('express');
const router = express.Router();

// Senin yazdığın middleware'i ve yeni controller'ı içe aktarıyoruz
const {verifyToken} = require('../middlewares/authMiddleware'); // Kendi dosya yolunu kontrol et
const { addFavorite,getFavorites,removeFavorite } = require('../controllers/favoriteController');

// POST /api/favorites
// DİKKAT: addFavorite fonksiyonundan ÖNCE verifyToken çalışacak!
router.post('/', verifyToken, addFavorite);
router.get('/', verifyToken, getFavorites);
router.delete('/:id', verifyToken, removeFavorite);

module.exports = router;