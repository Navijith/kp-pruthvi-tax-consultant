import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CalendarDays, Menu, Phone, X } from 'lucide-react'
import { site } from '../../config/site'

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Location', path: '/location' },
  { name: 'Contact', path: '/contact' },
]

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8e5dc]/80 bg-[#fbfaf6]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#122438] text-sm font-semibold tracking-wider text-[#fbfaf6] shadow-sm">
            KP
          </div>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-bold tracking-[0.08em] text-[#122438]">KP PRUTHVI</p>
            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a77d2f]">Tax Consultant</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-[#a77d2f]' : 'text-[#5c6878] hover:text-[#122438]'}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={site.phoneHref} className="inline-flex items-center gap-2 rounded-full border border-[#dcd8ce] px-4 py-2.5 text-sm font-semibold text-[#122438] transition hover:border-[#c8bea7] hover:bg-white">
            <Phone size={16} />
            Call
          </a>
          <Link to="/appointment" className="inline-flex items-center gap-2 rounded-full bg-[#122438] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#20374e]">
            <CalendarDays size={16} />
            Book Appointment
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-lg p-2 text-[#122438] lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#e8e5dc] bg-[#fbfaf6] px-5 py-5 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-3 font-medium ${isActive ? 'bg-[#f2e8cf] text-[#122438]' : 'text-[#536071] hover:bg-white'}`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <Link
              to="/appointment"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-[#122438] px-4 py-3.5 font-semibold text-white"
            >
              <CalendarDays size={18} />
              Book Appointment
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
