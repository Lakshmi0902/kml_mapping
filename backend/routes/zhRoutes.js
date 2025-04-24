const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { uploadZHData } = require("../controllers/zhController");

router.post("/zh", upload.single("kml_file"), uploadZHData);

module.exports = router;
