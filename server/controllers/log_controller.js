const mongoose = require("mongoose");
const Log = require("../models/Log");

exports.addLog = async (req, res) => {
  const { access_time, access_date, employee_name, algo_status } = req.body;

  try {
    if (!access_time || !access_date || !employee_name || !algo_status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const log = new Log({
      user: req.user._id,
      access_time,
      access_date,
      employee_name,
      algo_status,
    });

    await log.save();
    res.status(201).json({ message: "Log created successfully", log });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create log", error: error.message });
  }
};

// Fetch logs
exports.getLogs = async (req, res) => {
  try {
    const logs = await Log.find({ user: req.user.id }).sort({ access_time: 1 });
    res.status(200).json(logs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch logs", error: error.message });
  }
};
