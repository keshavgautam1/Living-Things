const express = require("express");
const {
  getFilteredConsumption,
  getConsumption,
} = require("../controllers/consumption_controller");
const protect = require("../middleware/auth_middleware");

const router = express.Router();

router.get("/", protect, getConsumption);
router.get("/filter", protect, getFilteredConsumption); // New endpoint for filtering

module.exports = router;
