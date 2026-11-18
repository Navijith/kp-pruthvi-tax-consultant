import { Link } from 'react-router-dom'
import { ArrowRight, HelpCircle } from 'lucide-react'
import ServiceSection from '../../components/services/ServiceSection'
import SEO from '../../components/common/SEO'
import SectionTitle from '../../components/common/SectionTitle'

function Services() {
  return (
    <div className="page-shell">
      <SEO
        title="Services & Support | KP Tax Consultants"
        description="Comprehensive business accounting, taxation and compliance services: Bookkeeping & Accounting, Direct Tax, Statutory Compliance & Payroll, GST and Company Registration."
      />

      {/* Header Banner */}
      <section className="bg-[#122438] text-white">
        <div className="mx-auto max-w-7xl px-5 py-18 lg:px-8 lg:py-24">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#d9b96d]">
            Business Services
          </span>
          <h1 className="font-display mt-3 max-w-4xl text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
            Bookkeeping, taxation & recurring compliance services.
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[#b9c4cf]">
            Explore our specialized practice areas below. Whether you require continuous monthly bookkeeping, payroll and statutory filings, or direct tax and GST compliance, we deliver practical, structured assistance.
          </p>
        </div>
      </section>

      {/* All Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 space-y-12">
          <SectionTitle
            eyebrow="Structured Practice Menu"
            title="Practical, dependable solutions for businesses and professionals."
            description="Clear scope and direct communication. Choose a service category to review detailed coverage or request a 15-minute consultation."
          />

          <ServiceSection />
        </div>
      </section>

      {/* "Not sure where to start?" Banner */}
      <section className="bg-[#eef1ef] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f2e8cf] text-[#a77d2f]">
            <HelpCircle size={26} />
          </div>
          <span className="mt-5 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#a77d2f]">
            Unsure Of Your Exact Requirement?
          </span>
          <h2 className="font-display mt-2 text-2xl sm:text-3xl font-normal text-[#122438]">
            Tell us your situation. We will clarify the right filings needed.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm leading-relaxed text-[#687385]">
            You do not need to memorize tax schedules or statutory sections before getting in touch.
            Share your business model, and KP Pruthvi will recommend the appropriate bookkeeping and compliance setup.
          </p>
          <div className="mt-7 flex justify-center gap-3">
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 rounded-xl bg-[#122438] px-6 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#20374e]"
            >
              Book a Free Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
