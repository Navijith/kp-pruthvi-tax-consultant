import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

// Request interceptor to attach bearer token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('kp_pruthvi_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor to handle session expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
      localStorage.removeItem('kp_pruthvi_token')
      localStorage.removeItem('kp_pruthvi_user')
      // redirect to login if session expired
      window.location.href = '/admin/login?expired=1'
    }
    return Promise.reject(error)
  }
)

// Public endpoints
export const getHealth = async () => (await api.get('/health')).data
export const getProfile = async () => (await api.get('/profile')).data
export const getServices = async () => (await api.get('/services')).data
export const getServiceBySlug = async (slug) => (await api.get(`/services/${slug}`)).data
export const submitEnquiry = async (data) => (await api.post('/enquiries', data)).data
export const requestAppointment = async (data) => (await api.post('/appointments', data)).data

// Protected Administration endpoints
export const getDashboardSummary = async () => (await api.get('/dashboard/summary')).data

// Appointments
export const getAppointments = async (params = {}) => (await api.get('/appointments', { params })).data
export const updateAppointmentStatus = async (id, status) =>
  (await api.patch(`/appointments/${id}`, { status })).data

// Leads
export const getLeads = async (params = {}) => (await api.get('/leads', { params })).data
export const getLeadById = async (id) => (await api.get(`/leads/${id}`)).data
export const updateLead = async (id, data) => (await api.patch(`/leads/${id}`, data)).data
export const addLeadNote = async (id, data) => (await api.post(`/leads/${id}/notes`, data)).data

// Follow-ups
export const getFollowUps = async (params = {}) => (await api.get('/follow-ups', { params })).data
export const createFollowUp = async (data) => (await api.post('/follow-ups', data)).data
export const updateFollowUp = async (id, data) => (await api.patch(`/follow-ups/${id}`, data)).data

// Notifications
export const getNotifications = async () => (await api.get('/notifications')).data
export const markNotificationRead = async (id) => (await api.patch(`/notifications/${id}/read`)).data
export const markAllNotificationsRead = async () => (await api.patch('/notifications/read-all')).data

// Settings
export const getSettings = async () => (await api.get('/settings')).data
export const updateSettings = async (data) => (await api.patch('/settings', data)).data

export default api
