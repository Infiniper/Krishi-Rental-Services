const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db"); // Database connection

const JWT_SECRET =  process.env.JWT_SECRET;

// **User Signup**
exports.signup = async (req, res) => {
    try {
    const { name, phonenumber, password, roleid, email, address } = req.body;

        // Check if user already exists
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE phonenumber = $1", 
            [phonenumber]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "Phone number already registered. Please log in." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        const newUser = await pool.query(
            "INSERT INTO users (name, phonenumber, password, roleid, email, address) VALUES ($1, $2, $3, $4, $5, $6) RETURNING userid, name, phonenumber, roleid",
            [name, phonenumber, hashedPassword, roleid, email, address]
        );

        const token = jwt.sign({ id: newUser.rows[0].id, roleid: newUser.rows[0].roleid }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(201).json({ message: "User registered successfully", user: newUser.rows[0] });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// **User Login**
exports.login = async (req, res) => {
    const { phonenumber, password } = req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE phonenumber = $1", [phonenumber]);

        if (user.rows.length === 0) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userid: user.rows[0].userid, roleid: user.rows[0].roleid },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token, user: user.rows[0] });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
