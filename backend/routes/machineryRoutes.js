const express = require("express");
const router = express.Router();
const {
    getAllMachinery,
    getMachineryById,
    addMachinery,
    updateMachinery,
    deleteMachinery
} = require("../controllers/machineryController");

// Get all machinery
router.get("/", getAllMachinery);

// Get single machinery by ID
router.get("/:id", getMachineryById);

// Add new machinery
router.post("/", addMachinery);

// Update machinery details
router.put("/:id", updateMachinery);

// Delete machinery
router.delete("/:id", deleteMachinery);

module.exports = router;
