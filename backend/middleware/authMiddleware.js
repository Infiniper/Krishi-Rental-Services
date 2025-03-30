// const jwt = require("jsonwebtoken");

// const authenticate = (req, res, next) => {
//     const token = req.header("Authorization");

//     if (!token) {
//         return res.status(401).json({ message: "Access denied. No token provided." });
//     }

//     try {
//          // Extract token from "Bearer <token>"
//          const tokenWithoutBearer = token.split(" ")[1];
//          if (!tokenWithoutBearer) {
//             return res.status(401).json({ message: "Invalid token format." });
//         }
//           // Verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         res.status(400).json({ message: "Invalid token" });
//     }
// };

// module.exports = { authenticate };