const express = require('express')
const router = express.Router()
const leadController = require('../controllers/leadController')
const authMiddleware = require('../middleware/authMiddleware')

router.use(authMiddleware)

router.get('/', leadController.getLeads)
router.get('/:id', leadController.getLeadById)
router.patch('/:id', leadController.updateLead)
router.post('/:id/notes', leadController.addLeadNote)

module.exports = router
