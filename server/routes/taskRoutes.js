const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  updateTaskStatus,
} = require(
  "../controllers/taskController"
);

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const roleMiddleware = require(
  "../middleware/roleMiddleware"
);

// Admin only
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  createTask
);

// Admin + Member
router.get(
  "/",
  authMiddleware,
  getTasks
);

// Update Status
router.patch(
  "/:id/status",
  authMiddleware,
  updateTaskStatus
);

module.exports = router;