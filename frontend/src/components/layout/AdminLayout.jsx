import { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Clock3,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { getNotifications } from '../../services/api'

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Leads & Enquiries', path: '/admin/leads', icon: Users },
  { name: 'Appointments', path: '/admin/appointments', icon: CalendarDays },
  { name: 'Follow-ups', path: '/admin/follow-ups', icon: Clock3 },
  { name: 'Notifications', path: '/admin/notifications', icon: Bell },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
]

function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    async function fetchUnread() {
      try {
        const res = await getNotifications()
        if (res?.success) {
          setUnreadCount(res.unread_count || 0)
        }
      } catch (err) {
        // Silently handle
      }
    }
    fetchUnread()
    const timer = setInterval(fetchUnread, 30000)
    return () => clearInterval(timer)
  }, [location.pathname])

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="flex min-h-screen bg-[#f3f1ea] text-[#182536]">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-[#dedbd3] bg-[#122438] text-white lg:flex">
        <div>
          {/* Logo / Brand */}
          <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e3c474] text-sm font-bold text-[#122438]">
              KP
            </div>
            <div>
              <p className="text-sm font-bold tracking-wider text-white">KP PRUTHVI</p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#d9b96d]">
                Tax Consultant CRM
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 p-4">
            {navItems.map((item) => {
              const Icon = item.icon
              const isNotifications = item.path === '/admin/notifications'
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-[#e3c474] text-[#122438] font-semibold shadow-sm'
                        : 'text-[#c8d1d9] hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </div>
                  {isNotifications && unreadCount > 0 && (
                    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white">
                      {unreadCount}
                    </span>
                  )}
                </NavLink>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-white/10 p-4">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-semibold text-[#b9c4cf] transition hover:bg-white/5 hover:text-white"
          >
            <span>View Public Website</span>
            <ExternalLink size={14} />
          </Link>

          <div className="mt-4 flex items-center justify-between rounded-xl bg-white/5 p-3">
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-white">
                {user?.full_name || 'Administrator'}
              </p>
              <p className="truncate text-[11px] text-[#919ea9]">
                {user?.email || 'admin@kppruthvi.com'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="rounded-lg p-1.5 text-[#b9c4cf] hover:bg-white/10 hover:text-white transition"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#dedbd3] bg-[#fbfaf6] px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 text-[#122438] hover:bg-[#eef1ef] lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>
            <h1 className="text-sm sm:text-base font-bold text-[#122438]">
              KP Tax Consultants — Practice Management
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/admin/notifications"
              className="relative rounded-xl border border-[#dedbd3] bg-white p-2.5 text-[#122438] hover:bg-[#f7f5ef] transition"
              aria-label="View notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white animate-pulse">
                  {unreadCount}
                </span>
              )}
            </Link>

            <button
              onClick={handleLogout}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-[#dedbd3] bg-white px-3.5 py-2 text-xs font-semibold text-[#122438] hover:bg-[#f7f5ef] transition"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative flex w-72 flex-col justify-between bg-[#122438] p-5 text-white shadow-2xl">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e3c474] text-xs font-bold text-[#122438]">
                      KP
                    </div>
                    <span className="text-sm font-bold text-white">KP Tax CRM</span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg p-1 text-white/70 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="mt-4 space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isNotifications = item.path === '/admin/notifications'
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                            isActive
                              ? 'bg-[#e3c474] text-[#122438] font-bold'
                              : 'text-[#c8d1d9] hover:bg-white/10 hover:text-white'
                          }`
                        }
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={18} />
                          <span>{item.name}</span>
                        </div>
                        {isNotifications && unreadCount > 0 && (
                          <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white">
                            {unreadCount}
                          </span>
                        )}
                      </NavLink>
                    )
                  })}
                </nav>
              </div>

              <div className="border-t border-white/10 pt-4">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600/80 px-4 py-3 text-xs font-semibold text-white"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page Content Viewport */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
