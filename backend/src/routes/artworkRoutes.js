const express = require('express');
const router = express.Router();
const { getAllArtworks, deleteArtwork, addArtwork, incrementLike, incrementView, getCampaignArtworks } = require('../controllers/artworkController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', getAllArtworks);
router.get('/campaigns', getCampaignArtworks);
router.post('/', verifyToken, isAdmin, upload.single('image'), addArtwork);
router.delete('/:id', verifyToken, isAdmin, deleteArtwork);
router.patch('/:artworkId/like', verifyToken, incrementLike);
router.patch('/:artworkId/view', incrementView);

module.exports = router;
