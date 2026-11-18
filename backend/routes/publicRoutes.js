const express = require('express')
const router = express.Router()
const pool = require('../config/db')
const profileController = require('../controllers/profileController')
const serviceController = require('../controllers/serviceController')
const enquiryController = require('../controllers/enquiryController')
const { publicSubmissionLimiter } = require('../middleware/rateLimiter')

router.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() AS current_time')
    res.json({
      success: true,
      message: 'KP Tax Consultants API is healthy',
      database: 'connected',
      time: result.rows[0].current_time,
    })
  } catch (error) {
    res.status(503).json({
      success: false,
      message: 'Database unavailable or disconnected',
      database: 'disconnected',
    })
  }
})

router.get('/profile', profileController.getProfile)
router.get('/services', serviceController.getServices)
router.get('/services/:slug', serviceController.getServiceBySlug)
router.post('/enquiries', publicSubmissionLimiter, enquiryController.submitEnquiry)

module.exports = router
