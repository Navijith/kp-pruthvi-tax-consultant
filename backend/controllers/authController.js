const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { loginSchema } = require('../utils/validators')
const { setAuthCookie, clearAuthCookie } = require('../utils/cookieHelper')
const env = require('../config/env')

const login = async (req, res, next) => {
  try {
    const validation = loginSchema.safeParse(req.body)

    if (!validation.success) {
      const errorMsg = validation.error.issues?.[0]?.message || validation.error.errors?.[0]?.message || 'Valid email and password are required'
      return res.status(400).json({
        success: false,
        message: errorMsg,
      })
    }

    const { email, password } = validation.data
    const user = await User.findByEmail(email)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: 'This account has been deactivated. Please contact the administrator.',
      })
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash)
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
        email: user.email,
        name: user.full_name,
      },
      env.JWT_SECRET,
      { expiresIn: '8h' }
    )

    // Set secure HttpOnly cookie
    setAuthCookie(res, token)

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
    next(error)
  }
}

const logout = async (req, res) => {
  clearAuthCookie(res)
  return res.json({
    success: true,
    message: 'Logged out successfully',
  })
}

const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User account not found',
      })
    }

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: 'This account is no longer active',
      })
    }

    return res.json({
      success: true,
      data: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  login,
  logout,
  me,
}
