const express = require("express");

const router = express.Router();

const {
  signup,
  login,
} = require("../controllers/authController");

const User = require("../models/User");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

router.post("/signup", signup);

router.post("/login", login);

// Get all users
router.get(
  "/users",
  authMiddleware,
  async (req, res) => {
    try {
      const users =
        await User.find(
          {},
          "name email role"
        );

      res.json(users);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

module.exports = router;