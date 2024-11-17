const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth_route");
const logRoutes = require("./routes/log_route");
const consumptionRoutes = require("./routes/consumption_route");

require("dotenv").config();

const cors = require("cors");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/logs", logRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/consumption", consumptionRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
