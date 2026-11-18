import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { LockKeyhole, Mail, Loader2, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.email.trim() || !formData.password) {
      setError('Please provide your administrative email and password.')
      return
    }

    try {
      setLoading(true)
      const res = await login(formData)
      if (res?.success) {
        const from = location.state?.from?.pathname || '/admin/dashboard'
        navigate(from, { replace: true })
      } else {
        setError(res?.message || 'Login failed. Please check your credentials.')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to sign in. Please verify your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f3f1ea] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand header */}
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#122438] text-lg font-bold text-[#e3c474] shadow-md transition hover:scale-105">
            KP
          </Link>
          <h1 className="font-display mt-4 text-3xl font-bold text-[#122438]">
            Admin Portal
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#687385]">
            KP Tax Consultants — Internal Practice Management
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-[#dedbd3] bg-white p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {location.search.includes('expired') && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs font-medium text-amber-800">
                Your previous session expired. Please sign in again.
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-semibold text-red-700">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#334457]">
                Admin Email
              </label>
              <div className="relative mt-2">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a94a2]" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="username"
                  placeholder="admin@kppruthvi.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] py-3 pl-11 pr-4 text-sm text-[#182536] outline-none transition focus:border-[#b89a58] focus:bg-white focus:ring-4 focus:ring-[#b89a58]/10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-[#334457]">
                Password
              </label>
              <div className="relative mt-2">
                <LockKeyhole size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a94a2]" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="Enter administrator password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] py-3 pl-11 pr-11 text-sm text-[#182536] outline-none transition focus:border-[#b89a58] focus:bg-white focus:ring-4 focus:ring-[#b89a58]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8a94a2] hover:text-[#122438]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#122438] py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#20374e] disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Verifying credentials...
                </>
              ) : (
                'Sign In to CRM'
              )}
            </button>
          </form>

          <div className="mt-8 border-t border-[#f0ede6] pt-5 text-center">
            <p className="flex items-center justify-center gap-1.5 text-xs text-[#8a94a2]">
              <ShieldCheck size={14} className="text-[#2c5a4d]" />
              Authorized administrator access only
            </p>
            <Link to="/" className="mt-3 inline-block text-xs font-semibold text-[#a77d2f] hover:underline">
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
