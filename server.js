const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("LMS Backend Running 🚀");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started...");
});