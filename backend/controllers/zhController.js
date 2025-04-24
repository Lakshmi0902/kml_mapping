const db = require("../db");

const uploadZHData = async (req, res) => {
  try {
    const { location, state, sector_id } = req.body;
    const kml_file = req.file?.filename;

    if (!location || !state || !sector_id || !kml_file) {
      return res.status(400).json({ error: "All fields are required." });
    }

    await db.execute(
      "INSERT INTO ZH_kml (location, state, sector_id, kml_file) VALUES (?, ?, ?, ?)",
      [location, state, sector_id, kml_file]
    );

    res.status(201).json({ message: "ZH data uploaded successfully." });
  } catch (error) {
    console.error("Error uploading ZH data:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const getZHFiles = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, sector_id, kml_file FROM ZH_kml"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching ZH KML files:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { uploadZHData, getZHFiles };
