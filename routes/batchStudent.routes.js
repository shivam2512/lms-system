const router = require("express").Router();
const ctrl = require("../controllers/batchStudent.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { allowRoles } = require("../middleware/role.middleware");

// ADMIN only
router.post(
  "/add",
  verifyToken,
  allowRoles("ADMIN", "SUPERADMIN"),
  ctrl.addStudent
);

router.post(
  "/remove",
  verifyToken,
  allowRoles("ADMIN", "SUPERADMIN"),
  ctrl.removeStudent
);

// ADMIN + TEACHER can view
router.get(
  "/:batchId",
  verifyToken,
  allowRoles("ADMIN", "SUPERADMIN", "TEACHER"),
  ctrl.getStudents
);

module.exports = router;