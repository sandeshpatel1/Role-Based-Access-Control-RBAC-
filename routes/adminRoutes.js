const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Ensure correct path to middleware
const authorizeRole = require('../middlewares/authorizeRole');

// Protected Admin Route with role-based authorization
router.get('/protected-route', authMiddleware(['Admin']), (req, res) => {
  res.status(200).json({ message: 'Welcome, Admin!', data: { protected: true } });
});

router.get('/dashboard', authMiddleware(['Admin']), (req, res) => {
    res.status(200).json({
      message: 'Welcome, Admin to the Dashboard!',
      user: req.user, // Includes user information decoded from JWT token
    });
  });

module.exports = router;
