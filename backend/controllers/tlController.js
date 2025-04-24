const db = require("../db");

const uploadTLData = async (req, res) => {
  try {
    const { location, state, sector_id, tier } = req.body;
    const kml_file = req.file?.filename;

    if (!location || !state || !sector_id || !tier || !kml_file) {
      return res.status(400).json({ error: "All fields are required." });
    }

    await db.execute(
      "INSERT INTO TL_kml (location, state, sector_id, tier, kml_file) VALUES (?, ?, ?, ?, ?)",
      [location, state, sector_id, tier, kml_file]
    );

    res.status(201).json({ message: "TL data uploaded successfully." });
  } catch (error) {
    console.error("Error uploading TL data:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { uploadTLData };
