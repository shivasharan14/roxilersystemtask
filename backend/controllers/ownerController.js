const db = require('../models');

exports.getOwnerStoreStats = async (req, res) => {
    try {
        // समजा, ओनरच्या आयडीवरून आपण त्याचं स्टोअर शोधू
        const store = await db.Store.findOne({ 
            where: { ownerId: req.userId }, 
            include: [db.Rating] 
        });

        if (!store) return res.status(404).json({ error: "Store not found" });

        // सरासरी काढण्यासाठी लॉजिक
        const ratings = store.Ratings;
        const avgScore = ratings.length > 0 
            ? ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length 
            : 0;

        res.json({ storeName: store.name, averageRating: avgScore, ratings: ratings });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getOwnerDashboard = async (req, res) => {
    try {
        // १. ओनरच्या लॉगिन ID वरून त्याचं स्टोअर शोधू
        const store = await db.Store.findOne({ where: { userId: req.user.id } });
        
        if (!store) {
            return res.status(404).json({ message: "Store not found for this owner!" });
        }

        // २. त्या स्टोअरचे सर्व रेटिंग्स काढू (सोबत युजरचे नावही घेऊ)
        const ratings = await db.Rating.findAll({
            where: { storeId: store.id },
            include: [{ model: db.User, attributes: ['name', 'email'] }]
        });

        // ३. सरासरी (Average Score) काढू
        const totalScore = ratings.reduce((sum, r) => sum + r.score, 0);
        const avgScore = ratings.length > 0 ? (totalScore / ratings.length).toFixed(1) : 0;

        res.json({
            storeName: store.name,
            averageScore: parseFloat(avgScore),
            totalRatings: ratings.length,
            ratings: ratings
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};