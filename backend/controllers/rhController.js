const db = require("../db");

const uploadRHData = async (req, res) => {
  try {
    const { location, state, sector_id } = req.body;
    const kml_file = req.file?.filename;

    if (!location || !state || !sector_id || !kml_file) {
      return res.status(400).json({ error: "All fields are required." });
    }

    await db.execute(
      "INSERT INTO RH_kml (location, state, sector_id, kml_file) VALUES (?, ?, ?, ?)",
      [location, state, sector_id, kml_file]
    );

    res.status(201).json({ message: "RH data uploaded successfully." });
  } catch (error) {
    console.error("Error uploading RH data:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
const getRHFiles = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, sector_id, kml_file FROM RH_kml"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching RH KML files:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { uploadRHData, getRHFiles };
