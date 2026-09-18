import api from './api'

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials)
  return response.data
}

export const getCurrentUser = async () => {
  const token = localStorage.getItem('kp_pruthvi_token')

  const response = await api.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

export const logout = () => {
  localStorage.removeItem('kp_pruthvi_token')
  localStorage.removeItem('kp_pruthvi_user')
}