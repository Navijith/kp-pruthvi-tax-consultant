const rateLimit = require('express-rate-limit')

// General API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
})

// Dedicated login rate limiter to prevent brute force
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // max 10 failed login attempts per IP
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message: 'Too many failed login attempts. Please wait 15 minutes before trying again.',
  },
})

// Public enquiry and appointment rate limiter to avoid spam
const publicSubmissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 15, // max 15 requests per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many submissions received. Please call or WhatsApp us directly at +91 70194 84928.',
  },
})

module.exports = {
  apiLimiter,
  loginLimiter,
  publicSubmissionLimiter,
}
