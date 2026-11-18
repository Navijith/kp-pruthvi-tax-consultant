import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Calculator, ReceiptText, Landmark, BookOpenCheck, Building2 } from 'lucide-react'
import ServiceCard from './ServiceCard'
import { services } from '../../config/site'
import { centerElement } from '../../utils/scrollHelper'

const iconMap = {
  'bookkeeping-accounting': BookOpenCheck,
  'direct-tax': Calculator,
  'statutory-payroll': Landmark,
  'indirect-tax': ReceiptText,
  'company-registration': Building2,
}

function ServiceSection() {
  const [searchParams] = useSearchParams()
  const focusId = searchParams.get('focus')

  useEffect(() => {
    if (focusId) {
      setTimeout(() => {
        centerElement(focusId)
      }, 200)
    }
  }, [focusId])

  // Split into primary service categories and additional practice areas
  const primaryServices = services.filter((s) => s.isPrimary)
  const otherServices = services.filter((s) => !s.isPrimary)

  return (
    <div className="space-y-16">
      {/* Primary Categories */}
      <div>
        <div className="mb-8">
          <span className="rounded-full bg-[#2c5a4d]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#2c5a4d]">
            Core Practice Areas
          </span>
          <h2 className="font-display mt-2 text-2xl sm:text-3xl font-bold text-[#122438]">
            Primary Business Services
          </h2>
          <p className="mt-1 text-sm text-[#687385]">
            Direct taxation, recurring bookkeeping, and employee statutory compliance receive dedicated priority.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {primaryServices.map((service, index) => {
            const Icon = iconMap[service.id] || Calculator
            return (
              <ServiceCard
                key={service.id}
                service={service}
                icon={Icon}
                index={index}
              />
            )
          })}
        </div>
      </div>

      {/* Other Supporting Services */}
      <div>
        <div className="mb-8">
          <span className="rounded-full bg-[#a77d2f]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#a77d2f]">
            Statutory & Entity Advisory
          </span>
          <h2 className="font-display mt-2 text-2xl sm:text-3xl font-bold text-[#122438]">
            Indirect Tax & Business Registration
          </h2>
          <p className="mt-1 text-sm text-[#687385]">
            Structured assistance for GST compliance and setting up new commercial business entities.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {otherServices.map((service, index) => {
            const Icon = iconMap[service.id] || Building2
            return (
              <ServiceCard
                key={service.id}
                service={service}
                icon={Icon}
                index={index + primaryServices.length}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ServiceSection
