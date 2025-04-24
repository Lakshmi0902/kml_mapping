const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up storage destination and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// File filter to accept only .kml files
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/vnd.google-earth.kml+xml" ||
    file.originalname.endsWith(".kml")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only KML files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
