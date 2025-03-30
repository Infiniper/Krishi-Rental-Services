const express = require("express");
const router = express.Router();
// const { authenticate } = require("../middleware/authMiddleware");
const {
    createBooking,
    approveBooking,
    cancelBooking,
    completeBooking,
    getBookings
} = require("../controllers/bookingController");

// Create a new booking (Protected)
router.post("/",   createBooking);

// Approve booking (Protected)
router.put("/:bookingid/approve",   approveBooking);

// Cancel booking (Protected)
router.put("/:id/cancel",   cancelBooking);

// Mark booking as completed (Protected)
router.put("/:id/complete",   completeBooking);

// Get all bookings (Protected)
router.get("/",   getBookings);

module.exports = router;