import { useState, useEffect } from 'react'
import {
  Settings as SettingsIcon,
  Save,
  CheckCircle2,
  Loader2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react'
import { getSettings, updateSettings } from '../../services/api'

function Settings() {
  const [form, setForm] = useState({
    business_name: 'KP Tax Consultants',
    consultant_name: 'KP Pruthvi',
    designation: 'Tax Consultant',
    experience: '5 years',
    phone: '+91 70194 84928',
    whatsapp: '917019484928',
    email: 'pruthvigowda003@gmail.com',
    address: '144, 9th Cross, 2nd Phase, Sainagar, MS Palya, Vidyaranyapura Post, Bengaluru, Karnataka 560097',
    hours: '6 days a week • 9:00 AM–8:00 PM',
    bio: 'Tax Consultant with 5 years of working experience, providing direct tax (Income Tax), indirect tax (GST and Excise Duty), compliance, accounting and company registration support.',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const res = await getSettings()
        if (res?.success && res.data) {
          setForm((prev) => ({ ...prev, ...res.data }))
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load settings.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      setError('')
      const res = await updateSettings(form)
      if (res?.success) {
        setSavedSuccess(true)
        setTimeout(() => setSavedSuccess(false), 3000)
      } else {
        setError(res?.message || 'Failed to save settings.')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update settings.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#122438]" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#a77d2f]">
          System Configuration
        </span>
        <h1 className="font-display mt-1 text-2xl sm:text-3xl font-bold text-[#122438]">
          Practice Settings & Profile
        </h1>
        <p className="text-xs sm:text-sm text-[#687385]">
          Manage contact details, business hours, and credentials shown on the public website and confirmation emails.
        </p>
      </div>

      {savedSuccess && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800">
          <CheckCircle2 size={18} className="text-emerald-600" />
          Settings updated successfully and persisted to the database.
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Practice Identity Card */}
        <div className="rounded-3xl border border-[#dedbd3] bg-white p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 border-b border-[#f0ede6] pb-4">
            <ShieldCheck size={20} className="text-[#a77d2f]" />
            <h2 className="text-base font-bold text-[#122438]">Practice & Consultant Identity</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase text-[#334457]">
                Practice Name
              </label>
              <input
                type="text"
                name="business_name"
                value={form.business_name}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-3 text-sm text-[#182536] outline-none focus:border-[#b89a58]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#334457]">
                Consultant Name
              </label>
              <input
                type="text"
                name="consultant_name"
                value={form.consultant_name}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-3 text-sm text-[#182536] outline-none focus:border-[#b89a58]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#334457]">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-3 text-sm text-[#182536] outline-none focus:border-[#b89a58]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#334457]">
                Experience Claim
              </label>
              <input
                type="text"
                name="experience"
                value={form.experience}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-3 text-sm text-[#182536] outline-none focus:border-[#b89a58]"
              />
              <p className="mt-1 text-[11px] text-amber-700">
                Marked as subject to client confirmation before final deployment.
              </p>
            </div>
          </div>
        </div>

        {/* Contact & Location Card */}
        <div className="rounded-3xl border border-[#dedbd3] bg-white p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 border-b border-[#f0ede6] pb-4">
            <Phone size={20} className="text-[#a77d2f]" />
            <h2 className="text-base font-bold text-[#122438]">Contact Numbers & Office Address</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase text-[#334457]">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-3 text-sm text-[#182536] outline-none focus:border-[#b89a58]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#334457]">
                WhatsApp Number (without +)
              </label>
              <input
                type="text"
                name="whatsapp"
                value={form.whatsapp}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-3 text-sm text-[#182536] outline-none focus:border-[#b89a58]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase text-[#334457]">
                Consultant Notification Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-3 text-sm text-[#182536] outline-none focus:border-[#b89a58]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase text-[#334457]">
                Office Address (Source of truth)
              </label>
              <textarea
                name="address"
                rows={3}
                value={form.address}
                onChange={handleChange}
                className="mt-1.5 w-full resize-none rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-3 text-sm text-[#182536] outline-none focus:border-[#b89a58]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#334457]">
                Working Hours
              </label>
              <input
                type="text"
                name="hours"
                value={form.hours}
                onChange={handleChange}
                className="mt-1.5 w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-3 text-sm text-[#182536] outline-none focus:border-[#b89a58]"
              />
            </div>
          </div>
        </div>

        {/* Domain & Google Workspace Readiness Notice */}
        <div className="rounded-3xl border border-[#dfe4df] bg-[#f7f9f7] p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2.5">
            <Globe size={20} className="text-[#2c5a4d]" />
            <h3 className="text-sm font-bold text-[#122438]">Custom Domain & Google Workspace Integration</h3>
          </div>
          <p className="text-xs leading-relaxed text-[#536071]">
            This project is prepared for domain pointing and Google Workspace email routing. Once DNS records (MX, SPF, DKIM) are added to your domain registrar, you can configure Google Workspace SMTP in <code>backend/.env</code> (<code>SMTP_USER</code> and <code>SMTP_PASS</code>) to automatically dispatch confirmation emails from your domain address.
          </p>
        </div>

        {/* Submit Action */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#122438] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#20374e] disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save size={16} /> Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Settings
