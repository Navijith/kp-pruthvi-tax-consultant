const express = require('express')
const router = express.Router()
const followUpController = require('../controllers/followUpController')
const authMiddleware = require('../middleware/authMiddleware')

router.use(authMiddleware)

router.get('/', followUpController.getFollowUps)
router.post('/', followUpController.createFollowUp)
router.patch('/:id', followUpController.updateFollowUp)

module.exports = router
