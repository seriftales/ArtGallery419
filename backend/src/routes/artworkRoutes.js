const express = require('express');
const router = express.Router();
const { getAllArtworks,deleteArtwork ,addArtwork} = require('../controllers/artworkController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// GET /api/artworks
router.get('/', getAllArtworks);
router.delete('/:id', verifyToken, isAdmin, deleteArtwork);
router.post('/', verifyToken, isAdmin, addArtwork);
router.post('/', verifyToken, isAdmin, upload.single('image'), addArtwork);

module.exports = router;