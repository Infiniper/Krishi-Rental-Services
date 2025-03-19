const express = require('express');
const pool = require('../config/db');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { phonenumber, password, roleid } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE phonenumber = $1 AND roleid = $2', [phonenumber, roleid]);

        if (result.rows.length > 0) {
            const user = result.rows[0];

            const passwordMatch = await bcrypt.compare(password, user.passwordhash);
            
            if (!passwordMatch) {
                return res.json({ success: false, message: 'Incorrect password' });
            }

            res.json({ success: true, roleid: roleid, user: user });
        } else {
            res.json({ success: false, message: 'No user found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.post('/register/init', async (req, res) => {
    const { phonenumber } = req.body;

    if (!phonenumber) {
        return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    try {
        const existingUser = await pool.query('SELECT * FROM users WHERE phonenumber = $1', [phonenumber]);

        if (existingUser.rows.length > 0) {
            return res.json({ success: false, message: 'Phone number already registered' });
        }

        res.json({ success: true, message: 'Phone number available for registration', phonenumber: phonenumber });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.post('/register/complete', async (req, res) => {
    const { phonenumber, name, password, role, address } = req.body;

    if (!phonenumber || !name || !password || !role || !address) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            'INSERT INTO users (phonenumber, name, PasswordHash, roleid, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [phonenumber, name, hashedPassword, role, address]
        );

        const user = newUser.rows[0];
        delete user.password;

        res.json({ success: true, message: 'Registration successful', user: user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
