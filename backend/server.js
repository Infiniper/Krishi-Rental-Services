const express = require('express');
const { Pool } = require('pg');
const pool = require('./db');
const path = require('path');
const app = express();
const port = 3000;
require('dotenv').config();

// Middleware to parse JSON requests
app.use(express.json());

// Route for the root URL
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the backend server!' });
});

// testing if database is connected
app.get('/db', async (req, res) => {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0] });
}); 

// Route to handle user login
app.post('/login', async (req, res) => {
    const { phonenumber, password, roleid } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE phonenumber = $1 AND PasswordHash = $2 AND roleid = $3', [phonenumber, password, roleid]);
        
        if (result.rows.length > 0) {
            // Send back the role and user data to the client
            res.json({ success: true, roleid: roleid, user: result.rows[0] });
        } else {
            res.json({ success: false, message: 'No user found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Step 1: Initial registration check
app.post('/register/init', async (req, res) => {
    const { phonenumber } = req.body;
    
    if (!phonenumber) {
        return res.status(400).json({ 
            success: false, 
            message: 'Phone number is required' 
        });
    }

    try {
        // Check if phone number already exists
        const existingUser = await pool.query('SELECT * FROM users WHERE phonenumber = $1', [phonenumber]);
        
        if (existingUser.rows.length > 0) {
            return res.json({ 
                success: false, 
                message: 'Phone number already registered' 
            });
        }
        
        // If phone number is not registered, proceed
        res.json({ 
            success: true, 
            message: 'Phone number available for registration',
            phonenumber: phonenumber 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            success: false, 
            message: 'Server error' 
        });
    }
});


// Step 2: Complete registration
app.post('/register/complete', async (req, res) => {
    const { phonenumber, name, password, role, address } = req.body;
    
    // Validate required fields
    if (!phonenumber || !name || !password || !role || !address) {
        return res.status(400).json({ 
            success: false, 
            message: 'All fields are required' 
        });
    }

    try {
        // Insert new user into database
        const newUser = await pool.query(
            'INSERT INTO users (phonenumber, name, PasswordHash, roleid, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [phonenumber, name, password, role, address]
        );
        
        // Remove password from response
        const user = newUser.rows[0];
        delete user.password;

        res.json({ 
            success: true, 
            message: 'Registration successful',
            user: user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            success: false, 
            message: 'Server error during registration' 
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 