import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MessageCircle,
  Monitor,
  Phone,
  Mail,
  Video,
  Loader2,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { services, site, buildWhatsAppLink, buildMailtoLink } from '../../config/site'
import SEO from '../../components/common/SEO'

const onlinePlatforms = [
  { id: 'Google Meet', label: 'Google Meet', icon: Video, desc: 'Video link shared via WhatsApp/Email' },
  { id: 'Zoom', label: 'Zoom Video', icon: Monitor, desc: 'Online video consultation' },
  { id: 'WhatsApp Call', label: 'WhatsApp Voice/Video', icon: MessageCircle, desc: 'Quick voice or video call' },
  { id: 'Phone Call', label: 'Direct Phone Call', icon: Phone, desc: 'Standard cellular phone call' },
]

function Appointment() {
  const [searchParams] = useSearchParams()
  const preselectedService = searchParams.get('service') || ''

  const [preferredPlatform, setPreferredPlatform] = useState('Google Meet')
  const [selectedService, setSelectedService] = useState(preselectedService)

  // Form inputs
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [details, setDetails] = useState('')

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [referenceCode, setReferenceCode] = useState('')
  const [directWhatsappUrl, setDirectWhatsappUrl] = useState('')
  const [directMailtoUrl, setDirectMailtoUrl] = useState('')

  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService)
    }
  }, [preselectedService])

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    // Client-side validation
    if (!name.trim() || !phone.trim()) {
      setError('Please provide your full name and contact phone number.')
      setLoading(false)
      return
    }

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      service: selectedService || 'Bookkeeping & Tax Consultation',
      platform: preferredPlatform,
      details: details.trim(),
    }

    // Generate unique reference code
    const uniqueRef = `KP-${Date.now().toString(36).slice(-4).toUpperCase()}${Math.random().toString(36).substring(2, 5).toUpperCase()}`
    setReferenceCode(uniqueRef)

    // 1. Build direct WhatsApp URL & Email mailto
    const waUrl = buildWhatsAppLink(payload)
    const mailtoUrl = buildMailtoLink(payload)

    setDirectWhatsappUrl(waUrl)
    setDirectMailtoUrl(mailtoUrl)

    // 2. Open WhatsApp in new tab with prefilled message
    try {
      window.open(waUrl, '_blank')
    } catch {
      // Handled by confirmation UI action buttons
    }

    setSubmitted(true)
    setLoading(false)
  }

  const handleReset = () => {
    setName('')
    setPhone('')
    setEmail('')
    setDetails('')
    setSubmitted(false)
    setError('')
  }

  return (
    <div className="page-shell">
      <SEO
        title="Book Online Consultation | KP Tax Consultants"
        description="Schedule a 15-minute online consultation with KP Pruthvi for business bookkeeping, payroll, taxation, and statutory compliance. Available 9:00 AM–7:00 PM."
      />

      {/* Header Banner */}
      <section className="bg-[#122438] text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d9b96d]">
            Free 15-Minute Consultation
          </p>
          <h1 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
            Schedule a consultation with KP Pruthvi.
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[#b9c4cf]">
            100% online & remote consultations across Bengaluru and India.
            Submit your details below to dispatch your request directly via WhatsApp or Email.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          {/* Left Column: Practice Overview & Operating Hours */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#a77d2f]">
                Remote Consultation
              </p>
              <h2 className="font-display mt-1 text-2xl font-bold text-[#122438]">
                How the consultation works
              </h2>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#687385]">
                We conduct structured, 15-minute preliminary reviews to assess your bookkeeping records, statutory compliance schedule, or annual tax filing requirements.
              </p>
            </div>

            {/* Operating Hours Card */}
            <div className="rounded-3xl border border-[#e4e2da] bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e8efeb] text-[#2c5a4d]">
                  <Clock3 size={22} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#122438]">Consultation Hours</h3>
                  <p className="mt-1 text-xs text-[#687385]">6 Days a Week (Mon – Sat)</p>
                  <p className="text-xs font-semibold text-[#122438]">9:00 AM – 7:00 PM</p>
                </div>
              </div>
            </div>

            {/* Direct Consultant Guidance Box */}
            <div className="rounded-3xl bg-[#122438] p-7 text-white shadow-md">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d9b96d]">
                Direct Consultant Access
              </p>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#c4ced8]">
                No junior clerks or intermediaries. You speak directly with KP Pruthvi, Tax Consultant, for practical and actionable clarity.
              </p>
              <div className="mt-5 border-t border-white/10 pt-4 text-xs text-[#aeb9c5] space-y-1">
                <p>• Timely bookkeeping setup & review</p>
                <p>• Income Tax planning & notice guidance</p>
                <p>• ESI, PF, PT & payroll processing checklist</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-[#e4e2da] bg-white p-6 sm:p-8 lg:p-10 shadow-sm"
          >
            {submitted ? (
              <div className="flex min-h-[460px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8efeb] text-[#2c5a4d]">
                  <CheckCircle2 size={36} />
                </div>

                <h2 className="font-display mt-5 text-2xl sm:text-3xl font-bold text-[#122438]">
                  Consultation Request Dispatched!
                </h2>

                <p className="mt-3 max-w-md text-xs sm:text-sm leading-relaxed text-[#687385]">
                  Your request details have been prepared for direct dispatch to KP Pruthvi. If WhatsApp did not open automatically, click the button below to message directly.
                </p>

                {referenceCode && (
                  <div className="mt-5 rounded-2xl border border-[#b89a58]/40 bg-[#fffdf8] px-5 py-3.5 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#a77d2f]">
                      Reference Code
                    </p>
                    <p className="mt-0.5 font-mono text-lg sm:text-xl font-bold tracking-wider text-[#122438]">
                      {referenceCode}
                    </p>
                  </div>
                )}

                {/* Direct Action Buttons */}
                <div className="mt-7 flex flex-col sm:flex-row flex-wrap justify-center gap-3 w-full max-w-md">
                  {directWhatsappUrl && (
                    <a
                      href={directWhatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-xs font-bold text-white shadow-sm hover:bg-[#20b858] transition"
                    >
                      <MessageCircle size={16} /> Open WhatsApp with Details
                    </a>
                  )}

                  {directMailtoUrl && (
                    <a
                      href={directMailtoUrl}
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#122438] px-5 py-3.5 text-xs font-bold text-white shadow-sm hover:bg-[#20374e] transition"
                    >
                      <Mail size={16} /> Send via Email
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-8 rounded-xl border border-[#dedbd3] px-5 py-2.5 text-xs font-semibold text-[#687385] hover:text-[#122438] hover:bg-[#fbfaf6] transition cursor-pointer"
                >
                  Submit Another Consultation Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#a77d2f]">
                    Online Consultation
                  </span>
                  <h2 className="font-display mt-1 text-2xl sm:text-3xl font-bold text-[#122438]">
                    Request 15-Minute Session
                  </h2>
                  <p className="mt-1 text-xs text-[#687385]">
                    No upfront fees. Submitting dispatches your query directly to KP Pruthvi.
                  </p>
                </div>

                {/* Full Name & Phone Number */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#334457]">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="mt-1.5 w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-3.5 text-sm text-[#182536] outline-none focus:border-[#a77d2f] focus:bg-white focus:ring-4 focus:ring-[#a77d2f]/10"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#334457]">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="mt-1.5 w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-3.5 text-sm text-[#182536] outline-none focus:border-[#a77d2f] focus:bg-white focus:ring-4 focus:ring-[#a77d2f]/10"
                    />
                  </div>
                </div>

                {/* Email (Optional) & Service Required */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#334457]">
                      Email Address <span className="font-normal text-[#8a94a2]">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="mt-1.5 w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-3.5 text-sm text-[#182536] outline-none focus:border-[#a77d2f] focus:bg-white focus:ring-4 focus:ring-[#a77d2f]/10"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-[#334457]">
                      Service Required
                    </label>
                    <select
                      name="service"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="mt-1.5 w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-3.5 text-sm text-[#182536] outline-none focus:border-[#a77d2f] focus:bg-white focus:ring-4 focus:ring-[#a77d2f]/10"
                    >
                      <option value="">Select a service category</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Preferred Online Platform */}
                <div>
                  <label className="block text-xs font-bold uppercase text-[#334457]">
                    Preferred Online Platform <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {onlinePlatforms.map((p) => {
                      const Icon = p.icon
                      const isSelected = preferredPlatform === p.id
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPreferredPlatform(p.id)}
                          className={`flex flex-col items-center justify-center rounded-xl border p-3 text-center transition cursor-pointer ${
                            isSelected
                              ? 'border-[#a77d2f] bg-[#fffdf8] text-[#122438] ring-2 ring-[#a77d2f]/20 font-bold'
                              : 'border-[#dedbd3] bg-[#fbfaf6] text-[#687385] hover:border-[#cfc8ba]'
                          }`}
                        >
                          <Icon size={18} className={isSelected ? 'text-[#a77d2f]' : 'text-[#687385]'} />
                          <span className="mt-1 text-xs">{p.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Requirement Details (Optional) */}
                <div>
                  <label className="block text-xs font-bold uppercase text-[#334457]">
                    Requirement Details <span className="font-normal text-[#8a94a2]">(Optional)</span>
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Briefly state your bookkeeping, statutory compliance, or tax requirement..."
                    className="mt-1.5 w-full resize-none rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-3.5 text-sm text-[#182536] outline-none focus:border-[#a77d2f] focus:bg-white focus:ring-4 focus:ring-[#a77d2f]/10"
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-semibold text-red-700">
                    {error}
                  </div>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#122438] py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#20374e] cursor-pointer disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Connecting with KP Pruthvi...
                    </>
                  ) : (
                    <>
                      <CalendarDays size={18} />
                      Request 15-Minute Consultation
                    </>
                  )}
                </button>

                <p className="text-[11px] leading-relaxed text-[#8a94a2] text-center">
                  Submitting will open WhatsApp and prepare an email with your filled details directly for consultant KP Pruthvi.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Appointment
