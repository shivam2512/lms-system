const sequelize = require("../config/db");
const User = require("./user.model");

sequelize.sync({ alter: true }).then(() => {
  console.log("Tables synced ✅");
});

module.exports = {
  sequelize,
  User,
};