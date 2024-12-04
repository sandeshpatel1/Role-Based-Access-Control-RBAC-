const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/authorizeRole');

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ username, email, password, role });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      token,
      user: { id: newUser._id, username: newUser.username, role: newUser.role },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      token,
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Protected Route for Admin
router.get('/admin/dashboard', authMiddleware, authorizeRole('Admin'), (req, res) => {
  res.status(200).json({
    message: 'Welcome Admin to the dashboard!',
    user: req.user,
  });
});


// Protected Route for Users (access for all roles)
router.get('/user/profile', authMiddleware, (req, res) => {
  res.status(200).json({
    message: 'User profile data.',
    user: req.user,
  });
});

// Logout Route
router.post('/logout', (req, res) => {
  // Invalidate token client-side (handled in frontend), just send response for now
  res.status(200).json({ message: 'User logged out successfully' });
});

module.exports = router;
