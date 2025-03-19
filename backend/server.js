const express = require('express');
const { Pool } = require('pg');
const pool = require('./config/db');
const path = require('path');
const bcrypt = require('bcrypt');
const authRoutes = require('./routes/auth');
const app = express();
const port = 3000;
require('dotenv').config();

// Middleware to parse JSON requests
app.use(express.json());
app.use('/auth', authRoutes);

// Route for the root URL
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the backend server!' });
});

// testing if database is connected
app.get('/db', async (req, res) => {
    const result = await pool.query('SELECT NOW()');
    res.json({
        message: 'Welcome! Your database is working',
        success: true, time: result.rows[0]
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 