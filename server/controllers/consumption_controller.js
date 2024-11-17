const Consumption = require("../models/Consumption");

exports.getConsumption = async (req, res) => {
  try {
    // Limit the results to the first 100 records
    const data = await Consumption.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFilteredConsumption = async (req, res) => {
  const { startDate, endDate, algo_status } = req.query;

  try {
    const filter = {};

    if (startDate) {
      filter.createdAt = { $gte: new Date(startDate) };
    }

    if (endDate) {
      if (filter.createdAt) {
        filter.createdAt = { ...filter.createdAt, $lte: new Date(endDate) };
      } else {
        filter.createdAt = { $lte: new Date(endDate) };
      }
    }

    if (algo_status) {
      filter.algo_status = algo_status === "ON" ? 1 : 0;
    }

    const data = await Consumption.find(filter).limit(500);

    res.json(data);
  } catch (error) {
    console.error("Error in getFilteredConsumption:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch filtered data", error: error.message });
  }
};
