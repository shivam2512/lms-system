const router = require("express").Router();
const batch = require("../controllers/batch.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const { allowRoles } = require("../middleware/role.middleware");

router.post(
  "/create",
  verifyToken,
  allowRoles("ADMIN", "SUPERADMIN"),
  batch.createBatch
);


module.exports = router;