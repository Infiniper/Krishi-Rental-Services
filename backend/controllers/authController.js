const admin = require("firebase-admin");
// const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const serviceAccount = require("../config/firebase-adminsdk.json");

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Function to generate JWT Token
// const generateToken = (userId) => {
//     return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
// };

// Send OTP
exports.sendOTP = async (req, res) => {
    const { phonenumber } = req.body;

    if (!phonenumber) {
        return res.status(400).json({ message: "Phone number is required" });
    }

    try {
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpiry = new Date(Date.now() + 10 * 60000); // 10 minutes expiry

        // Insert user if not exists, otherwise update OTP
        await pool.query(
            `INSERT INTO users (phonenumber, otp, otp_expires_at) 
             VALUES ($1, $2, $3) 
             ON CONFLICT (phonenumber) 
             DO UPDATE SET otp = EXCLUDED.otp, otp_expires_at = EXCLUDED.otp_expires_at;`,
            [phonenumber, otp, otpExpiry]
        );

        // Send OTP via Firebase (Simulated, as Firebase UI SDK is usually used)
        console.log(`OTP for ${phonenumber}: ${otp}`);

        res.json({ success: true, message: "OTP sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending OTP" });
    }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
    const { phonenumber, otp } = req.body;

    try {
        // const result = await pool.query(
        //     "SELECT * FROM users WHERE phonenumber = $1 AND otp = $2 AND otp_expires_at > NOW()",
        //     [phonenumber, otp]
        // );

        // Fetch OTP details from DB
        const result = await pool.query(
            "SELECT userid, otp, otp_expires_at FROM users WHERE phonenumber = $1",
            [phonenumber]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

                ///////////////////////////////////////////////////////////////////////////////
        const { otp: storedOtp, otp_expires_at } = result.rows[0];

        console.log("Stored OTP:", storedOtp);
        console.log("Entered OTP:", otp);
        console.log("OTP Expiration Time:", otp_expires_at);
        console.log("Current Time:", new Date().toISOString());

        if (!storedOtp || storedOtp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (new Date() > new Date(otp_expires_at)) {
            return res.status(400).json({ message: "Expired OTP" });
        }

///////////////////////////////////////////////////////////////////////////////

        const user = result.rows[0];

        // Generate JWT Token
        // const token = generateToken(user.userid);

        // Clear OTP after successful verification
        await pool.query("UPDATE users SET otp = NULL, otp_expires_at = NULL WHERE phonenumber = $1", [phonenumber]);

        // res.json({ success: true, token, user });
        res.json({ success: true, user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error verifying OTP" });
    }
};


// **User Signup**
exports.signup = async (req, res) => {
    const { name, phonenumber, email, roleid, address } = req.body;

    if (!name || !phonenumber || !email || !roleid) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const existingUser = await pool.query("SELECT * FROM users WHERE phonenumber = $1", [phonenumber]);

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "Phone number already registered" });
        }

        const newUser = await pool.query(
            "INSERT INTO users (name, phonenumber, email, roleid, address, createdat) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *",
            [name, phonenumber, email, roleid, address]
        );

        // Generate JWT Token
        // const token = generateToken(newUser.rows[0].userid);

        // res.status(201).json({ success: true, message: "User registered successfully", token, user: newUser.rows[0] });
        res.status(201).json({ success: true, message: "User registered successfully", user: newUser.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error during registration" });
    }
};

// **User Login**
exports.login = async (req, res) => {
    const { phonenumber } = req.body;

    if (!phonenumber) {
        return res.status(400).json({ message: "Phone number is required" });
    }

    try {
        const user = await pool.query("SELECT * FROM users WHERE phonenumber = $1", [phonenumber]);

        if (user.rows.length === 0) {
            return res.status(400).json({ message: "User not found, please register" });
        }

        // Generate JWT Token
        // const token = generateToken(user.rows[0].userid);

        // res.json({ success: true, message: "Login successful", token, user: user.rows[0] });
        res.json({ success: true, message: "Login successful", user: user.rows[0] });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error during login" });
    }
};