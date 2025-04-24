const express = require("express");
const router = express.Router();
const distributorController = require("../controllers/distributorController");
const upload = require("../middlewares/upload");

router.post(
  "/distributor",
  upload.single("kml_file"),
  distributorController.uploadDistributorData
);

module.exports = router;
