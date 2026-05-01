const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Batch = sequelize.define("Batch", {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  teacherId: DataTypes.INTEGER,
});

module.exports = Batch;