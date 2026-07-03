const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');
const { verifyToken, authorize } = require('../middleware/auth');

// फक्त 'Store Owner' रोल्ससाठी
router.get('/dashboard', verifyToken, authorize(['Store Owner']), ownerController.getOwnerDashboard);

module.exports = router;