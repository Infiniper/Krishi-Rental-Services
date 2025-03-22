const express = require("express");
const router = express.Router();
const {
    createBooking,
    approveBooking,
    cancelBooking,
    completeBooking,
    getBookings
} = require("../controllers/bookingController");

// Create a new booking
router.post("/", createBooking);

// Approve booking
router.put("/:bookingid/approve", approveBooking);

// Cancel booking
router.put("/:id/cancel", cancelBooking);

// Mark booking as completed
router.put("/:id/complete", completeBooking);

// Get all bookings
router.get("/", getBookings);

module.exports = router;
