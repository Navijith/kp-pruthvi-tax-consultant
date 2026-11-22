import { motion } from 'framer-motion'
import { ArrowRight, CalendarDays, Clock3, ShieldCheck, Monitor } from 'lucide-react'
import { Link } from 'react-router-dom'
import { site } from '../../config/site'
import ProfessionalPhoto from '../common/ProfessionalPhoto'

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#122438] text-white">
      {/* Background ambient accents */}
      <div className="absolute inset-0 soft-grid opacity-25 pointer-events-none" />
      <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#a77d2f]/15 blur-3xl pointer-events-none" />
      <div className="absolute right-0 top-32 h-96 w-96 rounded-full bg-[#2c5a4d]/20 blur-3xl pointer-events-none" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Eyebrow badge */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#e7d29b]">
              <span>{site.practiceName}</span>
              <span className="text-white/30">•</span>
              <span>Online Practice</span>
            </div>
            <a
              href="https://www.google.com/search?q=KP+Tax+Consultants+Bengaluru"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#f59e0b]/40 bg-[#f59e0b]/15 px-3.5 py-1 text-xs font-semibold text-[#fde68a] hover:bg-[#f59e0b]/25 transition-colors"
            >
              <span className="text-[#f59e0b]">★★★★★</span>
              <span>5.0 on Google (11 Reviews)</span>
            </a>
          </div>

          <p className="mt-5 text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-[#d9b96d]">
            {site.designation} · Remote Consultations
          </p>

          <h1 className="font-display mt-3 max-w-3xl text-4xl leading-[1.12] text-white sm:text-5xl lg:text-6xl">
            Clear guidance for taxes, accounts and business compliance.
          </h1>

          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-[#b9c4cf]">
            KP Tax Consultants helps businesses maintain timely and accurate bookkeeping while ensuring compliance with applicable tax and statutory requirements.
          </p>

          {/* Factual trust indicators */}
          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-7 sm:grid-cols-3 text-sm text-[#b9c4cf]">
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={18} className="shrink-0 text-[#d9b96d]" />
              <div>
                <p className="font-semibold text-white">{site.experience} Experience</p>
                <p className="text-[11px] text-[#8e9ca8]">Tax & Bookkeeping</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock3 size={18} className="shrink-0 text-[#d9b96d]" />
              <div>
                <p className="font-semibold text-white">6 Days a Week</p>
                <p className="text-[11px] text-[#8e9ca8]">9:00 AM–7:00 PM</p>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
              <Monitor size={18} className="shrink-0 text-[#d9b96d]" />
              <div>
                <p className="font-semibold text-white">100% Online</p>
                <p className="text-[11px] text-[#8e9ca8]">Meet, Zoom & Phone</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Consultant profile card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="relative lg:ml-auto w-full max-w-[420px]"
        >
          <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-md">
            <div className="overflow-hidden rounded-[1.6rem] bg-[#efece3]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <ProfessionalPhoto className="h-full w-full" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#122438] via-[#122438]/70 to-transparent p-6 pt-20">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e7d29b]">
                    {site.designation}
                  </span>
                  <h3 className="font-display mt-1 text-3xl text-white">KP Pruthvi</h3>
                  <p className="mt-1 text-xs text-[#b9c4cf]">
                    Online Tax & Accounting Consultant
                  </p>
                </div>
              </div>

              {/* Card footer details */}
              <div className="grid grid-cols-3 divide-x divide-[#ded9ce] bg-white p-4 text-center">
                <div>
                  <p className="text-lg font-bold text-[#122438]">5+ Yrs</p>
                  <p className="text-[10px] uppercase tracking-wider text-[#687385]">Experience*</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-[#122438]">15 Min</p>
                  <p className="text-[10px] uppercase tracking-wider text-[#687385]">Consultation</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-[#122438]">Remote</p>
                  <p className="text-[10px] uppercase tracking-wider text-[#687385]">Flexible</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
