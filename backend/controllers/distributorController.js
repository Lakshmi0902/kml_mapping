const db = require("../db");

const uploadDistributorData = async (req, res) => {
  try {
    const { location, state, district_sector_id, district_name, requested_by } =
      req.body;
    const kml_file = req.file?.filename;

    if (
      !location ||
      !state ||
      !district_sector_id ||
      !district_name ||
      !requested_by ||
      !kml_file
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    await db.execute(
      "INSERT INTO Distributor_kml (location, state, district_sector_id, district_name, requested_by, kml_file) VALUES (?, ?, ?, ?, ?, ?)",
      [
        location,
        state,
        district_sector_id,
        district_name,
        requested_by,
        kml_file,
      ]
    );

    res
      .status(201)
      .json({ message: "Distributor data uploaded successfully." });
  } catch (error) {
    console.error("Error uploading Distributor data:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { uploadDistributorData };
