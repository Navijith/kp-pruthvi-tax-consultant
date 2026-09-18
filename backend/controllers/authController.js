const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { z } = require('zod')

const pool = require('../config/db')

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const login = async (req, res) => {
  try {
    const validation = loginSchema.safeParse(req.body)

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: 'Valid email and password are required',
      })
    }

    const { email, password } = validation.data

    const result = await pool.query(
      `
      SELECT
        id,
        full_name,
        email,
        password_hash,
        role,
        is_active
      FROM users
      WHERE email = $1
      LIMIT 1
      `,
      [email.toLowerCase().trim()]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const user = result.rows[0]

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: 'This account is inactive',
      })
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password_hash
    )

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '8h',
      }
    )

    return res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
        },
      },
    })
  } catch (error) {
    console.error('Login error:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to login',
    })
  }
}

const me = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        full_name,
        email,
        role,
        is_active,
        created_at
      FROM users
      WHERE id = $1
      LIMIT 1
      `,
      [req.user.userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    return res.json({
      success: true,
      data: result.rows[0],
    })
  } catch (error) {
    console.error('Me error:', error)

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch user',
    })
  }
}

module.exports = {
  login,
  me,
}