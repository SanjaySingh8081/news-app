const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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


// --- NEW LOGIN ENDPOINT ---
router.post('/login', async (req, res) => {
  try {
    // 1. Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials. Please try again." });
    }

    // 2. Check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials. Please try again." });
    }

    // 3. Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // Send back the token and user info (without the password)
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


module.exports = router;