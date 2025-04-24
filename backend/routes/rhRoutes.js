const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { uploadRHData } = require("../controllers/rhController");

router.post("/rh", upload.single("kml_file"), uploadRHData);

module.exports = router;
