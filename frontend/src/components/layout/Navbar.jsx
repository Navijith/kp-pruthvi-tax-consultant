import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CalendarDays, Menu, X } from 'lucide-react'
import { site } from '../../config/site'

const navItems = [
  { name: 'Home', targetId: 'home' },
  { name: 'Services', targetId: 'services' },
  { name: 'About', targetId: 'about' },
  { name: 'Contact', targetId: 'contact' },
  { name: 'Reviews', targetId: 'feedback' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const location = useLocation()

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140
      for (const item of [...navItems].reverse()) {
        const el = document.getElementById(item.targetId)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(item.targetId)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.replaceState(null, '', `#${id}`)
    } else {
      window.location.href = `/#${id}`
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#e8e5dc]/80 bg-[#fbfaf6]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] sm:h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <button
          type="button"
          onClick={() => scrollTo('home')}
          className="flex min-w-0 items-center gap-3 text-left cursor-pointer"
        >
          <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-[#122438] text-sm font-semibold tracking-wider text-[#fbfaf6] shadow-sm">
            KP
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm sm:text-[15px] font-bold tracking-[0.08em] text-[#122438]">KP PRUTHVI</p>
            <p className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a77d2f]">Tax Consultant</p>
          </div>
        </button>

        {/* Desktop Navigation in requested order: Home -> Services -> About -> Contact */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.targetId
            return (
              <button
                key={item.targetId}
                type="button"
                onClick={() => scrollTo(item.targetId)}
                className={`text-sm font-medium transition cursor-pointer ${
                  isActive
                    ? 'text-[#a77d2f] font-bold border-b-2 border-[#a77d2f] pb-0.5'
                    : 'text-[#5c6878] hover:text-[#122438]'
                }`}
              >
                {item.name}
              </button>
            )
          })}
        </nav>

        {/* Desktop Single Focused CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-2 rounded-xl bg-[#122438] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#20374e] shadow-sm cursor-pointer"
          >
            <CalendarDays size={15} />
            <span>Book Consultation</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#122438] px-3.5 py-2 text-xs font-semibold text-white shadow-xs cursor-pointer"
          >
            <CalendarDays size={14} />
            <span>Book</span>
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-xl border border-[#dcd8ce] bg-white p-2 text-[#122438] cursor-pointer"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-[#e8e5dc] bg-[#fbfaf6] px-5 py-5 lg:hidden shadow-lg">
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.targetId
              return (
                <button
                  key={item.targetId}
                  type="button"
                  onClick={() => scrollTo(item.targetId)}
                  className={`w-full text-left rounded-xl px-4 py-3 font-medium text-sm transition cursor-pointer ${
                    isActive
                      ? 'bg-[#f2e8cf] text-[#122438] font-bold'
                      : 'text-[#536071] hover:bg-white'
                  }`}
                >
                  {item.name}
                </button>
              )
            })}

            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#122438] px-4 py-3.5 text-sm font-semibold text-white shadow-sm cursor-pointer"
            >
              <CalendarDays size={18} />
              Book Free Consultation
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
