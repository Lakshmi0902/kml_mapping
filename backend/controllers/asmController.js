const db = require("../db");

const uploadASMData = async (req, res) => {
  try {
    const { location, state, sector_id } = req.body;
    const kml_file = req.file?.filename;

    if (!location || !state || !sector_id || !kml_file) {
      return res.status(400).json({ error: "All fields are required." });
    }

    await db.execute(
      "INSERT INTO ASM_kml (location, state, sector_id, kml_file) VALUES (?, ?, ?, ?)",
      [location, state, sector_id, kml_file]
    );

    res.status(201).json({ message: "ASM data uploaded successfully." });
  } catch (error) {
    console.error("Error uploading ASM data:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { uploadASMData };
