const express = require("express");

const router = express.Router();

const {
  createProject,
  getProjects,
} = require(
  "../controllers/projectController"
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
  createProject
);

// Both admin/member
router.get(
  "/",
  authMiddleware,
  getProjects
);

module.exports = router;