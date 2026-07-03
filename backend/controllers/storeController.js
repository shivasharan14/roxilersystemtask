const db = require('../models');
const Store = db.Store;
const Rating = db.Rating;

exports.addStore = async (req, res) => {
    try {
        const { name, email, address } = req.body;
        const newStore = await Store.create({ name, email, address });
        res.status(201).json({ message: "Store added successfully!", store: newStore });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllStores = async (req, res) => {
    try {
        const stores = await Store.findAll({
            include: [{
                model: Rating,
                attributes: ['score'] // फक्त रेटिंगचा स्कोअर
            }]
        });
        
        // जर स्टोअर नसतील तर एरर टाळण्यासाठी चेक
        res.status(200).json(stores);
    } catch (error) {
        console.error("Error fetching stores:", error); // टर्मिनलमध्ये एरर समजेल
        res.status(500).json({ error: error.message });
    }
};