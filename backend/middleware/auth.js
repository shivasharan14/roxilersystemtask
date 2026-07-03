const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: "No token provided, access denied!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'my_super_secret_key_123');
        req.userId = decoded.id;
        req.userRole = decoded.role;
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token!" });
    }
};

const authorize = (roles = []) => {
    return (req, res, next) => {
        // req.user.role हा बरोबर मिळतोय का ते कन्फर्म करूया
        const userRole = req.user.role; 

        // आपण जो रोल पाठवलाय (उदा. 'Admin') आणि जो डेटाबेसमध्ये आहे तो मॅच करू
        // जर तुला 'System Administrator' साठी परमिशन हवी असेल तर:
        const hasAccess = roles.some(role => 
            role.toLowerCase() === userRole.toLowerCase()
        );

        if (!req.user || !hasAccess) {
            return res.status(403).json({ message: "Access denied! Required role: " + roles });
        }
        next();
    };
};

module.exports = { verifyToken, authorize };