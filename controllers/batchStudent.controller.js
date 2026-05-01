const { Batch, User, BatchStudent } = require("../models");

// ➕ Add student to batch (ADMIN only)
exports.addStudent = async (req, res) => {
  try {
    const { batchId, studentId } = req.body;

    // validate batch
    const batch = await Batch.findByPk(batchId);
    if (!batch) return res.status(404).json("Batch not found");

    // validate student
    const student = await User.findByPk(studentId);
    if (!student || student.role !== "STUDENT") {
      return res.status(400).json("Invalid studentId");
    }

    // avoid duplicates
    const exists = await BatchStudent.findOne({
      where: { batchId, studentId },
    });
    if (exists) return res.status(400).json("Student already in batch");

    const record = await BatchStudent.create({ batchId, studentId });

    res.json({ message: "Student added to batch ✅", record });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// ➖ Remove student from batch (ADMIN only)
exports.removeStudent = async (req, res) => {
  try {
    const { batchId, studentId } = req.body;

    const deleted = await BatchStudent.destroy({
      where: { batchId, studentId },
    });

    if (!deleted) return res.status(404).json("Mapping not found");

    res.json({ message: "Student removed from batch ✅" });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// 📥 Get students of a batch (ADMIN/TEACHER)
exports.getStudents = async (req, res) => {
  try {
    const { batchId } = req.params;

    const batch = await Batch.findByPk(batchId, {
      include: [
        {
          model: User,
          as: "students",
          attributes: ["id", "name", "email", "role"],
          through: { attributes: [] },
        },
      ],
    });

    if (!batch) return res.status(404).json("Batch not found");

    res.json(batch.students);
  } catch (err) {
    res.status(500).json(err.message);
  }
};