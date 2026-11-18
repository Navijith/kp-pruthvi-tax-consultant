import { createContext, useContext, useState, useEffect } from 'react'
import { getStoredUser, getCurrentUser, login as authLogin, logout as authLogout } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem('kp_pruthvi_token')
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const response = await getCurrentUser()
        if (response?.success && response?.data) {
          setUser(response.data)
          localStorage.setItem('kp_pruthvi_user', JSON.stringify(response.data))
        } else {
          setUser(null)
          localStorage.removeItem('kp_pruthvi_token')
          localStorage.removeItem('kp_pruthvi_user')
        }
      } catch (err) {
        setUser(null)
        localStorage.removeItem('kp_pruthvi_token')
        localStorage.removeItem('kp_pruthvi_user')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials) => {
    const response = await authLogin(credentials)
    if (response?.success && response?.data?.user) {
      setUser(response.data.user)
    }
    return response
  }

  const logout = async () => {
    await authLogout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: Boolean(user) }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
