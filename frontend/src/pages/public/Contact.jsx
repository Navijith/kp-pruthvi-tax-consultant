import { useState } from 'react'
import {
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Send,
  Loader2,
  CheckCircle2,
  ArrowRight,
  Monitor,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { services, site, buildWhatsAppLink, buildMailtoLink } from '../../config/site'
import SEO from '../../components/common/SEO'

function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [directWhatsappUrl, setDirectWhatsappUrl] = useState('')
  const [directMailtoUrl, setDirectMailtoUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const form = event.currentTarget
    const formData = new FormData(form)

    const payload = {
      name: formData.get('name')?.trim() || '',
      phone: formData.get('phone')?.trim() || '',
      email: formData.get('email')?.trim() || '',
      service: formData.get('service') || 'General Business Enquiry',
      platform: 'WhatsApp / Email',
      details: formData.get('message')?.trim() || '',
    }

    // Client-side validation
    if (!payload.name || !payload.phone || !payload.details) {
      setError('Please provide your name, contact phone number, and enquiry details.')
      setLoading(false)
      return
    }

    // 1. Build instant direct WhatsApp and Mailto links
    const waUrl = buildWhatsAppLink(payload)
    const mailtoUrl = buildMailtoLink(payload)

    setDirectWhatsappUrl(waUrl)
    setDirectMailtoUrl(mailtoUrl)

    // 2. Open WhatsApp in new tab
    try {
      window.open(waUrl, '_blank')
    } catch {
      // Handled by UI action buttons
    }

    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="page-shell">
      <SEO
        title="Contact KP Pruthvi | KP Tax Consultants"
        description="Get in touch with KP Pruthvi for business bookkeeping, payroll, taxation, and statutory compliance. Available 9:00 AM–7:00 PM for remote consultations."
      />

      {/* Header Banner */}
      <section className="bg-[#122438] text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#d9b96d]">
            Direct Enquiry
          </span>
          <h1 className="font-display mt-3 max-w-4xl text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
            Connect with KP Tax Consultants.
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[#b9c4cf]">
            100% online & remote practice. Submitting the enquiry form dispatches your message directly to KP Pruthvi via WhatsApp or Email.
          </p>
        </div>
      </section>

      {/* Form & Consultation Information */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          {/* Enquiry Form */}
          <div className="rounded-3xl border border-[#dedbd3] bg-white p-6 sm:p-8 lg:p-10 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#a77d2f]">
              Direct Message
            </span>
            <h2 className="font-display mt-1 text-2xl sm:text-3xl font-bold text-[#122438]">
              Send an enquiry
            </h2>
            <p className="mt-1 text-xs text-[#687385]">
              Details submitted here are dispatched directly to consultant KP Pruthvi.
            </p>

            {submitted ? (
              <div className="mt-7 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="mt-4 text-xl font-bold text-emerald-900">
                  Enquiry Dispatched Successfully
                </h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-emerald-700">
                  Thank you! Your enquiry has been prepared. Click below to continue directly on WhatsApp or Email.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
                  {directWhatsappUrl && (
                    <a
                      href={directWhatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-xs font-bold text-white shadow-sm hover:bg-[#20b858] transition"
                    >
                      <MessageCircle size={15} /> Open WhatsApp Message
                    </a>
                  )}
                  {directMailtoUrl && (
                    <a
                      href={directMailtoUrl}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#122438] px-5 py-3 text-xs font-bold text-white shadow-sm hover:bg-[#20374e] transition"
                    >
                      <Mail size={15} /> Send via Email Client
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="rounded-xl border border-[#dedbd3] bg-white px-5 py-3 text-xs font-semibold text-[#122438] hover:bg-[#fbfaf6] cursor-pointer"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-7 space-y-4 sm:space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#334457]">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your name"
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
                      placeholder="+91 98765 43210"
                      className="mt-1.5 w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-3.5 text-sm text-[#182536] outline-none focus:border-[#a77d2f] focus:bg-white focus:ring-4 focus:ring-[#a77d2f]/10"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#334457]">
                      Email Address <span className="font-normal text-[#8a94a2]">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      name="email"
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
                      className="mt-1.5 w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-3.5 text-sm text-[#182536] outline-none focus:border-[#a77d2f] focus:bg-white focus:ring-4 focus:ring-[#a77d2f]/10"
                    >
                      <option value="General Business Enquiry">General Business Enquiry</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#334457]">
                    Message / Requirement <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Describe your bookkeeping requirements, upcoming tax filings, or statutory compliance needs..."
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
                      <Send size={18} /> Send Direct Enquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Online Consultation & Hours */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-[#dedbd3] bg-[#122438] p-7 sm:p-8 text-white shadow-md">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d9b96d]">
                Practice Model
              </span>
              <h3 className="font-display mt-2 text-2xl font-bold">100% Online & Remote</h3>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#c4ced8]">
                We consult remotely via Google Meet, Zoom, WhatsApp, or phone. Financial records, ledgers, and document checklists are handled digitally.
              </p>

              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#9eabb8]">
                  Consultation Hours
                </p>
                <p className="mt-1 text-xs sm:text-sm font-semibold text-white">{site.hours}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/appointment"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#d9b96d] px-4 py-2.5 text-xs font-bold text-[#122438] hover:bg-[#c9a759] transition"
                >
                  Book 15-Min Consultation <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
