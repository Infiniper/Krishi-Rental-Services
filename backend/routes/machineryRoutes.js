const express = require("express");
const router = express.Router();
// const { authenticate } = require("../middleware/authMiddleware");
const {
    getAllMachinery,
    getMachineryById,
    addMachinery,
    updateMachinery,
    deleteMachinery
} = require("../controllers/machineryController");
const upload = require("../middleware/upload"); // Import multer config

// Add machinery with multiple images
//  router.post("/add",   upload.array("images", 5), addMachinery);
router.post("/add", upload.array("images", 5), addMachinery); // Allows up to 5 images

// Get all machinery (Public)
router.get("/", getAllMachinery);

// Get single machinery by ID (Public)
router.get("/:id", getMachineryById);

// Add new machinery (Protected)
router.post("/",   addMachinery);

// Update machinery details (Protected)
router.put("/:id",   updateMachinery);

// Delete machinery (Protected)
router.delete("/:id",   deleteMachinery);

module.exports = router;