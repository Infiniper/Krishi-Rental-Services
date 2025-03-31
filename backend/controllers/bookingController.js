const pool = require("../config/db");

// Get all bookings
exports.getBookings = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM bookings");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching bookings" });
    }
};

// exports.getPendingBookingsForProvider = async (req, res) => {
//     try {
//         const { id } = req.params; // Provider ID

//         const result = await pool.query(`
//             SELECT b.*, m.type, m.model, m.registrationnumber, u.name AS client_name
//             FROM bookings b
//             JOIN machinery m ON b.machineryid = m.machineryid
//             JOIN users u ON b.clientid = u.userid
//             WHERE m.ownerid = $1 AND b.status = 'Pending'
//         `, [id]);

//         res.json(result.rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error fetching pending bookings" });
//     }
// };


// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const { machineryid, scheduledtime } = req.body;
        // const clientid = req.user.userId; // Extract user ID from JWT
        const { clientid } = req.body; // Just for testing

        if (!machineryid || !scheduledtime) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let status = "Pending"; // Default status

        const result = await pool.query(
            "INSERT INTO bookings (clientid, machineryid, status, scheduledtime, createdat) VALUES ($1, $2, $3, $4, NOW()) RETURNING *",
            [clientid, machineryid, status, scheduledtime]
        );
        res.status(201).json({
            message: "Booking created successfully", booking: {
                bookingid: result.rows[0].bookingid,
                clientid: result.rows[0].clientid,
                machineryid: result.rows[0].machineryid,
                status: result.rows[0].status,
                scheduledtime: result.rows[0].scheduledtime
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating booking" });
    }
};

// Approve a booking
exports.approveBooking = async (req, res) => {
    try {
        const bookingid = parseInt(req.params.bookingid, 10);
        const ownerid = req.user.userId; // Extract user ID from JWT

        // Validate bookingid
        if (isNaN(bookingid) || bookingid <= 0) {
            return res.status(400).json({ message: "Invalid booking ID" });
        }

        // Check if the booking exists and belongs to the machinery owned by the user
        const bookingCheck = await pool.query(
            "SELECT b.*, m.ownerid FROM bookings b JOIN machinery m ON b.machineryid = m.machineryid WHERE b.bookingid = $1 AND m.ownerid = $2",
            [bookingid, ownerid]
        );

        if (bookingCheck.rows.length === 0) {
            return res.status(403).json({ message: "Unauthorized: You can only approve bookings for your own machinery" });
        }

        // Allowed statuses
        // const validBookingStatuses = ["Scheduled", "Completed", "Cancelled", "Approved"];

        // For debugging: Checking if booking exists
        const checkQuery = `SELECT * FROM bookings WHERE bookingid = $1`;
        const checkResult = await pool.query(checkQuery, [bookingid]);

        if (checkResult.rows.length === 0) {
            return res.status(404).json({ message: "Booking not found in database" });
        }

        const newStatus = "Scheduled";

        const query = `UPDATE bookings SET status = $1 WHERE bookingid = $2 RETURNING *`;
        const result = await pool.query(query, [newStatus, bookingid]);



        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json({
            message: "Booking approved successfully", booking: {
                bookingid: result.rows[0].bookingid,
                clientid: result.rows[0].clientid,
                machineryid: result.rows[0].machineryid,
                status: result.rows[0].status
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error approving booking" });
    }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "UPDATE bookings SET status = 'Cancelled' WHERE bookingid = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json({ message: "Booking cancelled successfully", data: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error cancelling booking" });
    }
};

// Mark a booking as completed
exports.completeBooking = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "UPDATE bookings SET status = 'Completed' WHERE bookingid = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json({ message: "Booking completed successfully", data: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error completing booking" });
    }
};
