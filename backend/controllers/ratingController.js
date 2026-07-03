const db = require('../models');
const Rating = db.Rating;

// ratingController.js मध्ये 'addRating' फंक्शन अपडेट कर:
exports.addRating = async (req, res) => {
    try {
        const { storeId, score, comment } = req.body;
        const userId = req.user.id; // इथे req.user.id असावे (जर तू auth middleware वापरत असशील तर)

        if (score < 1 || score > 5) {
            return res.status(400).json({ error: "Rating must be between 1 and 5." });
        }

        const newRating = await Rating.create({
            userId: userId, // हे ॲड करणे गरजेचे आहे
            storeId: storeId,
            score: score,
            comment: comment
        });

        res.status(201).json({ message: "Rating added successfully!", rating: newRating });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.submitRating = async (req, res) => {
    try {
        const { storeId, score, comment } = req.body;
        const userId = req.user ? req.user.id : req.userId; // मिडलवेअर नुसार बरोबर घ्या

        console.log("Processing for UserID:", userId, "Store:", storeId);

        let existingRating = await Rating.findOne({ 
    where: { 
        // इथं तुझ्या डेटाबेसमध्ये जो खरा कॉलम आहे (उदा. 'user_id' किंवा 'UserId'), तो वापर
        userId: userId, 
        storeId: storeId 
    } 
});
        if (existingRating) {
            existingRating.score = score;
            existingRating.comment = comment;
            await existingRating.save();
            return res.json({ message: "Rating updated!", rating: existingRating });
        }

        // नवीन रेटिंग क्रिएट करताना हे वापरा
        const newRating = await Rating.create({ 
            userId: userId, 
            storeId: storeId, 
            score: score, 
            comment: comment 
        });
        
        return res.status(201).json({ message: "Rating submitted!", rating: newRating });
    } catch (error) {
        console.error("Critical Error:", error); // ही एरर टर्मिनलवर दिसेल, ती मला सांग
        return res.status(500).json({ error: error.message });
    }
};