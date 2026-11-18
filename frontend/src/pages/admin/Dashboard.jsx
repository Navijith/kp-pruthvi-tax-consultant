import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  CalendarDays,
  Clock3,
  UserCheck,
  TrendingUp,
  AlertTriangle,
  Loader2,
  ArrowRight,
  Phone,
  Video,
  CheckCircle,
} from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { getDashboardSummary } from '../../services/api'
import StatCard from '../../components/dashboard/StatCard'
import RecentLeads from '../../components/dashboard/RecentLeads'
import UpcomingFollowUps from '../../components/dashboard/UpcomingFollowUps'

function Dashboard() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadSummary = async () => {
    try {
      setLoading(true)
      const res = await getDashboardSummary()
      if (res?.success) {
        setData(res.data)
      } else {
        setError('Failed to load dashboard summary')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load dashboard data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSummary()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#122438]" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        <p className="font-bold">Error loading dashboard</p>
        <p className="mt-1">{error}</p>
        <button
          onClick={loadSummary}
          className="mt-4 rounded-xl bg-red-700 px-4 py-2 text-xs font-semibold text-white"
        >
          Try Again
        </button>
      </div>
    )
  }

  const chartData = [
    { name: 'New', count: data?.new_leads || 0 },
    { name: 'Contacted', count: data?.contacted_leads || 0 },
    { name: 'Interested', count: data?.interested_leads || 0 },
    { name: 'Converted', count: data?.converted_clients || 0 },
  ]

  return (
    <div className="space-y-8">
      {/* Header with quick shortcuts */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#a77d2f]">
            Internal Practice CRM
          </span>
          <h1 className="font-display mt-1 text-2xl sm:text-3xl font-bold text-[#122438]">
            Overview & Activity
          </h1>
          <p className="text-xs sm:text-sm text-[#687385]">
            Real-time status of enquiries, appointment requests, and follow-ups.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/admin/appointments"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#122438] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#20374e]"
          >
            <CalendarDays size={14} />
            View Appointments ({data?.pending_appointments || 0})
          </Link>
          <button
            onClick={loadSummary}
            className="rounded-xl border border-[#dedbd3] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#122438] hover:bg-[#fbfaf6]"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Top Statistic Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Leads"
          value={data?.total_leads || 0}
          icon={Users}
          color="navy"
          subtitle={`${data?.new_leads || 0} awaiting first contact`}
        />
        <StatCard
          title="Pending Appointments"
          value={data?.pending_appointments || 0}
          icon={CalendarDays}
          color="gold"
          subtitle="Requests to review & confirm"
        />
        <StatCard
          title="Converted Clients"
          value={data?.converted_clients || 0}
          icon={UserCheck}
          color="green"
          subtitle="Active tax & compliance clients"
        />
        <StatCard
          title="Due / Overdue Tasks"
          value={data?.overdue_follow_ups || 0}
          icon={AlertTriangle}
          color="amber"
          subtitle="Scheduled follow-up reminders"
        />
      </div>

      {/* Pipeline Chart & Quick Overview */}
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Pipeline Bar Chart */}
        <div className="rounded-2xl border border-[#dedbd3] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#f0ede6] pb-4">
            <div>
              <h2 className="text-base font-bold text-[#122438]">Lead Pipeline Status</h2>
              <p className="text-xs text-[#687385]">Conversion funnel from enquiry to client</p>
            </div>
            <TrendingUp size={18} className="text-[#a77d2f]" />
          </div>

          <div className="mt-6 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#687385' }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#687385' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#122438', color: '#fff', borderRadius: '8px', border: 'none' }}
                  itemStyle={{ color: '#e3c474' }}
                />
                <Bar dataKey="count" fill="#122438" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Upcoming Confirmed / Requested Appointments */}
        <div className="rounded-2xl border border-[#dedbd3] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#f0ede6] pb-4">
            <div>
              <h2 className="text-base font-bold text-[#122438]">Upcoming Appointments</h2>
              <p className="text-xs text-[#687385]">Scheduled client consultations</p>
            </div>
            <Link to="/admin/appointments" className="text-xs font-bold text-[#a77d2f] hover:underline">
              View all
            </Link>
          </div>

          <div className="mt-4 divide-y divide-[#f0ede6]">
            {data?.upcoming_appointments?.length === 0 ? (
              <p className="py-8 text-center text-xs text-[#8a94a2]">
                No upcoming appointments scheduled.
              </p>
            ) : (
              data?.upcoming_appointments?.map((app) => (
                <div key={app.id} className="py-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-[#122438]">{app.name}</p>
                      <p className="text-xs text-[#687385]">{app.service}</p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        app.status === 'confirmed'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-3 text-xs text-[#536071]">
                    <span className="flex items-center gap-1">
                      <Clock3 size={13} /> {app.appointment_date?.slice(0, 10)} at {app.appointment_time}
                    </span>
                    <span className="uppercase font-semibold">({app.mode})</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Leads & Follow-ups */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentLeads leads={data?.recent_leads || []} />
        <UpcomingFollowUps tasks={data?.overdue_tasks || []} />
      </div>
    </div>
  )
}

export default Dashboard
