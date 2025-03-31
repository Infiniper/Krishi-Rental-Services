
// middleware/upload.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "machinery",
        format: async (req, file) => "png", // Supports promises
        public_id: (req, file) => file.originalname.split('.')[0], // Keeping original file name
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

module.exports = upload;
