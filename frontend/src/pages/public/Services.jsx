import { motion } from 'framer-motion'
import { ArrowRight, Calculator, Building2, FileCheck2, ReceiptText, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services } from '../../config/site'

const iconMap = {
  'direct-tax': Calculator,
  'indirect-tax': ReceiptText,
  compliance: ShieldCheck,
  accounting: FileCheck2,
  'company-registration': Building2,
}

function Services() {
  return (
    <div className="page-shell">
      <section className="bg-[#122438] text-white"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d9b96d]">Services</p><h1 className="font-display mt-4 max-w-4xl text-5xl leading-tight sm:text-6xl">Tax, accounting and compliance support — without unnecessary complexity.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-[#b9c4cf]">Select a service below to understand the kind of support available. Final scope depends on the client's specific requirement.</p></div></section>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-2">
            {services.map((service, index) => {
              const Icon = iconMap[service.id]
              return <motion.article key={service.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="rounded-[1.75rem] border border-[#e4e2da] bg-white p-7 shadow-sm transition hover:shadow-professional sm:p-8">
                <div className="flex items-start justify-between gap-5"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f2e8cf] text-[#a77d2f]"><Icon size={22} /></div><span className="rounded-full bg-[#eef1ef] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#52675e]">Service {String(index + 1).padStart(2, '0')}</span></div>
                <h2 className="mt-7 text-2xl font-bold text-[#122438]">{service.title}</h2>
                <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#687385]">{service.description}</p>
                <div className="mt-6 grid gap-2 sm:grid-cols-3">{service.points.map((point) => <div key={point} className="rounded-xl bg-[#f7f5ef] px-3 py-3 text-sm font-medium leading-5 text-[#3b4a5a]">{point}</div>)}</div>
              </motion.article>
            })}
          </div>
        </div>
      </section>
      <section className="bg-[#eef1ef] py-20"><div className="mx-auto max-w-5xl px-5 text-center lg:px-8"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a77d2f]">Not sure where to start?</p><h2 className="font-display mt-3 text-4xl text-[#122438] sm:text-5xl">Tell us the problem. We can identify the service.</h2><p className="mx-auto mt-5 max-w-2xl text-[17px] leading-8 text-[#687385]">You do not need to know the exact compliance or tax category before contacting the practice.</p><Link to="/appointment" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#122438] px-6 py-3.5 font-semibold text-white">Book a free consultation <ArrowRight size={17} /></Link></div></section>
    </div>
  )
}
export default Services
