const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const ticketRoutes = require("./routes/ticketRoutes");
app.use("/api/tickets", ticketRoutes);

module.exports = app;
