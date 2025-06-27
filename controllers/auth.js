const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const { validationResult } = require("express-validator");

exports.register = async (req, res) => {
  // Validate Input
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save User
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    // User registration Successful
    res.status(201).json({ msg: "Registration successful, please log in" });
  } catch (err) {
    console.error(err.message);
  }
};

exports.login = async (req, res) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Create and send JWT
    const payload = { user: { id: user.id } };

    // Return JWT
    // Return the user.id inside the token for later identification.
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || "1d" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) res.status(404).json({ msg: "User not found go and resgister" });

    // Generate a token
    const resetToken = crypto.randomBytes(32).toString("hex");
    // Using SHA-256 haashing algorithm
    const hash = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetToken = hash;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 2000; // 30 mins
    await user.save();

    // Create reset link
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const message = `
        <h3>You request to reset password</h3>
        <p>Click the link below to reset your password. This link will expire in 30 minutes.</p>
        <a href="${resetUrl}">${resetUrl}</a>
        `;

    // Send email
    await sendEmail('obitopeeniola@gmail.com', "Password Reset Request", message);

    res.status(200).json({ msg: "Password Reset email sent" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


exports.resetPassword = async (req, res) => {
    // Get the token gen from the url
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Hash the token from URL
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with matching token and valid expiry
    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ msg: 'Invalid or expired token' });

    // Hash new password -- genetate a random string
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // reset token fields
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.status(200).json({ msg: 'Password has been reset successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
