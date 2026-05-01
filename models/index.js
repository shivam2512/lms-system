const sequelize = require("../config/db");
const User = require("./user.model");
const Batch = require("./batch.model");
const BatchStudent = require("./batchStudent.model");
const Note = require("./note.model");

// existing
Batch.belongsTo(User, { foreignKey: "teacherId", as: "teacher" });

// 🔥 NEW RELATIONS
Batch.belongsToMany(User, {
  through: BatchStudent,
  foreignKey: "batchId",
  otherKey: "studentId",
  as: "students",
});

User.belongsToMany(Batch, {
  through: BatchStudent,
  foreignKey: "studentId",
  otherKey: "batchId",
  as: "batches",
});

Note.belongsTo(Batch, { foreignKey: "batchId" });
Note.belongsTo(User, { foreignKey: "uploadedBy", as: "uploader" });

sequelize.sync({ alter: true }).then(() => {
  console.log("Tables synced ✅");
});

module.exports = {
  sequelize,
  User,
  Batch,
  BatchStudent,
  Note,
};


