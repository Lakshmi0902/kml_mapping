const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5001;
const path = require("path");
const db = require("./db");
const fs = require("fs");
const AdmZip = require("adm-zip");
const multer = require("multer");

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

// Middleware
app.use(
  cors({
    origin: "http://localhost:5174", // Only allow requests from the frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve uploaded files

// Connect to DB

// Routes
const zhRoutes = require("./routes/zhRoutes");
const rhRoutes = require("./routes/rhRoutes");
const asmRoutes = require("./routes/asmRoutes");
const tsmRoutes = require("./routes/tsmRoutes");
const tlRoutes = require("./routes/tlRoutes");
const tseRoutes = require("./routes/tseRoutes");
const distributorRoutes = require("./routes/distributorRoutes");
const zipRoutes = require("./routes/zipRoutes");

// Use routes
app.use("/api", zhRoutes);
app.use("/api", rhRoutes);
app.use("/api", asmRoutes);
app.use("/api", tsmRoutes);
app.use("/api", tlRoutes);
app.use("/api", tseRoutes);
app.use("/api", distributorRoutes);
app.use("/", zipRoutes);

app.get("/api/:role/files", (req, res) => {
  const role = req.params.role.toLowerCase();
  const validRoles = {
    zh: "sector_id",
    rh: "sector_id",
    asm: "sector_id",
    tsm: "sector_id",
    tl: "sector_id",
    tse: "sector_id",
    distributor: "district_sector_id", // alias this below
  };

  if (!validRoles[role]) {
    return res.status(400).json({ error: "Invalid role" });
  }

  const tableName = `${role}_kml`;
  const columnName = validRoles[role];

  // Use alias if needed to return consistent column name to frontend
  const query = `SELECT id, ${columnName} AS sector_id, kml_file FROM ${tableName}`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
});
app.post("/upload-zip", upload.single("zipFile"), (req, res) => {
  const { state, district } = req.body;
  const zipFile = req.file; // This is where the uploaded file is assigned

  console.log("📩 Incoming upload:");
  console.log("State:", state);
  console.log("District:", district);
  console.log("File path:", zipFile.path);

  // Check if a ZIP file was uploaded
  if (!zipFile) {
    return res.status(400).json({ message: "No ZIP file uploaded" });
  }

  // Define extraction path based on state and district
  const extractPath = path.join(__dirname, "uploads", state, district);
  console.log("📂 Extracting to:", extractPath);

  // Create the extraction directory if it doesn't exist
  if (!fs.existsSync(extractPath)) {
    fs.mkdirSync(extractPath, { recursive: true });
  }

  try {
    // Create an instance of AdmZip to extract the contents of the ZIP file
    const zip = new AdmZip(zipFile.buffer);
    zip.extractAllTo(extractPath, true);
    console.log("✅ ZIP extracted successfully!");

    // Helper function to get all files recursively from the extracted directory
    const getAllFiles = (dir, fileList = []) => {
      const files = fs.readdirSync(dir);
      files.forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
          getAllFiles(filePath, fileList); // Recursively check directories
        } else {
          fileList.push(filePath);
        }
      });
      return fileList;
    };

    // Get all extracted files
    const allExtractedFiles = getAllFiles(extractPath);
    const kmlFiles = [];

    // Check for KML files in the extracted directory
    allExtractedFiles.forEach((filePath) => {
      if (path.extname(filePath).toLowerCase() === ".kml") {
        const relativePath = path.relative(
          path.join(__dirname, "uploads"),
          filePath
        );
        const fullUrl = `${req.protocol}://${req.get(
          "host"
        )}/uploads/${relativePath.replace(/\\/g, "/")}`;
        kmlFiles.push(fullUrl);
      }
    });

    console.log("Extracted KML files:", kmlFiles);

    // Respond with the extracted KML file URLs
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

app.get("/view-kml-zips", (req, res) => {
  const { state, district } = req.query;
  console.log("Received state and district:", { state, district }); // Debugging log

  if (!state || !district) {
    return res.status(400).json({ message: "State or district not provided." });
  }

  const folderPath = path.join(__dirname, "uploads", state, district);
  console.log("Looking for KML files in:", folderPath); // Debugging log

  let kmlFiles = [];

  if (!fs.existsSync(folderPath)) {
    console.log("Folder does not exist.");
    return res.status(404).json({ message: "No files found." });
  }

  const walkDir = (dir) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filepath = path.join(dir, file);
      const stat = fs.statSync(filepath);
      if (stat.isDirectory()) {
        walkDir(filepath); // Recurse if subdirectory
      } else if (file.endsWith(".kml")) {
        const relativePath = path.relative(
          path.join(__dirname, "uploads"),
          filepath
        );
        kmlFiles.push(relativePath.replace(/\\/g, "/")); // Use forward slashes for path
      }
    }
  };

  walkDir(folderPath);

  if (kmlFiles.length === 0) {
    console.log("No KML files found.");
    return res.status(404).json({ message: "No KML files found." });
  }

  console.log("✅ Sending KML files:", kmlFiles);
  res.json({ kmlFiles });
});

app.get("/", (req, res) => {
  res.send("KML Mapping Backend is running.");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
