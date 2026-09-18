require('dotenv').config()

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const pool = require('./config/db')
const authRoutes = require('./routes/authRoutes')

const app = express()

const PORT = Number(process.env.PORT || 5000)

const FRONTEND_URL =
  process.env.FRONTEND_URL || 'http://localhost:5173'

// --------------------------------------------------
// Middleware
// --------------------------------------------------

app.use(
  cors({
    origin: FRONTEND_URL,
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

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api', apiLimiter)

// --------------------------------------------------
// Authentication Routes
// --------------------------------------------------

app.use('/api/auth', authRoutes)

// --------------------------------------------------
// Basic route
// --------------------------------------------------

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'KP PRUTHVI Tax Consultant API',
    version: '1.0.0',
  })
})

// --------------------------------------------------
// Health check
// --------------------------------------------------

app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT NOW() AS current_time'
    )

    res.json({
      success: true,
      message: 'API is running',
      database: 'connected',
      time: result.rows[0].current_time,
    })
  } catch (error) {
    console.error(
      'Database health check failed:',
      error
    )

    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message,
    })
  }
})

// --------------------------------------------------
// Profile
// --------------------------------------------------

app.get('/api/profile', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        designation,
        phone,
        whatsapp,
        email,
        address,
        city,
        state,
        pincode,
        country,
        latitude,
        longitude,
        bio,
        created_at,
        updated_at
      FROM profile
      ORDER BY created_at ASC
      LIMIT 1
    `)

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found',
      })
    }

    res.json({
      success: true,
      data: result.rows[0],
    })
  } catch (error) {
    console.error('Profile error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
    })
  }
})

// --------------------------------------------------
// Services
// --------------------------------------------------

app.get('/api/services', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        slug,
        short_description,
        description,
        display_order
      FROM services
      WHERE is_active = TRUE
      ORDER BY display_order ASC
    `)

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    })
  } catch (error) {
    console.error('Services error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch services',
    })
  }
})

// --------------------------------------------------
// Public enquiry
// --------------------------------------------------

app.post('/api/enquiries', async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      service,
      message,
    } = req.body

    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message:
          'Name, phone and message are required',
      })
    }

    const result = await pool.query(
      `
      INSERT INTO leads (
        name,
        phone,
        email,
        source,
        status,
        priority,
        score,
        notes
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING
        id,
        name,
        phone,
        email,
        source,
        status,
        priority,
        score,
        notes,
        created_at
      `,
      [
        name.trim(),
        phone.trim(),
        email?.trim() || null,
        'website',
        'new',
        'medium',
        50,
        `Requested service: ${
          service || 'Not specified'
        }\n\n${message.trim()}`,
      ]
    )

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: result.rows[0],
    })
  } catch (error) {
    console.error('Enquiry error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to submit enquiry',
    })
  }
})


// --------------------------------------------------
// Appointments
// --------------------------------------------------

app.post('/api/appointments', async (req, res) => {
  const {
    name,
    phone,
    email,
    service,
    mode,
    preferred_method,
    appointment_date,
    appointment_time,
    duration_minutes,
    message,
  } = req.body

  if (!name || !phone || !service || !mode || !preferred_method || !appointment_date || !appointment_time) {
    return res.status(400).json({
      success: false,
      message: 'Name, phone, service, mode, date and time are required',
    })
  }

  if (!['online', 'offline'].includes(mode)) {
    return res.status(400).json({ success: false, message: 'Invalid consultation mode' })
  }

  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    const referenceCode = `KP-${Date.now().toString(36).toUpperCase()}`

    const leadResult = await client.query(
      `INSERT INTO leads (name, phone, email, source, status, priority, score, notes)
       VALUES ($1, $2, $3, 'appointment', 'new', 'high', 80, $4)
       RETURNING id`,
      [
        name.trim(),
        phone.trim(),
        email?.trim() || null,
        `Appointment requested: ${service}\nMode: ${mode}\nPreferred method: ${preferred_method}\nDate: ${appointment_date}\nTime: ${appointment_time}\n\n${message?.trim() || ''}`,
      ]
    )

    const appointmentResult = await client.query(
      `INSERT INTO appointments (
        lead_id, reference_code, name, phone, email, service, mode,
        preferred_method, appointment_date, appointment_time,
        duration_minutes, message
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING id, reference_code, status, created_at`,
      [
        leadResult.rows[0].id,
        referenceCode,
        name.trim(),
        phone.trim(),
        email?.trim() || null,
        service.trim(),
        mode,
        preferred_method.trim(),
        appointment_date,
        appointment_time,
        Number(duration_minutes) || 15,
        message?.trim() || null,
      ]
    )

    await client.query('COMMIT')

    return res.status(201).json({
      success: true,
      message: 'Appointment request submitted successfully',
      data: appointmentResult.rows[0],
    })
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Appointment error:', error)
    return res.status(500).json({ success: false, message: 'Failed to submit appointment request' })
  } finally {
    client.release()
  }
})

app.get('/api/appointments', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, reference_code, name, phone, email, service, mode,
             preferred_method, appointment_date, appointment_time,
             duration_minutes, message, status, created_at, updated_at
      FROM appointments
      ORDER BY appointment_date ASC, appointment_time ASC, created_at DESC
    `)

    res.json({ success: true, count: result.rows.length, data: result.rows })
  } catch (error) {
    console.error('Appointments error:', error)
    res.status(500).json({ success: false, message: 'Failed to fetch appointments' })
  }
})

app.patch('/api/appointments/:id', authMiddleware, async (req, res) => {
  const allowedStatuses = ['requested', 'confirmed', 'completed', 'cancelled']
  const { status } = req.body

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid appointment status' })
  }

  try {
    const result = await pool.query(
      `UPDATE appointments SET status = $1, updated_at = NOW() WHERE id = $2
       RETURNING id, reference_code, status, updated_at`,
      [status, req.params.id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Appointment not found' })
    }

    res.json({ success: true, data: result.rows[0] })
  } catch (error) {
    console.error('Appointment update error:', error)
    res.status(500).json({ success: false, message: 'Failed to update appointment' })
  }
})

// --------------------------------------------------
// Dashboard summary
// --------------------------------------------------

app.get('/api/dashboard/summary', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*) FILTER (
          WHERE status = 'new'
        ) AS new_leads,

        COUNT(*) FILTER (
          WHERE status = 'contacted'
        ) AS contacted_leads,

        COUNT(*) FILTER (
          WHERE status = 'interested'
        ) AS interested_leads,

        COUNT(*) FILTER (
          WHERE status = 'client'
        ) AS clients,

        COUNT(*) AS total_leads
      FROM leads
    `)

    res.json({
      success: true,
      data: result.rows[0],
    })
  } catch (error) {
    console.error('Dashboard error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to load dashboard summary',
    })
  }
})

// --------------------------------------------------
// Leads
// --------------------------------------------------

app.get('/api/leads', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        l.id,
        l.name,
        l.company_name,
        l.phone,
        l.email,
        l.source,
        l.status,
        l.priority,
        l.score,
        l.notes,
        l.contacted_at,
        l.created_at,
        b.business_name,
        b.category,
        b.address,
        b.latitude,
        b.longitude
      FROM leads l
      LEFT JOIN businesses b
        ON l.business_id = b.id
      ORDER BY l.created_at DESC
    `)

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    })
  } catch (error) {
    console.error('Leads error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch leads',
    })
  }
})

// --------------------------------------------------
// 404
// --------------------------------------------------

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  })
})

// --------------------------------------------------
// Error handler
// --------------------------------------------------

app.use((error, req, res, next) => {
  console.error('Unhandled error:', error)

  res.status(error.status || 500).json({
    success: false,
    message:
      error.message || 'Internal server error',
  })
})

// --------------------------------------------------
// Start server
// --------------------------------------------------

async function startServer() {
  try {
    await pool.query('SELECT 1')

    app.listen(PORT, () => {
      console.log('')
      console.log('======================================')
      console.log('       KP PRUTHVI BACKEND')
      console.log('======================================')
      console.log(
        `Server:   http://localhost:${PORT}`
      )
      console.log(`Frontend: ${FRONTEND_URL}`)
      console.log('Database: Connected')
      console.log('======================================')
      console.log('')
    })
  } catch (error) {
    console.error('')
    console.error(
      'Failed to connect to PostgreSQL.'
    )
    console.error('Code:', error.code)
    console.error('Message:', error.message)
    console.error('')

    process.exit(1)
  }
}

startServer()