import { useEffect, useState } from 'react'
import { CalendarDays, Check, Clock3, Loader2, MapPin, Video, X } from 'lucide-react'
import { getAppointments, updateAppointmentStatus } from '../../services/api'

function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    try {
      setLoading(true)
      const response = await getAppointments()
      setAppointments(response?.data || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load appointments.')
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const changeStatus = async (id, status) => {
    try {
      await updateAppointmentStatus(id, status)
      await load()
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to update appointment.')
    }
  }

  return <div className="min-h-screen bg-[#eef1ef] p-5 text-[#122438] sm:p-8"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a77d2f]">Admin</p><h1 className="mt-2 text-3xl font-bold">Appointments</h1><p className="mt-1 text-sm text-[#687385]">Review requested online and in-person consultations.</p></div><button onClick={load} className="rounded-xl border border-[#d7d4cc] bg-white px-4 py-3 text-sm font-semibold">Refresh</button></div>
  {error && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
  {loading ? <div className="flex min-h-64 items-center justify-center"><Loader2 className="animate-spin"/></div> : <div className="mt-7 grid gap-5">{appointments.length === 0 ? <div className="rounded-2xl border border-[#dfddd6] bg-white p-10 text-center text-sm text-[#687385]">No appointment requests yet.</div> : appointments.map((item) => <div key={item.id} className="rounded-2xl border border-[#dfddd6] bg-white p-6 shadow-sm"><div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"><div><div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-[#eef1ef] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#516458]">{item.status}</span><span className="rounded-full bg-[#f2e8cf] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#876529]">{item.mode}</span></div><h2 className="mt-3 text-xl font-bold">{item.name}</h2><p className="mt-1 text-sm text-[#687385]">{item.phone}{item.email ? ` · ${item.email}` : ''}</p></div><div className="flex flex-wrap gap-2"><button onClick={() => changeStatus(item.id, 'confirmed')} className="inline-flex items-center gap-2 rounded-lg bg-[#2c5a4d] px-3 py-2 text-xs font-semibold text-white"><Check size={14}/> Confirm</button><button onClick={() => changeStatus(item.id, 'completed')} className="inline-flex items-center gap-2 rounded-lg bg-[#122438] px-3 py-2 text-xs font-semibold text-white"><Check size={14}/> Completed</button><button onClick={() => changeStatus(item.id, 'cancelled')} className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700"><X size={14}/> Cancel</button></div></div><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><Info Icon={CalendarDays} label="Date" value={item.appointment_date?.slice?.(0,10) || item.appointment_date}/><Info Icon={Clock3} label="Time" value={item.appointment_time}/><Info Icon={item.mode === 'online' ? Video : MapPin} label="Method" value={item.preferred_method}/><Info Icon={CalendarDays} label="Service" value={item.service}/></div>{item.message && <div className="mt-5 rounded-xl bg-[#f7f5ef] p-4 text-sm leading-6 text-[#586575]"><strong className="text-[#122438]">Message:</strong> {item.message}</div>}</div>)}</div>}
  </div></div>
}
function Info({Icon,label,value}){return <div className="rounded-xl bg-[#f7f5ef] p-4"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8a929d]"><Icon size={15}/>{label}</div><p className="mt-2 text-sm font-semibold text-[#2c3b4c]">{value}</p></div>}
export default Appointments
