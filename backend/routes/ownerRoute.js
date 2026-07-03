const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');
const { verifyToken, authorize } = require('../middleware/auth');

// इथे फक्त एकच राऊट हवा, जो ऑथेंटिकेशन आणि ऑथोरायझेशन दोन्ही तपासेल.
// 'verifyToken' टोकन तपासते, तर 'authorize' रोल 'Store Owner' आहे का हे तपासेल.
router.get('/dashboard', verifyToken, authorize(['Store Owner']), ownerController.getOwnerDashboard);

module.exports = router;