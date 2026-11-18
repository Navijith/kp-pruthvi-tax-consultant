const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')
const authMiddleware = require('../middleware/authMiddleware')
const requireRole = require('../middleware/roleMiddleware')

router.get('/', profileController.getProfile)
router.patch('/', authMiddleware, requireRole('admin'), profileController.updateProfile)

module.exports = router
