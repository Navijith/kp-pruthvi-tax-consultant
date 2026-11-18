import { motion } from 'framer-motion'
import { Check, UserCheck, ShieldCheck, Clock, FileSpreadsheet, MapPin } from 'lucide-react'
import { clientGroups, site } from '../../config/site'
import SectionTitle from '../common/SectionTitle'

const reasons = [
  {
    icon: UserCheck,
    title: 'Direct Consultant Access',
    description: 'Work directly with KP Pruthvi, Tax Consultant with 5+ years of practical experience in taxation and accounting.',
  },
  {
    icon: ShieldCheck,
    title: 'Clear, Transparent Guidance',
    description: 'Understand statutory requirements and options clearly without unnecessary jargon or ambiguous filing promises.',
  },
  {
    icon: Clock,
    title: '100% Online Consultations',
    description: 'Connect remotely via Google Meet, Zoom, WhatsApp, or phone — convenient, secure, and hassle-free.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Organized Documentation',
    description: 'We help you systematically organize your financial statements, invoices, and returns for peace of mind.',
  },
]

function WhyChooseUs() {
  return (
    <section className="bg-[#eef1ef] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionTitle
          eyebrow="Why Approach KP Tax Consultants"
          title="Practical financial clarity designed around your convenience."
          description="We focus on approachable, dependable assistance for daily business needs and statutory tax deadlines."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-2xl border border-[#dfe4df] bg-white p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8efeb] text-[#2c5a4d]">
                  <Icon size={21} />
                </div>
                <h3 className="mt-5 text-base font-bold text-[#122438]">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#687385]">{item.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Who we help banner */}
        <div className="mt-16 rounded-3xl border border-[#dfe4df] bg-white p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#a77d2f]">
                Target Clientele
              </span>
              <h3 className="font-display mt-2 text-2xl sm:text-3xl font-bold text-[#122438]">
                Tailored for every stage of your business journey.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#687385]">
                Whether you are an individual needing income tax return guidance or a growing company seeking monthly GST filing, we adapt our support to your scale.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {clientGroups.map((group) => (
                <div
                  key={group}
                  className="flex items-center gap-2.5 rounded-xl border border-[#e4e2da] bg-[#fbfaf6] px-3.5 py-3 text-xs font-semibold text-[#182536]"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2c5a4d] text-white">
                    <Check size={12} />
                  </span>
                  <span className="truncate">{group}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
