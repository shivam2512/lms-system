const express = require("express");
const cors = require("cors");
const { verifyToken } = require("./middleware/auth.middleware");

require("dotenv").config();

// 🔥 import sequelize from models
const { sequelize } = require("./models");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/auth.routes"));

// Test route
app.get("/", (req, res) => {
  res.send("LMS Backend Running 🚀");
});

app.get("/api/protected", verifyToken, (req, res) => {
  res.json({
    message: "Protected route accessed ✅",
    user: req.user,
  });
});

app.listen(process.env.PORT || 5000, async () => {
  try {
    await sequelize.authenticate(); // 🔥 DB connection check
    console.log("DB Connected ✅");
  } catch (err) {
    console.error("DB Error ❌", err.message);
  }

  console.log("Server started...");
});