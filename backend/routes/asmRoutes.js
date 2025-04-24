const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { uploadASMData } = require("../controllers/asmController");

router.post("/asm", upload.single("kml_file"), uploadASMData);

module.exports = router;
