// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', authController.register);  // Register route
router.post('/login', authController.login);        // Login route
router.get('/profile', protect, (req, res) => {
  res.status(200).json({
    message: 'User profile',
    user: req.user,
  });
});

module.exports = router;
