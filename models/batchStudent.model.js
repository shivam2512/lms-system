const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const BatchStudent = sequelize.define("BatchStudent", {
  batchId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = BatchStudent;