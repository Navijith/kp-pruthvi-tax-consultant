const express = require('express')
const router = express.Router()
const appointmentController = require('../controllers/appointmentController')
const authMiddleware = require('../middleware/authMiddleware')
const { publicSubmissionLimiter } = require('../middleware/rateLimiter')

// Public request endpoint
router.post('/', publicSubmissionLimiter, appointmentController.requestAppointment)

// Protected admin endpoints
router.get('/', authMiddleware, appointmentController.getAppointments)
router.patch('/:id', authMiddleware, appointmentController.updateAppointmentStatus)

module.exports = router
