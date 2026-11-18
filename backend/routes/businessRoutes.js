const express = require('express')
const router = express.Router()
const businessController = require('../controllers/businessController')
const authMiddleware = require('../middleware/authMiddleware')

router.use(authMiddleware)

router.get('/', businessController.getBusinesses)
router.get('/:id', businessController.getBusinessById)

module.exports = router
