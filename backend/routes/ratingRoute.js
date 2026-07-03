const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const { verifyToken } = require('../middleware/auth');

// रेटिंग देण्यासाठी (फक्त लॉगिन आवश्यक)
router.post('/add', verifyToken, ratingController.addRating);

// ratings.js राउट फाईलमध्ये हे राउट्स ठेव:
router.post('/submit', verifyToken, ratingController.submitRating);

module.exports = router;