const express = require('express')

const {
  login,
  me,
} = require('../controllers/authController')

const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

// Admin login
router.post('/login', login)

// Get currently authenticated admin
router.get('/me', authMiddleware, me)

module.exports = router