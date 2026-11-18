const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} not found`,
  })
}

const errorHandler = (err, req, res, next) => {
  // Sanitize logging (avoid logging sensitive credentials)
  console.error('Server Error:', err.stack || err)

  const isProduction = process.env.NODE_ENV === 'production'
  const statusCode = err.status || (res.statusCode >= 400 ? res.statusCode : 500)

  // Return clean message without revealing DB details or stack traces
  let userMessage = err.message || 'Internal server error occurred.'
  if (isProduction && statusCode === 500) {
    userMessage = 'An unexpected server error occurred. Please try again later.'
  }

  res.status(statusCode).json({
    success: false,
    message: userMessage,
    ...(isProduction ? {} : { stack: err.stack }),
  })
}

module.exports = {
  notFoundHandler,
  errorHandler,
}
