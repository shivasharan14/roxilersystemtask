const express = require('express');
const router = express.Router();
const { verifyToken, authorize } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

// फक्त Admin साठी डॅशबोर्ड
// जर डेटाबेसमध्ये 'System Administrator' असेल तर इथं तसंच लिही:
router.get('/dashboard', verifyToken, authorize(['System Administrator']), adminController.getDashboardStats);

// सर्व युजर्स बघण्यासाठी (फक्त ॲडमिनसाठी)
router.get('/users', verifyToken, authorize(['System Administrator']), adminController.getAllUsers);

router.post('/add-user', verifyToken, authorize(['System Administrator']), adminController.addUserByAdmin);

router.post('/add-store', verifyToken, authorize(['System Administrator']), adminController.addStoreByAdmin);

module.exports = router;
