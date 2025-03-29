const pool = require("../config/db");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "machinery",
        allowed_formats: ["jpg", "jpeg", "png"],
    },
});

const upload = multer({ storage });

// Get all machinery
exports.getAllMachinery = async (req, res) => {
    try {
        // Fetch all machinery
        const machineryResult = await pool.query("SELECT * FROM machinery");
        const machineryList = machineryResult.rows;

        // Fetch images for each machinery
        for (let machinery of machineryList) {
            const imageResult = await pool.query(
                "SELECT imageurl FROM machinery_images WHERE machineryid = $1",
                [machinery.machineryid]
            );
            machinery.images = imageResult.rows.map(row => row.imageurl); // Attach images to machinery object
        }

        res.json(machineryList);
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
    const { type, model, registrationnumber, status } = req.body;
    // const ownerid = req.user.userId; // Extract user ID from JWT
    // When a user makes a request to a protected route, the authenticate middleware verifies the JWT token and attaches the decoded user information to req.user. This allows controllers to access details of the authenticated user.
    const { ownerid } = req.body;  // For testing
    if (!type || !model || !registrationnumber || !status) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Step 1: Insert Machinery Details (without images)
        const machineryResult = await pool.query(
            "INSERT INTO machinery (ownerid, type, model, registrationnumber, status, createdat) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING machineryid",
            [ownerid, type, model, registrationnumber, status]
        );

        const machineryid = machineryResult.rows[0].machineryid; // Get the newly inserted machinery ID

        // Step 2: Upload Images to Cloudinary & Store URLs in the database
        const imageUrls = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const imageUrl = file.path; // Cloudinary returns a URL
                imageUrls.push(imageUrl);

                // Save image URL in the machinery_images table
                await pool.query(
                    "INSERT INTO machinery_images (machineryid, imageurl) VALUES ($1, $2)",
                    [machineryid, imageUrl]
                );
            }
        }

        res.status(201).json({ 
            message: "Machinery added successfully", 
            machineryid, 
            images: imageUrls 
        });

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
        // checking if the logged-in user is the owner of the machinery before allowing them to update it
        // const ownerid = req.user.userId; // Extract user ID from JWT
         const ownerid = req.body.ownerid; // For testing

        const validStatuses = ["Available", "Booked", "Inactive"];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: "Invalid status value. Allowed values: Available, Booked, Inactive" });
        }

  // Check if the machinery belongs to the logged-in user
  const machineryCheck = await pool.query("SELECT * FROM machinery WHERE machineryid = $1 AND ownerid = $2", [id, ownerid]);

  if (machineryCheck.rows.length === 0) {
      return res.status(403).json({ message: "Unauthorized: You can only update your own machinery" });
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
    // const ownerid = req.user.userId; // Extract user ID from JWT
    const { ownerid } = req.body;  //For testing

    try {
        // Ensure the machinery belongs to the logged-in user
        const machineryCheck = await pool.query("SELECT * FROM machinery WHERE machineryid = $1 AND ownerid = $2", [id, ownerid]);

        if (machineryCheck.rows.length === 0) {
            return res.status(403).json({ message: "Unauthorized: You can only delete your own machinery" });
        }
        
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
