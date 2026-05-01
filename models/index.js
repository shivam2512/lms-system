const sequelize = require("../config/db");
const User = require("./user.model");
const Batch = require("./batch.model");

// Optional relation
Batch.belongsTo(User, { foreignKey: "teacherId", as: "teacher" });

sequelize.sync({ alter: true }).then(() => {
  console.log("Tables synced ✅");
});

module.exports = {
  sequelize,
  User,
  Batch,
};