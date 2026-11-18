import { motion } from 'framer-motion'
import {
  BriefcaseBusiness,
  Clock3,
  Monitor,
  ShieldCheck,
  ArrowRight,
  Check,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { clientGroups, site } from '../../config/site'
import ProfessionalPhoto from '../../components/common/ProfessionalPhoto'
import SEO from '../../components/common/SEO'
import SectionTitle from '../../components/common/SectionTitle'

function About() {
  return (
    <div className="page-shell">
      <SEO
        title="About KP Pruthvi | KP Tax Consultants"
        description="KP Tax Consultants helps businesses maintain timely and accurate bookkeeping while ensuring compliance with applicable tax and statutory requirements."
      />

      {/* Hero Header */}
      <section className="bg-[#122438] text-white">
        <div className="mx-auto max-w-7xl px-5 py-18 lg:px-8 lg:py-24">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#d9b96d]">
            About The Practice
          </span>
          <h1 className="font-display mt-3 max-w-4xl text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
            Clear, approachable guidance for your bookkeeping and taxes.
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[#b9c4cf]">
            {site.positioning}
          </p>
        </div>
      </section>

      {/* Main Profile Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 items-center">
          {/* Photo / Profile Card */}
          <div className="mx-auto w-full max-w-md rounded-3xl border border-[#dedbd3] bg-white p-4 shadow-xl">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-[#f7f5ef]">
              <ProfessionalPhoto className="h-full w-full" />
            </div>
            <div className="mt-4 p-2 text-center">
              <h2 className="text-xl font-bold text-[#122438]">{site.name}</h2>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#a77d2f]">
                {site.designation}
              </p>
              <p className="mt-1 text-xs text-[#8a94a2]">
                {site.location}
              </p>
            </div>
          </div>

          {/* Biography & Approach */}
          <div>
            <SectionTitle
              eyebrow="Professional Background"
              title="Individual attention with practical accountability."
              description="Navigating accounting, payroll, and statutory compliance should never feel confusing. We provide structured, step-by-step assistance that empowers businesses to manage their financial obligations with peace of mind."
            />

            <div className="mt-6 space-y-4 text-xs sm:text-sm leading-relaxed text-[#536071]">
              <p>
                {site.subPositioning}
              </p>
              <p>
                As an independent tax consultant, KP Pruthvi works directly with clients rather than delegating tasks to unverified hands. Every requirement receives hands-on review, whether it is routine monthly bookkeeping, payroll calculations, or corporate tax filings.
              </p>
            </div>

            {/* Quick Badges */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl border border-[#dedbd3] bg-white p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f2e8cf] text-[#a77d2f]">
                  <BriefcaseBusiness size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#122438]">Direct Access</p>
                  <p className="text-xs text-[#687385]">Consult directly with KP Pruthvi</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-[#dedbd3] bg-white p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef1ef] text-[#2c5a4d]">
                  <Clock3 size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#122438]">{site.hours}</p>
                  <p className="text-[11px] text-[#8a94a2]">Convenient appointment hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-[#dedbd3] bg-white p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f2e8cf] text-[#a77d2f]">
                  <Monitor size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#122438]">100% Online Consultations</p>
                  <p className="text-xs text-[#687385]">Google Meet, Zoom, WhatsApp & Phone</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-[#dedbd3] bg-white p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef1ef] text-[#2c5a4d]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#122438]">5 Years Experience*</p>
                  <p className="text-xs text-[#687385]">Practical tax & accounting experience</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/appointment"
                className="inline-flex items-center gap-2 rounded-xl bg-[#122438] px-6 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#20374e]"
              >
                Book a Free Consultation <ArrowRight size={16} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-[#dedbd3] bg-white px-5 py-3.5 text-xs sm:text-sm font-semibold text-[#122438] hover:bg-[#fbfaf6]"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Target Clients Banner */}
      <section className="bg-[#eef1ef] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionTitle
            eyebrow="Client Groups"
            title="Who We Regularly Support"
            description="Our practice assists small and medium enterprises, startups, and self-employed professionals across Bengaluru and India."
          />

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {clientGroups.map((group) => (
              <div
                key={group}
                className="flex items-center gap-3 rounded-2xl border border-[#dfe4df] bg-white p-5 text-xs sm:text-sm font-semibold text-[#182536] shadow-sm"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2c5a4d] text-white">
                  <Check size={14} />
                </span>
                <span>{group}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
