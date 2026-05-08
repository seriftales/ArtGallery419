const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const { getItemsToCompare, saveComparison,getSavedComparisons } = require('../controllers/comparisonController');

//ROUTELAR
router.get('/', verifyToken, getItemsToCompare);
router.post('/save', verifyToken, saveComparison);
router.get('/saved-comparisons', verifyToken, getSavedComparisons);

module.exports = router;