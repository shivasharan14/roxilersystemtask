const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { verifyToken, authorize } = require('../middleware/auth');

// सर्व स्टोअर्स पाहण्यासाठी (लॉगिन आवश्यक)
router.get('/', verifyToken, storeController.getAllStores);

// स्टोअर ॲड करण्यासाठी (फक्त Admin)
router.post('/add', verifyToken, authorize(['System Administrator']), storeController.addStore);

module.exports = router;