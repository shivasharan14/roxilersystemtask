const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateSignup } = require('../middleware/validator');
const { verifyToken } = require('../middleware/auth');

// Signup आणि Login राउट्स
router.post('/signup', validateSignup, authController.signup);
// पुढे आपण इथे .login चा कंट्रोलर ॲड करू शकतो

router.post('/login', authController.login);

// सर्व लॉग-इन युजर्ससाठी (verifyToken वापरणे गरजेचे आहे)
router.put('/update-password', verifyToken, authController.updatePassword);

module.exports = router;