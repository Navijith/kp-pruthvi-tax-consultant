import { motion } from 'framer-motion'
import { Calculator, ReceiptText, Landmark, BookOpenCheck, Building2, CheckCircle2, MessageSquare } from 'lucide-react'
import { services } from '../../config/site'
import { centerElement } from '../../utils/scrollHelper'

const serviceIcons = {
  'bookkeeping-accounting': BookOpenCheck,
  'direct-tax': Calculator,
  'statutory-payroll': Landmark,
  'indirect-tax': ReceiptText,
  'company-registration': Building2,
}

function ServicesSection({ onSelectService }) {
  const handleCardClick = (serviceId) => {
    centerElement(serviceId)
  }

  const handleEnquire = (serviceTitle) => {
    if (onSelectService) {
      onSelectService(serviceTitle)
    }
    const contactEl = document.getElementById('contact')
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTimeout(() => {
        centerElement('contact-form')
      }, 400)
    }
  }

  // 3 Primary Services, 2 Supporting Services in the exact standardized order
  const primaryServices = services.filter((s) => s.isPrimary)
  const secondaryServices = services.filter((s) => !s.isPrimary)

  return (
    <section id="services" className="bg-[#fbfaf6] py-20 lg:py-28 border-b border-[#e5e2da]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Unified Standard Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a77d2f]">
            Complete Business Advisory & Services
          </p>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#122438]">
            Your Business Finances. Organised and Compliant.
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#536071]">
            From accurate bookkeeping and payroll assistance to income tax and statutory compliance,
            we help businesses stay organised, meet their responsibilities and focus on their operations.
          </p>
        </div>

        {/* 1. Core Primary Practice Areas (3 Cards) */}
        <div>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <span className="rounded-full bg-[#2c5a4d]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#2c5a4d]">
                Core Practice Areas
              </span>
              <h3 className="font-display mt-2 text-2xl font-bold text-[#122438]">
                Primary Business Services
              </h3>
            </div>
            <span className="text-xs text-[#8a94a2] hidden sm:inline">
              Ongoing & Periodic Support
            </span>
          </div>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
            {primaryServices.map((service, index) => {
              const Icon = serviceIcons[service.id] || Calculator
              return (
                <motion.article
                  key={service.id}
                  id={service.id}
                  onClick={() => handleCardClick(service.id)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex flex-col h-full rounded-3xl border border-[#b89a58]/40 bg-white p-7 sm:p-8 shadow-sm transition hover:shadow-xl hover:border-[#a77d2f] cursor-pointer"
                >
                  {/* Card Content (flex-1 ensures all footers align evenly) */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f2e8cf] text-[#a77d2f]">
                        <Icon size={22} />
                      </div>
                      <span className="rounded-full bg-[#2c5a4d] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        Primary Area
                      </span>
                    </div>

                    <h4 className="mt-5 text-xl font-bold text-[#122438]">
                      {service.title}
                    </h4>

                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#687385]">
                      {service.description}
                    </p>

                    <div className="mt-5 border-t border-[#f0ede6] pt-4">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#a77d2f]">
                        Included Scope:
                      </p>
                      <ul className="mt-3 space-y-2">
                        {service.points.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-xs text-[#3b4a5a]">
                            <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#2c5a4d]" />
                            <span className="leading-snug">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Evenly Aligned Footer Button */}
                  <div className="mt-7 pt-5 border-t border-[#f0ede6] w-full">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEnquire(service.title)
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#122438] py-3.5 px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#20374e] cursor-pointer"
                    >
                      <MessageSquare size={14} />
                      <span>Enquire for this Service</span>
                    </button>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>

        {/* 2. Supporting Specialized Advisory (2 Cards) */}
        <div>
          <div className="mb-8">
            <span className="rounded-full bg-[#a77d2f]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#a77d2f]">
              Statutory & Entity Advisory
            </span>
            <h3 className="font-display mt-2 text-2xl font-bold text-[#122438]">
              Indirect Tax & Registration Services
            </h3>
          </div>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 items-stretch">
            {secondaryServices.map((service, index) => {
              const Icon = serviceIcons[service.id] || Building2
              return (
                <motion.article
                  key={service.id}
                  id={service.id}
                  onClick={() => handleCardClick(service.id)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex flex-col h-full rounded-3xl border border-[#e4e2da] bg-white p-7 sm:p-8 shadow-sm transition hover:shadow-xl hover:border-[#a77d2f]/50 cursor-pointer"
                >
                  {/* Card Content (flex-1 ensures all footers align evenly) */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f2e8cf] text-[#a77d2f]">
                        <Icon size={22} />
                      </div>
                      <span className="rounded-full bg-[#eef1ef] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#2c5a4d]">
                        Advisory
                      </span>
                    </div>

                    <h4 className="mt-5 text-xl font-bold text-[#122438]">
                      {service.title}
                    </h4>

                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#687385]">
                      {service.description}
                    </p>

                    <div className="mt-5 border-t border-[#f0ede6] pt-4">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#a77d2f]">
                        Included Scope:
                      </p>
                      <ul className="mt-3 space-y-2">
                        {service.points.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-xs text-[#3b4a5a]">
                            <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#2c5a4d]" />
                            <span className="leading-snug">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Evenly Aligned Footer Button */}
                  <div className="mt-7 pt-5 border-t border-[#f0ede6] w-full">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEnquire(service.title)
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#122438] py-3.5 px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#20374e] cursor-pointer"
                    >
                      <MessageSquare size={14} />
                      <span>Enquire for this Service</span>
                    </button>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
