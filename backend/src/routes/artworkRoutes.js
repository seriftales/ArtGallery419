const express = require('express');
const router = express.Router();
const { getAllArtworks } = require('../controllers/artworkController');

// GET /api/artworks
router.get('/', getAllArtworks);

module.exports = router;