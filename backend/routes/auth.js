const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');
const { getProfile, updateProfile, updatePassword, deleteAccount } = require('../controllers/userController');
const authMiddleware = require('../middleware/authentication');

// User registration route
router.post('/register', register);

// User login route
router.post('/login', login);

// Fetch user profile
router.get('/profile', authMiddleware, getProfile);

// Edit profile
router.put('/profile', authMiddleware, updateProfile);

// Update password
router.put('/password', authMiddleware, updatePassword);

// Delete account
router.delete('/account', authMiddleware, deleteAccount);

module.exports = router;
