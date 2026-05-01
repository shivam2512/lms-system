const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Note = sequelize.define("Note", {
  title: DataTypes.STRING,
  fileUrl: DataTypes.STRING,
  batchId: DataTypes.INTEGER,
  uploadedBy: DataTypes.INTEGER,
});

module.exports = Note;