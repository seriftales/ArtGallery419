const express = require('express');
const router = express.Router();
const { getAllArtworks,deleteArtwork } = require('../controllers/artworkController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// GET /api/artworks
router.get('/', getAllArtworks);
router.delete('/:id', verifyToken, isAdmin, deleteArtwork);

module.exports = router;