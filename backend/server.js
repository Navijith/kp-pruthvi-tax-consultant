require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const env = require('./config/env')
const pool = require('./config/db')

const { apiLimiter } = require('./middleware/rateLimiter')
const { notFoundHandler, errorHandler } = require('./middleware/errorMiddleware')

const authRoutes = require('./routes/authRoutes')
const publicRoutes = require('./routes/publicRoutes')
const appointmentRoutes = require('./routes/appointmentRoutes')
const leadRoutes = require('./routes/leadRoutes')
const followUpRoutes = require('./routes/followUpRoutes')
const notificationRoutes = require('./routes/notificationRoutes')
const settingsRoutes = require('./routes/settingsRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
const businessRoutes = require('./routes/businessRoutes')

const app = express()

// --------------------------------------------------
// Security and Parsing Middleware
// --------------------------------------------------

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  })
)

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
)

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))

// General rate limiter for all API endpoints
app.use('/api', apiLimiter)

// --------------------------------------------------
// API Routes
// --------------------------------------------------

// Base status
app.get('/', (req, res) => {
  res.json({
    success: true,
    service: 'KP Tax Consultants API',
    version: '1.0.0',
    consultant: 'KP Pruthvi, Tax Consultant',
    location: 'Bengaluru, Karnataka',
  })
})

// Authentication
app.use('/api/auth', authRoutes)

// Appointments (public booking + protected management)
app.use('/api/appointments', appointmentRoutes)

// Public pages (profile, services, health, enquiries)
app.use('/api', publicRoutes)

// Protected Administrative CRM
app.use('/api/leads', leadRoutes)
app.use('/api/follow-ups', followUpRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/businesses', businessRoutes)

// --------------------------------------------------
// Error Handling
// --------------------------------------------------

app.use(notFoundHandler)
app.use(errorHandler)

// --------------------------------------------------
// Server Startup
// --------------------------------------------------

async function startServer() {
  const PORT = env.PORT || 5000

  try {
    await pool.query('SELECT 1')
    console.log('✓ PostgreSQL connected successfully')
  } catch (error) {
    console.warn('⚠ Note: PostgreSQL connection unconfirmed at startup:', error.message)
    console.warn('  (Ensure DATABASE_URL is correct and migrations have been run)')
  }

  const server = app.listen(PORT, () => {
    console.log('')
    console.log('==============================================')
    console.log('     KP TAX CONSULTANTS — BACKEND API         ')
    console.log('==============================================')
    console.log(` Server:    http://localhost:${PORT}`)
    console.log(` Frontend:  ${env.FRONTEND_URL}`)
    console.log(` Mode:      ${env.NODE_ENV}`)
    console.log('==============================================')
    console.log('')
  })

  return server
}

if (require.main === module) {
  startServer()
}

module.exports = app
