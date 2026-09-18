import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Check, ChevronRight, FileText, Landmark, ReceiptText, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { clientGroups, services, site } from '../../config/site'
import ProfessionalPhoto from '../../components/common/ProfessionalPhoto'

function Home() {
  return (
    <div className="page-shell">
      <section className="relative overflow-hidden bg-[#122438] text-white">
        <div className="absolute inset-0 soft-grid opacity-30" />
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#a77d2f]/15 blur-3xl" />
        <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-[#2c5a4d]/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-18 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#e7d29b]">
              {site.practiceName} <span className="text-white/40">•</span> Bengaluru
            </div>

            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.22em] text-[#d9b96d]">{site.designation} · {site.qualification}</p>
            <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[1.05] text-white sm:text-6xl lg:text-[72px]">
              Clear guidance for taxes, accounts & compliance.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#b9c4cf]">
              Practical professional support for individuals, salaried professionals, self-employed clients, startups and businesses — with online and in-person consultations.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/appointment" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e3c474] px-6 py-3.5 font-semibold text-[#122438] transition hover:bg-[#efd58f]">
                <CalendarDays size={18} /> Book a free 15-minute consultation
              </Link>
              <Link to="/services" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:border-white/40 hover:bg-white/5">
                View services <ArrowRight size={18} />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#b9c4cf]">
              <span className="inline-flex items-center gap-2"><ShieldCheck size={17} className="text-[#d9b96d]" /> {site.experience} experience</span>
              <span className="inline-flex items-center gap-2"><ClockIcon /> 9 AM–8 PM · 6 days a week</span>
              <span className="inline-flex items-center gap-2"><MapPinIcon /> Vidyaranyapura</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, delay: 0.08 }} className="relative">
            <div className="mx-auto max-w-[430px] rounded-[2rem] border border-white/12 bg-white/7 p-3 shadow-professional backdrop-blur">
              <div className="overflow-hidden rounded-[1.6rem] bg-[#efece3]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <ProfessionalPhoto className="h-full w-full" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#122438]/85 via-[#122438]/45 to-transparent p-7 pt-24">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e7d29b]">Professional profile</p>
                    <h2 className="font-display mt-2 text-4xl text-white">KP Pruthvi</h2>
                    <p className="mt-2 text-sm font-semibold text-[#e3c474]">Tax Consultant · CA Intermediate</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 divide-x divide-[#ded9ce] bg-white p-4 text-center">
                  <div><p className="text-lg font-bold text-[#122438]">5</p><p className="text-[11px] uppercase tracking-wider text-[#7b8591]">Years</p></div>
                  <div><p className="text-lg font-bold text-[#122438]">15</p><p className="text-[11px] uppercase tracking-wider text-[#7b8591]">Min</p></div>
                  <div><p className="text-lg font-bold text-[#122438]">6</p><p className="text-[11px] uppercase tracking-wider text-[#7b8591]">Days</p></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-[#e5e2da] bg-[#fbfaf6]">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-6 md:grid-cols-3 lg:px-8">
          {[
            ['Free initial consultation', '15-minute appointment to understand your requirement'],
            ['Online or in person', 'Choose the consultation mode that works for you'],
            ['Direct professional contact', 'Call or WhatsApp for quick questions'],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-[#e4e2da] bg-white px-5 py-4">
              <p className="text-sm font-bold text-[#122438]">{title}</p>
              <p className="mt-1 text-sm leading-6 text-[#6c7683]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#fbfaf6] py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a77d2f]">Services</p>
              <h2 className="font-display mt-3 text-4xl leading-tight text-[#122438] sm:text-5xl">Professional support across your regular financial needs.</h2>
              <p className="mt-5 max-w-xl text-[17px] leading-8 text-[#687385]">The service menu is intentionally straightforward, so visitors can quickly identify what they need help with.</p>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-bold text-[#122438]">View all services <ChevronRight size={17} /></Link>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const icons = [FileText, ReceiptText, ShieldCheck, Landmark, Check]
              const Icon = icons[index] || FileText
              return (
                <motion.article key={service.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="group rounded-[1.5rem] border border-[#e4e2da] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-professional">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f2e8cf] text-[#a77d2f]"><Icon size={22} /></div>
                  <h3 className="mt-6 text-xl font-bold text-[#122438]">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#687385]">{service.description}</p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-bold text-[#122438]">Learn more <ArrowRight size={15} className="transition group-hover:translate-x-1" /></div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#eef1ef] py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a77d2f]">Who we help</p>
            <h2 className="font-display mt-3 text-4xl leading-tight text-[#122438] sm:text-5xl">Support that fits different kinds of clients.</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-8 text-[#687385]">From personal tax requirements to routine business compliance, the website should make the next step easy without overwhelming visitors with jargon.</p>
            <Link to="/appointment" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#122438] px-5 py-3.5 text-sm font-semibold text-white">Discuss your requirement <ArrowRight size={17} /></Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {clientGroups.map((group) => (
              <div key={group} className="flex items-center gap-3 rounded-2xl border border-[#dfe4df] bg-white px-5 py-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8efeb] text-[#2c5a4d]"><Check size={16} /></span>
                <span className="text-sm font-semibold text-[#2d3d4e]">{group}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#122438] py-20 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 px-5 md:flex-row md:items-center lg:px-8">
          <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d9b96d]">Ready to talk?</p><h2 className="font-display mt-3 text-4xl sm:text-5xl">Start with a free 15-minute consultation.</h2><p className="mt-4 text-[#b9c4cf]">Choose online or in-person and submit a preferred date and time. The request will be confirmed directly by KP Tax Consultants.</p></div>
          <Link to="/appointment" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#e3c474] px-6 py-3.5 font-semibold text-[#122438]">Book appointment <ArrowRight size={18} /></Link>
        </div>
      </section>
    </div>
  )
}

function ClockIcon() { return <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-current text-[9px]">◷</span> }
function MapPinIcon() { return <span className="inline-flex h-4 w-4 items-center justify-center text-[10px]">⌖</span> }

export default Home
