const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const { register, login } = require("../controllers/auth");

// POST http://localhost:5000/api/auth/register
router.post(
  "/register",
  [
    body("name", "Name is required").not().isEmpty(),
    body("email", "Please include a valid email").isEmail(),
    body("password", "Password must be 6+ characters").isLength({ min: 6 }),
  ],
  register
);

router.post(
  "/login",
  [
    body("email", "Please include a valid email").isEmail(),
    body("password", "Password is required").exists(),
  ],
  login
);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);
// router.post("/logout", logout);

module.exports = router;
