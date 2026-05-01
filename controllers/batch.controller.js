const { Batch, User } = require("../models");

exports.createBatch = async (req, res) => {
  try {
    const { name, description, teacherId } = req.body;

    // 🔥 Validate teacher exists and is TEACHER
    const teacher = await User.findByPk(teacherId);

    if (!teacher || teacher.role !== "TEACHER") {
      return res.status(400).json("Invalid teacherId");
    }

    const batch = await Batch.create({
      name,
      description,
      teacherId,
    });

    res.json(batch);
  } catch (err) {
    res.status(500).json(err.message);
  }
};