import { Mail, Monitor } from 'lucide-react'
import { site } from '../../config/site'
import { InstagramIcon, LinkedinIcon, XIcon } from '../common/SocialIcons'

function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.replaceState(null, '', `#${id}`)
    }
  }

  return (
    <footer id="footer" className="bg-[#122438] text-[#d9e0e6]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1fr] lg:px-8">
        <div>
          <button
            type="button"
            onClick={() => scrollTo('home')}
            className="flex items-center gap-3 text-left cursor-pointer"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fbfaf6] text-sm font-bold tracking-wider text-[#122438]">
              KP
            </div>
            <div>
              <p className="text-sm font-bold tracking-[0.1em] text-white">KP PRUTHVI</p>
              <p className="text-xs uppercase tracking-[0.16em] text-[#d9b96d]">{site.practiceName}</p>
            </div>
          </button>
          <p className="mt-5 max-w-md text-xs sm:text-sm leading-relaxed text-[#aeb9c5]">
            {site.positioning}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={site.socials.instagramDm}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition"
            >
              <InstagramIcon size={13} className="text-[#E4405F]" /> Instagram
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition"
            >
              <LinkedinIcon size={13} className="text-[#0A66C2]" /> LinkedIn
            </a>
            <a
              href={site.socials.x}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20 transition"
            >
              <XIcon size={12} className="text-white" /> 𝕏 Profile
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white">Quick Navigation</h3>
          <div className="mt-4 grid gap-2.5 text-xs sm:text-sm text-[#aeb9c5]">
            <button
              type="button"
              onClick={() => scrollTo('home')}
              className="text-left hover:text-white transition cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => scrollTo('services')}
              className="text-left hover:text-white transition cursor-pointer"
            >
              Services & Expertise
            </button>
            <button
              type="button"
              onClick={() => scrollTo('about')}
              className="text-left hover:text-white transition cursor-pointer"
            >
              About KP Pruthvi
            </button>
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="text-left hover:text-white transition cursor-pointer"
            >
              Book Consultation / Contact
            </button>
            <button
              type="button"
              onClick={() => scrollTo('feedback')}
              className="text-left hover:text-white transition cursor-pointer"
            >
              Ratings, Reviews & Suggestions
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white">Services</h3>
          <div className="mt-4 grid gap-2.5 text-xs sm:text-sm text-[#aeb9c5]">
            <button
              type="button"
              onClick={() => scrollTo('bookkeeping-accounting')}
              className="text-left hover:text-white transition cursor-pointer"
            >
              Bookkeeping & Accounts
            </button>
            <button
              type="button"
              onClick={() => scrollTo('direct-tax')}
              className="text-left hover:text-white transition cursor-pointer"
            >
              Direct Tax & TDS
            </button>
            <button
              type="button"
              onClick={() => scrollTo('statutory-payroll')}
              className="text-left hover:text-white transition cursor-pointer"
            >
              Statutory & Payroll
            </button>
            <button
              type="button"
              onClick={() => scrollTo('indirect-tax')}
              className="text-left hover:text-white transition cursor-pointer"
            >
              Indirect Tax (GST)
            </button>
            <button
              type="button"
              onClick={() => scrollTo('company-registration')}
              className="text-left hover:text-white transition cursor-pointer"
            >
              Company Registration
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white">Practice Information</h3>
          <div className="mt-4 space-y-3 text-xs sm:text-sm text-[#aeb9c5]">
            <div className="flex items-start gap-2.5">
              <Monitor size={16} className="mt-0.5 shrink-0 text-[#d9b96d]" />
              <span>100% Online & Remote Practice</span>
            </div>
            <a href={`mailto:${site.email}`} className="flex items-start gap-2.5 break-all hover:text-white transition">
              <Mail size={16} className="mt-0.5 shrink-0 text-[#d9b96d]" />
              <span>{site.email}</span>
            </a>
            <div className="flex items-start gap-2.5">
              <span className="text-[#d9b96d] font-bold">Hours:</span>
              <span>{site.hours}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-center text-xs text-[#8d9aa8] sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-8">
          <span>© {new Date().getFullYear()} {site.practiceName}. All rights reserved.</span>
          <div className="flex items-center justify-center sm:justify-end gap-3">
            <span>Bengaluru, Karnataka (Online Consultations)</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
