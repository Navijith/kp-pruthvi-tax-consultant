import { useEffect, useState } from 'react'
import {
  CalendarDays,
  Check,
  Clock3,
  Loader2,
  MapPin,
  Video,
  X,
  Phone,
  MessageCircle,
  Mail,
  CheckCircle2,
  Filter,
} from 'lucide-react'
import { getAppointments, updateAppointmentStatus } from '../../services/api'

function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [modeFilter, setModeFilter] = useState('all')

  const load = async () => {
    try {
      setLoading(true)
      const response = await getAppointments({
        status: statusFilter !== 'all' ? statusFilter : undefined,
        mode: modeFilter !== 'all' ? modeFilter : undefined,
      })
      setAppointments(response?.data || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load appointments.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [statusFilter, modeFilter])

  const changeStatus = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status)
      // Update local list directly
      setAppointments((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      )
    } catch (err) {
      alert(err.response?.data?.message || 'Unable to update appointment.')
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#a77d2f]">
            Schedule Management
          </span>
          <h1 className="font-display mt-1 text-2xl sm:text-3xl font-bold text-[#122438]">
            Appointments & Consultations
          </h1>
          <p className="text-xs sm:text-sm text-[#687385]">
            Review, confirm, or reschedule client consultation requests ({appointments.length} total).
          </p>
        </div>

        <button
          onClick={load}
          className="rounded-xl border border-[#dedbd3] bg-white px-4 py-2.5 text-xs font-semibold text-[#122438] hover:bg-[#fbfaf6]"
        >
          Refresh List
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#dedbd3] bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-[#687385]">
          <Filter size={15} /> Filters:
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-[#dedbd3] bg-[#fbfaf6] px-3.5 py-2 text-xs font-semibold text-[#182536] outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="requested">Requested (Needs Confirmation)</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={modeFilter}
          onChange={(e) => setModeFilter(e.target.value)}
          className="rounded-xl border border-[#dedbd3] bg-[#fbfaf6] px-3.5 py-2 text-xs font-semibold text-[#182536] outline-none"
        >
          <option value="all">All Modes</option>
          <option value="online">Online Consultations</option>
          <option value="offline">In-Person Office Visits</option>
        </select>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
          {error}
        </div>
      )}

      {/* Appointments List */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#122438]" />
        </div>
      ) : appointments.length === 0 ? (
        <div className="rounded-2xl border border-[#dedbd3] bg-white p-12 text-center text-xs sm:text-sm text-[#8a94a2]">
          No appointments found matching your filter selection.
        </div>
      ) : (
        <div className="grid gap-5">
          {appointments.map((item) => {
            const cleanPhone = item.phone ? item.phone.replace(/[^0-9]/g, '') : ''
            const isRequested = item.status === 'requested'
            const isConfirmed = item.status === 'confirmed'

            return (
              <div
                key={item.id}
                className={`rounded-2xl border p-6 shadow-sm transition ${
                  isRequested
                    ? 'border-amber-300 bg-amber-50/20'
                    : 'border-[#dedbd3] bg-white'
                }`}
              >
                {/* Top Row */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-[#122438] px-2.5 py-1 text-[11px] font-bold tracking-wider text-[#e3c474]">
                        REF: {item.reference_code}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                          item.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.status === 'requested'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : item.status === 'completed'
                            ? 'bg-slate-100 text-slate-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {item.status === 'requested' ? 'Pending Confirmation' : item.status}
                      </span>
                      <span className="rounded-full bg-[#f2e8cf] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#876529]">
                        {item.mode === 'online' ? 'Online Call' : 'Office Visit'}
                      </span>
                    </div>

                    <h2 className="mt-3 text-xl font-bold text-[#122438]">{item.name}</h2>
                    <p className="mt-1 text-xs sm:text-sm text-[#687385]">
                      {item.phone} {item.email ? ` · ${item.email}` : ''}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center gap-2">
                    {cleanPhone && (
                      <a
                        href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                          `Hello ${item.name}, this is KP Tax Consultants regarding your consultation request [${item.reference_code}] for ${item.appointment_date} at ${item.appointment_time}.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#2c5a4d] px-3 py-2 text-xs font-semibold text-white hover:bg-[#22473d]"
                      >
                        <MessageCircle size={14} /> WhatsApp
                      </a>
                    )}
                    {item.phone && (
                      <a
                        href={`tel:${item.phone}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#dedbd3] bg-white px-3 py-2 text-xs font-semibold text-[#122438] hover:bg-[#fbfaf6]"
                      >
                        <Phone size={14} /> Call
                      </a>
                    )}

                    {isRequested && (
                      <button
                        onClick={() => changeStatus(item.id, 'confirmed')}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#122438] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#20374e]"
                      >
                        <Check size={14} /> Confirm Slot
                      </button>
                    )}

                    {isConfirmed && (
                      <button
                        onClick={() => changeStatus(item.id, 'completed')}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-800"
                      >
                        <CheckCircle2 size={14} /> Mark Completed
                      </button>
                    )}

                    {item.status !== 'cancelled' && (
                      <button
                        onClick={() => changeStatus(item.id, 'cancelled')}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"
                      >
                        <X size={14} /> Cancel
                      </button>
                    )}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <Info
                    icon={CalendarDays}
                    label="Requested Date"
                    value={item.appointment_date?.slice(0, 10)}
                  />
                  <Info
                    icon={Clock3}
                    label="Preferred Time"
                    value={item.appointment_time}
                  />
                  <Info
                    icon={item.mode === 'online' ? Video : MapPin}
                    label="Platform / Mode"
                    value={item.preferred_method}
                  />
                  <Info
                    icon={CalendarDays}
                    label="Service Needed"
                    value={item.service}
                  />
                </div>

                {item.message && (
                  <div className="mt-4 rounded-xl bg-[#f7f5ef] p-3.5 text-xs leading-relaxed text-[#586575]">
                    <strong className="text-[#122438]">Client Note:</strong> {item.message}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-[#fbfaf6] border border-[#f0ede6] p-3">
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#8a929d]">
        <Icon size={14} /> {label}
      </div>
      <p className="mt-1 text-xs sm:text-sm font-semibold text-[#182536]">{value || 'N/A'}</p>
    </div>
  )
}

export default Appointments
