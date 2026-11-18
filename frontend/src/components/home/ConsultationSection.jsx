import { useState, useEffect } from 'react'
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MessageCircle,
  Monitor,
  Phone,
  Video,
  Loader2,
  ShieldCheck,
} from 'lucide-react'
import { services, site, buildWhatsAppLink, buildMailtoLink } from '../../config/site'

const onlinePlatforms = [
  { id: 'Google Meet', label: 'Google Meet', icon: Video },
  { id: 'Zoom', label: 'Zoom Video', icon: Monitor },
  { id: 'WhatsApp Call', label: 'WhatsApp Call', icon: MessageCircle },
  { id: 'Phone Call', label: 'Direct Phone', icon: Phone },
]

function ConsultationSection({ preselectedService, onResetService }) {
  const [preferredPlatform, setPreferredPlatform] = useState('Google Meet')
  const [selectedService, setSelectedService] = useState('')

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
      service: selectedService || 'General Business Consultation',
      platform: preferredPlatform,
      details: details.trim(),
    }

    // Generate unique reference code
    const uniqueRef = `KP-${Date.now().toString(36).slice(-4).toUpperCase()}${Math.random().toString(36).substring(2, 5).toUpperCase()}`
    setReferenceCode(uniqueRef)

    // Build direct WhatsApp & Email links
    const waUrl = buildWhatsAppLink(payload)
    const mailtoUrl = buildMailtoLink(payload)

    setDirectWhatsappUrl(waUrl)
    setDirectMailtoUrl(mailtoUrl)

    // Open WhatsApp in new tab
    try {
      window.open(waUrl, '_blank')
    } catch {
      // Handled by UI action buttons
    }

    setSubmitted(true)
    setLoading(false)
  }

  const handleReset = () => {
    setName('')
    setPhone('')
    setEmail('')
    setDetails('')
    setSelectedService('')
    if (onResetService) onResetService()
    setSubmitted(false)
    setError('')
  }

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#fbfaf6]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a77d2f]">
            Direct Consultation
          </p>
          <h2 className="font-display mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#122438]">
            Request a 15-Minute Consultation.
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#536071]">
            Connect directly with KP Pruthvi. Submitting this form prepares your details and dispatches them directly via WhatsApp or Email for immediate review.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
          {/* Left Column: Interactive Form */}
          <div
            id="contact-form"
            className="rounded-3xl border border-[#dedbd3] bg-white p-6 sm:p-9 shadow-sm"
          >
            {submitted ? (
              <div className="flex min-h-[440px] flex-col items-center justify-center text-center py-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8efeb] text-[#2c5a4d]">
                  <CheckCircle2 size={36} />
                </div>

                <h3 className="font-display mt-5 text-2xl sm:text-3xl font-bold text-[#122438]">
                  Consultation Request Dispatched!
                </h3>

                <p className="mt-3 max-w-md text-xs sm:text-sm leading-relaxed text-[#687385]">
                  Your request details have been prepared for direct dispatch to KP Pruthvi. If WhatsApp did not open automatically, please click below.
                </p>

                {referenceCode && (
                  <div className="mt-5 rounded-2xl border border-[#b89a58]/40 bg-[#fffdf8] px-5 py-3 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#a77d2f]">
                      Reference Code
                    </p>
                    <p className="mt-0.5 font-mono text-lg font-bold tracking-wider text-[#122438]">
                      {referenceCode}
                    </p>
                  </div>
                )}

                <div className="mt-6 flex flex-col sm:flex-row flex-wrap justify-center gap-3 w-full max-w-md">
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
                <div className="border-b border-[#f0ede6] pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#a77d2f]">
                    Direct Request
                  </span>
                  <h3 className="font-display mt-1 text-2xl font-bold text-[#122438]">
                    Enter Your Details
                  </h3>
                </div>

                {/* Name & Phone */}
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
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {onlinePlatforms.map((p) => {
                      const Icon = p.icon
                      const isSelected = preferredPlatform === p.id
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPreferredPlatform(p.id)}
                          className={`flex items-center justify-center gap-2 rounded-xl border p-3 text-center transition cursor-pointer text-xs font-semibold ${
                            isSelected
                              ? 'border-[#a77d2f] bg-[#fffdf8] text-[#122438] ring-2 ring-[#a77d2f]/20 font-bold'
                              : 'border-[#dedbd3] bg-[#fbfaf6] text-[#687385] hover:border-[#cfc8ba]'
                          }`}
                        >
                          <Icon size={16} className={isSelected ? 'text-[#a77d2f]' : 'text-[#687385]'} />
                          <span>{p.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Requirement Details */}
                <div>
                  <label className="block text-xs font-bold uppercase text-[#334457]">
                    Requirement Details <span className="font-normal text-[#8a94a2]">(Optional)</span>
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Briefly state your bookkeeping, statutory compliance, or tax query..."
                    className="mt-1.5 w-full resize-none rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-3.5 text-sm text-[#182536] outline-none focus:border-[#a77d2f] focus:bg-white focus:ring-4 focus:ring-[#a77d2f]/10"
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-semibold text-red-700">
                    {error}
                  </div>
                )}

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
                  Submitting dispatches your request directly to KP Pruthvi via WhatsApp and Email for swift confirmation.
                </p>
              </form>
            )}
          </div>

          {/* Right Column: Practice Details & Direct Channels (No "Professional Profiles") */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#dedbd3] bg-[#122438] p-7 sm:p-8 text-white shadow-md">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d9b96d]">
                Practice Model
              </span>
              <h3 className="font-display mt-2 text-2xl font-bold">100% Online & Remote</h3>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#c4ced8]">
                We consult remotely via Google Meet, Zoom, WhatsApp, or direct phone call. All records and filings are managed digitally and securely.
              </p>

              <div className="mt-6 border-t border-white/10 pt-5 space-y-3">
                <div className="flex items-start gap-3">
                  <Clock3 size={18} className="mt-0.5 shrink-0 text-[#d9b96d]" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#9eabb8]">
                      Consultation Hours
                    </p>
                    <p className="mt-0.5 text-xs sm:text-sm font-semibold text-white">{site.hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={18} className="mt-0.5 shrink-0 text-[#d9b96d]" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#9eabb8]">
                      Direct Telephone
                    </p>
                    <a href={site.phoneHref} className="mt-0.5 block text-xs sm:text-sm font-semibold text-white hover:underline">
                      {site.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 shrink-0 text-[#d9b96d]" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#9eabb8]">
                      Direct Email
                    </p>
                    <a href={`mailto:${site.email}`} className="mt-0.5 block text-xs sm:text-sm text-[#c4ced8] hover:underline break-all">
                      {site.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Factual Consultant Standards Card */}
            <div className="rounded-3xl border border-[#dedbd3] bg-white p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef1ef] text-[#2c5a4d]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#122438]">Direct Access Commitment</h4>
                  <p className="text-xs text-[#687385]">No intermediaries or unreviewed drafts</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-[#536071]">
                Every bookkeeping review, tax calculation, and statutory filing is evaluated directly by KP Pruthvi with professional accountability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConsultationSection
