import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
})

export const getHealth = async () => (await api.get('/health')).data
export const getProfile = async () => (await api.get('/profile')).data
export const getServices = async () => (await api.get('/services')).data
export const submitEnquiry = async (data) => (await api.post('/enquiries', data)).data
export const requestAppointment = async (data) => (await api.post('/appointments', data)).data
export const getAppointments = async () => {
  const token = localStorage.getItem('kp_pruthvi_token')
  return (await api.get('/appointments', { headers: { Authorization: `Bearer ${token}` } })).data
}
export const updateAppointmentStatus = async (id, status) => {
  const token = localStorage.getItem('kp_pruthvi_token')
  return (await api.patch(`/appointments/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } })).data
}
export const getDashboardSummary = async () => (await api.get('/dashboard/summary')).data
export const getLeads = async (params = {}) => (await api.get('/leads', { params })).data

export default api
