const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const { register, login, forgotPassword, resetPassword } = require("../controllers/auth");


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

//POST http://localhost:5000/api/auth/login
router.post(
  "/login",
  [
    body("email", "Please include a valid email").isEmail(),
    body("password", "Password is required").exists(),
  ],
  login
);


// POST http://localhost:5000/api/auth/forgot-password
router.post(
  "/forgot-password",
  [body("email", "Please enter a valid email").isEmail()],
  forgotPassword
);


// POST http://localhost:5000/api/auth/reset-password/<token_here>
router.post(
  '/reset-password/:token',
  [body('password', 'Password must be at least 6 characters').isLength({ min: 6 })],
  resetPassword
);


// router.post("/logout", logout);
// Logout is normally done in the front end, just remove token from where you store it. maybe localstorage or cookies
module.exports = router;



/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user and return JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Send password reset link to email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Reset link sent
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /auth/reset-password/{token}:
 *   post:
 *     summary: Reset password using the token sent to email
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: The password reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: newStrongPassword123
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired token
 */


