const db = require('../models');
// हे २ मॉडेल तिथे 'import' असणे गरजेचे आहे:
const Store = db.Store; 
const Rating = db.Rating;
const User = db.User;

exports.getOwnerDashboard = async (req, res) => {
    try {
        const ownerId = req.user.id;
        
        // १. इथे 'Store' वापर (db.Store ऐवजी)
        const store = await Store.findOne({ where: { ownerId: ownerId } });
        
        if (!store) {
            return res.status(404).json({ message: "Store not found!" });
        }

        // २. रेटिंग्स काढताना 'Rating' आणि 'User' मॉडेल वापर
        const ratings = await Rating.findAll({
            where: { storeId: store.id },
            include: [{ 
                model: User, 
                attributes: ['name', 'email'] 
            }]
        });

        // ३. सरासरी काढणे
        const totalScore = ratings.reduce((sum, r) => sum + r.score, 0);
        const avgScore = ratings.length > 0 ? (totalScore / ratings.length).toFixed(1) : 0;

        res.json({
            storeName: store.name,
            averageScore: parseFloat(avgScore),
            totalRatings: ratings.length,
            ratings: ratings
        });
    } catch (error) {
        console.error("SERVER ERROR:", error); // ही एरर टर्मिनलवर काय येतेय ते बघ
        res.status(500).json({ error: error.message });
    }
};