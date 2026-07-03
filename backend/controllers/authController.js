const db = require('../models');
const User = db.User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { name, email, password, address, role } = req.body;

        // १. Name Validation (20-60 chars)
        if (name.length < 20 || name.length > 60) {
            return res.status(400).json({ error: "Name must be between 20 and 60 characters." });
        }

        // २. Password Validation (8-16 chars + special char + uppercase)
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,16})/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: "Password must be 8-16 characters, include 1 uppercase and 1 special character." });
        }

        // पासवर्ड हॅश करणे
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            name, email, password: hashedPassword, address, role
        });
        
        res.status(201).json({ message: "User registered successfully!", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

     const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET, // इथे कोणतीही स्ट्रिंग हार्डकोड करू नकोस, फक्त process.env च वापर
    { expiresIn: '1h' }
);

        res.json({ message: "Login successful!", token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.updatePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.id;

        // १. युजर डेटाबेसमध्ये शोधू
        const user = await db.User.findByPk(userId);
        if (!user) return res.status(404).json({ message: "User not found!" });

        // २. जुना पासवर्ड बरोबर आहे का ते चेक करू
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect old password!" });
        }

        // ३. नवीन पासवर्ड हॅश करून अपडेट करू
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ message: "Password updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};