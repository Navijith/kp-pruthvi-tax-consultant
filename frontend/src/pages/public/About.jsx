import { motion } from 'framer-motion'
import { ArrowRight, BriefcaseBusiness, Clock3, MapPin, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { clientGroups, site } from '../../config/site'
import ProfessionalPhoto from '../../components/common/ProfessionalPhoto'

function About() {
  return (
    <div className="page-shell">
      <section className="bg-[#122438] text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d9b96d]">About the practice</p>
          <h1 className="font-display mt-4 max-w-4xl text-5xl leading-tight sm:text-6xl">A professional, approachable place to get your tax and accounting questions organized.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#b9c4cf]">{site.practiceName} is an individual practice led by KP Pruthvi, a Tax Consultant and CA Intermediate candidate with {site.experience} of working experience.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div className="rounded-[2rem] border border-[#e4e2da] bg-white p-4 shadow-sm">
            <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem]">
              <ProfessionalPhoto className="h-full w-full" />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a77d2f]">KP Pruthvi</p>
            <h2 className="font-display mt-3 text-4xl text-[#122438] sm:text-5xl">Practical support, explained clearly.</h2>
            <p className="mt-6 text-[17px] leading-8 text-[#687385]">The practice is designed around a simple idea: clients should be able to understand what needs to be done, why it matters and what the next step is.</p>
            <p className="mt-4 text-[17px] leading-8 text-[#687385]">KP works individually with clients across personal tax matters, GST and other indirect-tax requirements, compliance, accounting and company registration support.</p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {[
                [BriefcaseBusiness, 'Individual practice', 'Direct access to the consultant'],
                [Clock3, site.experience, 'Working experience in the field'],
                [MapPin, 'Vidyaranyapura', 'Office in Bengaluru'],
                [ShieldCheck, 'Online + Offline', 'Flexible consultation options'],
              ].map(([Icon, title, text]) => (
                <div key={title} className="rounded-2xl border border-[#e4e2da] bg-white p-5"><Icon size={20} className="text-[#a77d2f]" /><p className="mt-3 font-bold text-[#122438]">{title}</p><p className="mt-1 text-sm leading-6 text-[#687385]">{text}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eef1ef] py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a77d2f]">Clients</p><h2 className="font-display mt-3 text-4xl text-[#122438] sm:text-5xl">Designed for individuals and businesses alike.</h2></div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {clientGroups.map((item) => <div key={item} className="rounded-2xl border border-[#dfe4df] bg-white p-5 text-sm font-semibold text-[#2d3d4e]">{item}</div>)}
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf6] py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center lg:px-8">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a77d2f]">Next step</p><h2 className="font-display mt-3 text-3xl text-[#122438] sm:text-4xl">Have a tax or accounting requirement?</h2></div>
          <Link to="/appointment" className="inline-flex items-center gap-2 rounded-xl bg-[#122438] px-5 py-3.5 font-semibold text-white">Book a consultation <ArrowRight size={17} /></Link>
        </div>
      </section>
    </div>
  )
}

export default About
