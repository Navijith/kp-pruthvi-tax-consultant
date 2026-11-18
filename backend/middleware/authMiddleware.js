const jwt = require('jsonwebtoken')
const { getAuthToken } = require('../utils/cookieHelper')
const env = require('../config/env')

const authMiddleware = (req, res, next) => {
  try {
    const token = getAuthToken(req)

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please sign in.',
      })
    }

    const decoded = jwt.verify(token, env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired session. Please sign in again.',
    })
  }
}

module.exports = authMiddleware
