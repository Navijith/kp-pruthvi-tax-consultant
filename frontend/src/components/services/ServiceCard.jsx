import { CalendarDays, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { centerElement } from '../../utils/scrollHelper'

function ServiceCard({ service, icon: Icon, index }) {
  const handleCardClick = (e) => {
    if (!e.target.closest('a') && !e.target.closest('button')) {
      centerElement(e.currentTarget)
    }
  }

  return (
    <article
      id={service.id}
      onClick={handleCardClick}
      className={`flex flex-col justify-between rounded-3xl border bg-white p-7 sm:p-8 shadow-sm transition hover:shadow-xl cursor-pointer ${
        service.isPrimary
          ? 'border-[#b89a58]/50 ring-1 ring-[#b89a58]/20 hover:border-[#a77d2f]'
          : 'border-[#e4e2da] hover:border-[#a77d2f]/50'
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f2e8cf] text-[#a77d2f]">
            {Icon && <Icon size={24} />}
          </div>
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
              service.isPrimary
                ? 'bg-[#2c5a4d] text-white'
                : 'bg-[#eef1ef] text-[#2c5a4d]'
            }`}
          >
            {service.isPrimary ? 'Primary Area' : `Service 0${index + 1}`}
          </span>
        </div>

        <h3 className="mt-6 text-xl sm:text-2xl font-bold text-[#122438]">
          {service.title || service.name}
        </h3>

        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#687385]">
          {service.description}
        </p>

        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[#a77d2f]">
            Included Services & Scope
          </p>
          <ul className="mt-3.5 space-y-2.5">
            {(service.points || []).map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3b4a5a]">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#2c5a4d]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Separate Enquiry and Appointment CTAs */}
      <div className="mt-8 border-t border-[#f0ede6] pt-5 flex flex-col sm:flex-row items-center gap-2.5">
        <Link
          to={`/appointment?service=${encodeURIComponent(service.title || service.name)}`}
          className="w-full sm:flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#122438] px-4 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-[#20374e]"
        >
          <CalendarDays size={14} />
          Book Consultation
        </Link>
        <Link
          to={`/contact?service=${encodeURIComponent(service.title || service.name)}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#dedbd3] bg-[#fbfaf6] px-4 py-3 text-xs font-semibold text-[#122438] hover:bg-white hover:border-[#a77d2f] transition"
        >
          <MessageSquare size={14} />
          Enquire
        </Link>
      </div>
    </article>
  )
}

export default ServiceCard
