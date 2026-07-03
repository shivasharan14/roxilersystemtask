require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');
const app = express();
const authRoutes = require('./routes/authRoute');
const storeRoutes = require('./routes/storeRoute');
const ratingRoutes = require('./routes/ratingRoute');
const adminRoutes = require('./routes/adminRoute');
const ownerRoutes = require('./routes/ownerRoute');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/owner', ownerRoutes);

app.get('/', (req, res) => {
    res.send('Roxiler System Backend is Running!');
});

db.sequelize.sync({ alter: true }).then(() => {
    console.log("Database synced successfully!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});