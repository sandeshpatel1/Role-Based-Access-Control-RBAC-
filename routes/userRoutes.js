const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Ensure correct path to middleware

// Protected Route for Users (access for all roles)
router.get('/user/profile', authMiddleware(), (req, res) => {
  // Assuming that the token and the user data are valid
  res.status(200).json({
    message: 'User profile data.',
    user: req.user, // Includes user information decoded from JWT token
  });
});

module.exports = router;
