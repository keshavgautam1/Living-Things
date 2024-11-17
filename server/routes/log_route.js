const express = require("express");
const { addLog, getLogs } = require("../controllers/log_controller");
const protect = require("../middleware/auth_middleware");

const router = express.Router();

// POST /logs - Add a new log
router.post("/", protect, addLog);

// GET /logs - Get logs for the authenticated user
router.get("/", protect, getLogs);

module.exports = router;
