const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { uploadTSMData } = require("../controllers/tsmController");

router.post("/tsm", upload.single("kml_file"), uploadTSMData);

module.exports = router;
