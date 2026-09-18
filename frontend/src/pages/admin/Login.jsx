import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LockKeyhole, Mail, Loader2 } from 'lucide-react'

import { login } from '../../services/authService'

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: 'admin@kppruthvi.com',
    password: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')

    if (!formData.email || !formData.password) {
      setError('Please enter your email and password.')
      return
    }

    try {
      setLoading(true)

      const response = await login(formData)

      if (!response?.success || !response?.data?.token) {
        throw new Error(
          response?.message || 'Login failed. Please try again.'
        )
      }

      localStorage.setItem('kp_pruthvi_token', response.data.token)
      localStorage.setItem(
        'kp_pruthvi_user',
        JSON.stringify(response.data.user)
      )

      navigate('/admin/dashboard', { replace: true })
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Unable to login. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl border border-slate-200">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <LockKeyhole size={26} />
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              Admin Login
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              KP PRUTHVI Tax Consultant
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@kppruthvi.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            Authorized administrator access only
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login