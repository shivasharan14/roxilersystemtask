const { body, validationResult } = require('express-validator');

exports.validateSignup = [
    body('name').isLength({ min: 20, max: 60 }).withMessage('Name must be 20-60 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('address').isLength({ max: 400 }).withMessage('Address must be max 400 characters'),
    body('password').isLength({ min: 8, max: 16 }).withMessage('Password must be 8-16 characters')
        .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain a special character'),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];