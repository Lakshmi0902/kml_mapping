const express = require("express");
const router = express.Router();
const tseController = require("../controllers/tseController");
const upload = require("../middlewares/upload");

router.post("/tse", upload.single("kml_file"), tseController.uploadTSEData);

module.exports = router;
