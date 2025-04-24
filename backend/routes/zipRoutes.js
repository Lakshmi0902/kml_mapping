const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const AdmZip = require("adm-zip");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const zipPath = path.join(__dirname, "..", "uploads", "zips");
    if (!fs.existsSync(zipPath)) {
      fs.mkdirSync(zipPath, { recursive: true });
    }
    cb(null, zipPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Upload ZIP endpoint
router.post("/upload-zip", upload.single("zipFile"), (req, res) => {
  const { state, district } = req.body;
  const zipFile = req.file;

  console.log("📩 Incoming upload:");
  console.log("State:", state);
  console.log("District:", district);
  console.log("File path:", zipFile.path);

  if (!zipFile) {
    return res.status(400).json({ message: "No ZIP file uploaded" });
  }

  const extractPath = path.join(__dirname, "..", "uploads", state, district);
  console.log("📂 Extracting to:", extractPath);

  if (!fs.existsSync(extractPath)) {
    fs.mkdirSync(extractPath, { recursive: true });
  }

  try {
    const zip = new AdmZip(zipFile.path);
    zip.extractAllTo(extractPath, true);
    console.log("✅ ZIP extracted successfully!");

    // Get all extracted files recursively
    const getAllFiles = (dir, fileList = []) => {
      const files = fs.readdirSync(dir);
      files.forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
          getAllFiles(filePath, fileList);
        } else {
          fileList.push(filePath);
        }
      });
      return fileList;
    };

    const allExtractedFiles = getAllFiles(extractPath);
    const kmlFiles = [];

    allExtractedFiles.forEach((filePath) => {
      if (path.extname(filePath).toLowerCase() === ".kml") {
        const relativePath = path.relative(
          path.join(__dirname, "../uploads"),
          filePath
        );
        // kmlFiles.push(relativePath.replace(/\\/g, "/"));
        const fullUrl = `${req.protocol}://${req.get(
          "host"
        )}/uploads/${relativePath.replace(/\\/g, "/")}`;
        kmlFiles.push(fullUrl);
        // Ensures relative path with correct slashes
      }
    });

    console.log("Extracted KML files:", kmlFiles);

    return res.status(200).json({
      message: "ZIP uploaded and extracted successfully",
      extractedKmlFiles: kmlFiles,
      state,
      district,
    });
  } catch (error) {
    console.error("❌ ZIP extraction failed:", error);
    return res.status(500).json({ message: "ZIP extraction failed", error });
  }
});
router.get("/view-kml-zips", (req, res) => {
  const { state, district } = req.query;

  // Validate state and district
  if (!state || !district) {
    return res.status(400).json({ error: "State and district are required" });
  }

  const directoryPath = path.join(__dirname, "uploads", state, district, "kml");
  const kmlFiles = [];

  // Read the directory containing KML files
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read directory" });
    }

    // Filter out non-KML files
    files.forEach((file) => {
      if (file.endsWith(".kml")) {
        kmlFiles.push(`/uploads/${state}/${district}/kml/${file}`);
      }
    });

    // Send the list of KML file URLs
    res.json({
      extractedKmlFiles: kmlFiles,
      state,
      district,
    });
  });
});

module.exports = router;
