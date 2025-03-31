const express = require('express');
const { Pool } = require('pg');
const pool = require('./config/db');
const path = require('path');
const bcrypt = require('bcrypt');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const machineryRoutes = require('./routes/machineryRoutes');
const cors = require("cors");

// const paymentRoutes = require('./routes/paymentRoutes');
const app = express();
const port = 5000;
require('dotenv').config();

// Enable CORS
app.use(cors()); // This allows all origins (for development)

// Middleware to parse JSON requests
app.use(express.json());

// Here I am Registering routes.
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/machinery', machineryRoutes);
// app.use('/api/payments', paymentRoutes);

// Route for the root URL
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the backend server!' });
});

// testing if database is connected
app.get('/db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({
            message: 'Welcome! Your database is working',
            success: true, time: result.rows[0]
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Database connection failed' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 