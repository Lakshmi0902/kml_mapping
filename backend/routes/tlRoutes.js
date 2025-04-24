const express = require("express");
const router = express.Router();
const tlController = require("../controllers/tlController");
const upload = require("../middlewares/upload");

router.post("/tl", upload.single("kml_file"), tlController.uploadTLData);

module.exports = router;
