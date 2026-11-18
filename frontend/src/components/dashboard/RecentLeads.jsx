import { Link } from 'react-router-dom'
import { ArrowRight, User } from 'lucide-react'

function RecentLeads({ leads = [] }) {
  const statusColors = {
    new: 'bg-blue-50 text-blue-700 border-blue-200',
    contacted: 'bg-amber-50 text-amber-700 border-amber-200',
    interested: 'bg-purple-50 text-purple-700 border-purple-200',
    client: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  }

  return (
    <div className="rounded-2xl border border-[#dedbd3] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-[#f0ede6] pb-4">
        <div>
          <h2 className="text-base font-bold text-[#122438]">Recent Enquiries</h2>
          <p className="text-xs text-[#687385]">Latest client contacts received from the website</p>
        </div>
        <Link to="/admin/leads" className="inline-flex items-center gap-1 text-xs font-bold text-[#a77d2f] hover:underline">
          View all <ArrowRight size={14} />
        </Link>
      </div>

      <div className="mt-4 divide-y divide-[#f0ede6]">
        {leads.length === 0 ? (
          <p className="py-6 text-center text-xs text-[#8a94a2]">No enquiries recorded yet.</p>
        ) : (
          leads.map((lead) => (
            <div key={lead.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f7f5ef] text-[#122438]">
                  <User size={16} />
                </div>
                <div>
                  <Link to={`/admin/leads/${lead.id}`} className="text-sm font-bold text-[#122438] hover:underline">
                    {lead.name}
                  </Link>
                  <p className="text-xs text-[#687385]">{lead.phone} {lead.email ? `· ${lead.email}` : ''}</p>
                </div>
              </div>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  statusColors[lead.status] || 'bg-gray-50 text-gray-700 border-gray-200'
                }`}
              >
                {lead.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default RecentLeads
