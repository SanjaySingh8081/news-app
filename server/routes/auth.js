const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendPasswordResetEmail = require('../utils/sendEmail');

// --- REGISTRATION ENDPOINT ---
router.post('/register', async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ message: "User with this email already exists." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created successfully!", userId: savedUser._id });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error: error });
  }
});

// --- LOGIN ENDPOINT ---
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials. Please try again." });
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials. Please try again." });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ 
        message: "Logged in successfully!",
        token: token,
        user: {
            id: user._id,
            email: user.email
        }
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong.", error: error });
  }
});

// --- FORGOT PASSWORD ENDPOINT ---
router.post('/forgot-password', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).json({ message: "If a user with that email exists, a password reset link has been sent." });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Dynamically create the reset link using the environment variable
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendPasswordResetEmail(user.email, resetLink);

    res.status(200).json({ message: "If a user with that email exists, a password reset link has been sent." });

  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Something went wrong.", error: error });
  }
});

// --- RESET PASSWORD ENDPOINT ---
router.post('/reset-password/:token', async (req, res) => {
  try {
    const user = await User.findOne({
      passwordResetToken: req.params.token,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Password reset token is invalid or has expired." });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Password has been reset successfully. You can now log in." });

  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
});

module.exports = router;