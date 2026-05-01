const { Note, Batch, BatchStudent } = require("../models");

exports.uploadNote = async (req, res) => {
  try {
    const { title, batchId } = req.body;

    const batch = await Batch.findByPk(batchId);
    if (!batch) return res.status(404).json("Batch not found");

    const note = await Note.create({
      title,
      fileUrl: req.file.path,
      batchId,
      uploadedBy: req.user.id,
    });

    res.json(note);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// 📥 Get notes for a batch
exports.getNotes = async (req, res) => {
  try {
    const { batchId } = req.params;

    const notes = await Note.findAll({
      where: { batchId },
    });

    res.json(notes);
  } catch (err) {
    res.status(500).json(err.message);
  }
};