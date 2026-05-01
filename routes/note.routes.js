const router = require("express").Router();
const note = require("../controllers/note.controller");
const upload = require("../middleware/upload.middleware");
const { verifyToken } = require("../middleware/auth.middleware");
const { allowRoles } = require("../middleware/role.middleware");

// upload note (ADMIN + TEACHER)
router.post(
  "/upload",
  verifyToken,
  allowRoles("ADMIN", "TEACHER", "SUPERADMIN"),
  upload.single("file"),
  note.uploadNote
);

// get notes (all logged-in users)
router.get(
  "/:batchId",
  verifyToken,
  note.getNotes
);

module.exports = router;