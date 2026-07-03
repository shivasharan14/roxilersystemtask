const db = require('../models');
const { User, Store, Rating } = db;
const { Op } = require('sequelize');
const bcrypt = require('bcrypt'); 

exports.getDashboardStats = async (req, res) => {
    try {
        // तिन्ही टेबल्स मधून काउंट काढणे
        const totalUsers = await User.count();
        const totalStores = await Store.count();
        const totalRatings = await Rating.count();

        res.json({
            message: "Dashboard stats fetched successfully",
            data: {
                totalUsers,
                totalStores,
                totalRatings
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.getAllUsers = async (req, res) => {
    try {
        const { role, sortBy, order } = req.query; // क्वेरी पॅरामीटर्स घेणे
        let whereClause = {};

        // रोलनुसार फिल्टर
        if (role) {
            whereClause.role = role;
        }

        // सॉर्टिंग (default: name)
        const sortField = sortBy || 'name';
        const sortOrder = order === 'desc' ? 'DESC' : 'ASC';

        const users = await db.User.findAll({
            where: whereClause,
            attributes: ['id', 'name', 'email', 'address', 'role'],
            order: [[sortField, sortOrder]]
        });

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addUserByAdmin = async (req, res) => {
    try {
        const { name, email, password, address, role } = req.body;
        
        // पासवर्ड हॅश करणे
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await db.User.create({
            name, email, password: hashedPassword, address, role
        });
        
        res.status(201).json({ message: "User added successfully!", user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.addStoreByAdmin = async (req, res) => {
    try {
        const { name, address, ownerId } = req.body;

        // १. आधी चेक करूया की मालक (Owner) अस्तित्वात आहे का
        const owner = await db.User.findByPk(ownerId);
        if (!owner) {
            return res.status(404).json({ message: "Store owner not found!" });
        }

        // २. स्टोअर तयार करूया
        const newStore = await db.Store.create({
            name,
            address,
            userId: ownerId // Foreign key link
        });

        res.status(201).json({ message: "Store added successfully!", store: newStore });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};