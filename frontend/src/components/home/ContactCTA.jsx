import { CalendarDays, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { site } from '../../config/site'

function ContactCTA() {
  return (
    <section className="bg-[#122438] py-18 text-white relative overflow-hidden">
      <div className="absolute inset-0 soft-grid opacity-20 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d9b96d]">
              Take The Next Step
            </span>
            <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl font-normal">
              Organise your accounts & statutory compliance.
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#b9c4cf]">
              Request a free 15-minute consultation to review your bookkeeping requirements, upcoming tax filings, or payroll needs with KP Pruthvi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 rounded-xl bg-[#e3c474] px-6 py-4 text-sm font-semibold text-[#122438] transition hover:bg-[#edd48e]"
            >
              <CalendarDays size={18} />
              Book a Free Consultation
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <span>Explore Services</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactCTA
