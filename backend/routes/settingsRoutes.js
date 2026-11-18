const express = require('express')
const router = express.Router()
const settingsController = require('../controllers/settingsController')
const authMiddleware = require('../middleware/authMiddleware')
const requireRole = require('../middleware/roleMiddleware')

router.use(authMiddleware)
router.use(requireRole('admin'))

router.get('/', settingsController.getSettings)
router.patch('/', settingsController.updateSettings)

module.exports = router
