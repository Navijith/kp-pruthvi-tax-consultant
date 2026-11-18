import api from './api'

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  if (response.data?.success && response.data?.data?.token) {
    localStorage.setItem('kp_pruthvi_token', response.data.data.token)
    localStorage.setItem('kp_pruthvi_user', JSON.stringify(response.data.data.user))
  }
  return response.data
}

export const logout = async () => {
  try {
    await api.post('/auth/logout')
  } catch (err) {
    // Continue clearing local state even if network call failed
  } finally {
    localStorage.removeItem('kp_pruthvi_token')
    localStorage.removeItem('kp_pruthvi_user')
  }
}

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me')
  return response.data
}

export const getStoredUser = () => {
  const user = localStorage.getItem('kp_pruthvi_user')
  try {
    return user ? JSON.parse(user) : null
  } catch (e) {
    return null
  }
}

export const isAuthenticated = () => {
  return Boolean(localStorage.getItem('kp_pruthvi_token'))
}
