const pool = require("../config/db");

// Get all machinery
exports.getAllMachinery = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM machinery");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching machinery data" });
    }
};

// Get machinery by ID
exports.getMachineryById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM machinery WHERE machineryid = $1", [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Machinery not found" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching machinery" });
    }
};

// Add new machinery
exports.addMachinery = async (req, res) => {
    const { ownerid, type, model, registrationnumber, status } = req.body;

    if (!ownerid || !type || !model || !registrationnumber || !status) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const result = await pool.query(
            "INSERT INTO machinery (ownerid, type, model, registrationnumber, status, createdat) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *",
            [ownerid, type, model, registrationnumber, status]
        );
        res.status(201).json({ message: "Machinery added successfully", data: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding machinery" });
    }
};

// Update machinery details
exports.updateMachinery = async (req, res) => {
    try {
        const { id } = req.params;
        const { model, status } = req.body;
        const validStatuses = ["Available", "Booked", "Inactive"];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: "Invalid status value. Allowed values: Available, Booked, Inactive" });
        }
        const result = await pool.query(
            "UPDATE machinery SET model = $1, status = $2 WHERE machineryid = $3 RETURNING *",
            [model, status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Machinery not found" });
        }

        res.json({ message: "Machinery updated successfully", data: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating machinery" });
    }
};

// Delete machinery
exports.deleteMachinery = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query("DELETE FROM machinery WHERE machineryid = $1 RETURNING *", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Machinery not found" });
        }

        res.json({ message: "Machinery deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting machinery" });
    }
};
