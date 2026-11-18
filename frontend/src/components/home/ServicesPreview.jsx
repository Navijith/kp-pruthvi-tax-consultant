import { motion } from 'framer-motion'
import { ArrowRight, Calculator, ReceiptText, Landmark, BookOpenCheck, Building2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '../../config/site'
import SectionTitle from '../common/SectionTitle'
import { centerElement } from '../../utils/scrollHelper'

const serviceIcons = {
  'bookkeeping-accounting': BookOpenCheck,
  'direct-tax': Calculator,
  'statutory-payroll': Landmark,
  'indirect-tax': ReceiptText,
  'company-registration': Building2,
}

function ServicesPreview() {
  const handleCardClick = (e) => {
    // Only center if not clicking a link
    if (!e.target.closest('a')) {
      centerElement(e.currentTarget)
    }
  }

  return (
    <section id="services-preview" className="bg-[#fbfaf6] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            eyebrow="Practice Services"
            title="Professional support across bookkeeping, taxes and compliance."
            description="Our service areas are intentionally structured, so businesses and professionals can quickly identify the exact support they require."
          />
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#122438] hover:text-[#a77d2f] transition"
          >
            View all 5 service categories
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.id] || Calculator
            return (
              <motion.article
                key={service.id}
                id={`preview-${service.id}`}
                onClick={handleCardClick}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group flex flex-col justify-between rounded-2xl border border-[#e4e2da] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:border-[#a77d2f]/50 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f2e8cf] text-[#a77d2f] transition group-hover:bg-[#122438] group-hover:text-white">
                      <Icon size={22} />
                    </div>
                    {service.isPrimary && (
                      <span className="rounded-full bg-[#2c5a4d]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#2c5a4d]">
                        Primary
                      </span>
                    )}
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-[#122438]">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#687385]">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-[#f0ede6] pt-4 text-xs text-[#536071]">
                    {service.points.slice(0, 4).map((pt) => (
                      <li key={pt} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#a77d2f]" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 pt-4 border-t border-[#f0ede6] flex items-center justify-between text-xs font-bold text-[#122438]">
                  <Link
                    to={`/appointment?service=${encodeURIComponent(service.title)}`}
                    className="text-[#a77d2f] hover:underline"
                  >
                    Request Consultation
                  </Link>
                  <Link
                    to={`/services?focus=${service.id}`}
                    className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition"
                  >
                    Details <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServicesPreview
