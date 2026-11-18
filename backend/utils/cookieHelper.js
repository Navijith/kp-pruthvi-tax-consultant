const COOKIE_NAME = 'kp_auth_token'

function parseCookies(req) {
  const list = {}
  const rc = req.headers.cookie
  if (!rc) return list
  rc.split(';').forEach((cookie) => {
    const parts = cookie.split('=')
    if (parts.length >= 2) {
      list[parts[0].trim()] = decodeURIComponent(parts.slice(1).join('=').trim())
    }
  })
  return list
}

function setAuthCookie(res, token) {
  const isProduction = process.env.NODE_ENV === 'production'
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 8 * 60 * 60 * 1000, // 8 hours
    path: '/',
  })
}

function clearAuthCookie(res) {
  const isProduction = process.env.NODE_ENV === 'production'
  res.cookie(COOKIE_NAME, '', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    expires: new Date(0),
    path: '/',
  })
}

function getAuthToken(req) {
  // First check Authorization header
  const authHeader = req.headers.authorization
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim()
  }
  // Then check cookies
  const cookies = parseCookies(req)
  if (cookies[COOKIE_NAME]) {
    return cookies[COOKIE_NAME]
  }
  return null
}

module.exports = {
  COOKIE_NAME,
  parseCookies,
  setAuthCookie,
  clearAuthCookie,
  getAuthToken,
}
