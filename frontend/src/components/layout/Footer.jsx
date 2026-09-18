import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { site } from '../../config/site'

function Footer() {
  return (
    <footer className="bg-[#122438] text-[#d9e0e6]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fbfaf6] text-sm font-bold tracking-wider text-[#122438]">KP</div>
            <div>
              <p className="text-sm font-bold tracking-[0.1em] text-white">KP PRUTHVI</p>
              <p className="text-xs uppercase tracking-[0.16em] text-[#d9b96d]">{site.practiceName}</p>
            </div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-7 text-[#aeb9c5]">
            Tax, GST, compliance, accounting and company registration support for individuals, professionals and businesses in Bengaluru.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Explore</h3>
          <div className="mt-5 grid gap-3 text-sm text-[#aeb9c5]">
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/services" className="hover:text-white">Services</Link>
            <Link to="/appointment" className="hover:text-white">Appointments</Link>
            <Link to="/location" className="hover:text-white">Office location</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Contact</h3>
          <div className="mt-5 space-y-4 text-sm text-[#aeb9c5]">
            <a href={site.phoneHref} className="flex items-start gap-3 hover:text-white"><Phone size={18} className="mt-0.5 shrink-0" /><span>{site.phone}</span></a>
            <a href={`mailto:${site.email}`} className="flex items-start gap-3 break-all hover:text-white"><Mail size={18} className="mt-0.5 shrink-0" /><span>{site.email}</span></a>
            <div className="flex items-start gap-3"><MapPin size={18} className="mt-0.5 shrink-0" /><span>Vidyaranyapura, Bengaluru</span></div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-center text-xs text-[#8d9aa8] sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-8">
          <span>© {new Date().getFullYear()} {site.practiceName}. All rights reserved.</span>
          <span>{site.hours}</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
