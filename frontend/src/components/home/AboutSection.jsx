import { motion } from 'framer-motion'
import {
  BriefcaseBusiness,
  Clock3,
  Monitor,
  ShieldCheck,
  Check,
  CalendarDays,
} from 'lucide-react'
import { clientGroups, site } from '../../config/site'
import ProfessionalPhoto from '../common/ProfessionalPhoto'
import SectionTitle from '../common/SectionTitle'

function AboutSection() {
  const scrollToContact = () => {
    const contactEl = document.getElementById('contact')
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="about" className="py-20 lg:py-28 bg-white border-b border-[#e5e2da]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] items-center">
          {/* Photo / Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mx-auto w-full max-w-md rounded-3xl border border-[#dedbd3] bg-[#fbfaf6] p-4 sm:p-5 shadow-xl"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-[#efece3]">
              <ProfessionalPhoto className="h-full w-full" />
            </div>
            <div className="mt-4 p-2 text-center">
              <h3 className="text-xl font-bold text-[#122438]">{site.name}</h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#a77d2f]">
                {site.designation}
              </p>
              <p className="mt-1 text-xs text-[#8a94a2]">
                {site.location}
              </p>
            </div>
          </motion.div>

          {/* Biography & Approach */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionTitle
              eyebrow="About The Practice"
              title="Individual attention with practical accountability."
              description="Navigating accounting, payroll, and statutory compliance should never feel confusing. We provide structured, step-by-step assistance that empowers businesses to manage their financial obligations with peace of mind."
            />

            <div className="mt-6 space-y-4 text-xs sm:text-sm leading-relaxed text-[#536071]">
              <p>
                {site.positioning}
              </p>
              <p>
                {site.subPositioning}
              </p>
              <p>
                As an independent tax consultant, KP Pruthvi works directly with clients rather than delegating tasks to unverified hands. Every requirement receives hands-on review, whether it is routine monthly bookkeeping, payroll calculations, or corporate tax filings.
              </p>
            </div>

            {/* Quick Badges */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl border border-[#dedbd3] bg-[#fbfaf6] p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f2e8cf] text-[#a77d2f]">
                  <BriefcaseBusiness size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#122438]">Direct Access</p>
                  <p className="text-xs text-[#687385]">Consult directly with KP Pruthvi</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-[#dedbd3] bg-[#fbfaf6] p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef1ef] text-[#2c5a4d]">
                  <Clock3 size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#122438]">{site.hours}</p>
                  <p className="text-[11px] text-[#8a94a2]">Convenient appointment hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-[#dedbd3] bg-[#fbfaf6] p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f2e8cf] text-[#a77d2f]">
                  <Monitor size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#122438]">100% Online Consultations</p>
                  <p className="text-xs text-[#687385]">Google Meet, Zoom, WhatsApp & Phone</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-[#dedbd3] bg-[#fbfaf6] p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef1ef] text-[#2c5a4d]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#122438]">5+ Years Experience</p>
                  <p className="text-xs text-[#687385]">Practical tax & accounting experience</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 rounded-xl bg-[#122438] px-6 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#20374e] transition cursor-pointer"
              >
                <CalendarDays size={16} />
                <span>Schedule a Consultation</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Target Clients Banner */}
        <div className="mt-16 sm:mt-20 rounded-3xl border border-[#dedbd3] bg-[#fbfaf6] p-8 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-wider text-[#a77d2f]">
            Clientele Served
          </p>
          <h3 className="font-display mt-2 text-2xl font-bold text-[#122438]">
            Who We Regularly Assist Across India
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#687385] max-w-2xl">
            Our practice provides dependable, ongoing accounting, tax, and statutory support for diverse commercial entities.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {clientGroups.map((group) => (
              <div
                key={group}
                className="flex items-center gap-3 rounded-2xl border border-[#e4e2da] bg-white p-4 text-xs sm:text-sm font-semibold text-[#182536] shadow-xs"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2c5a4d] text-white">
                  <Check size={13} />
                </span>
                <span>{group}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
