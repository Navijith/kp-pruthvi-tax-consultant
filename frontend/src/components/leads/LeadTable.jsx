import { Link } from 'react-router-dom'
import { Phone, MessageCircle, Mail, Eye, ChevronRight } from 'lucide-react'

const statusClasses = {
  new: 'bg-blue-50 text-blue-700 border-blue-200',
  contacted: 'bg-amber-50 text-amber-700 border-amber-200',
  interested: 'bg-purple-50 text-purple-700 border-purple-200',
  client: 'bg-emerald-50 text-emerald-700 border-emerald-200',
}

const priorityClasses = {
  high: 'bg-red-50 text-red-700 border-red-200',
  medium: 'bg-orange-50 text-orange-700 border-orange-200',
  low: 'bg-gray-50 text-gray-700 border-gray-200',
}

function LeadTable({ leads = [], onStatusChange }) {
  if (leads.length === 0) {
    return (
      <div className="rounded-2xl border border-[#dedbd3] bg-white p-12 text-center text-sm text-[#8a94a2]">
        No leads match the selected criteria.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#dedbd3] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead className="border-b border-[#dedbd3] bg-[#fbfaf6] text-xs font-bold uppercase tracking-wider text-[#687385]">
            <tr>
              <th className="px-5 py-4">Client / Business</th>
              <th className="px-4 py-4">Contact</th>
              <th className="px-4 py-4">Source</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Priority</th>
              <th className="px-4 py-4">Received</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0ede6]">
            {leads.map((lead) => {
              const cleanPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, '') : ''
              return (
                <tr key={lead.id} className="transition hover:bg-[#fbfaf6]/70">
                  <td className="px-5 py-4 font-semibold text-[#122438]">
                    <Link to={`/admin/leads/${lead.id}`} className="hover:underline">
                      {lead.name}
                    </Link>
                    {lead.company_name && (
                      <p className="text-xs text-[#8a94a2]">{lead.company_name}</p>
                    )}
                  </td>

                  <td className="px-4 py-4 text-xs text-[#536071]">
                    <p className="font-medium text-[#182536]">{lead.phone}</p>
                    {lead.email && <p className="truncate max-w-[150px]">{lead.email}</p>}
                  </td>

                  <td className="px-4 py-4 text-xs">
                    <span className="rounded-md bg-[#f7f5ef] px-2 py-1 font-semibold uppercase text-[#687385]">
                      {lead.source}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <select
                      value={lead.status}
                      onChange={(e) => onStatusChange(lead.id, e.target.value)}
                      className={`cursor-pointer rounded-full border px-2.5 py-1 text-xs font-bold uppercase tracking-wider outline-none ${
                        statusClasses[lead.status] || 'bg-gray-50 text-gray-700'
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="interested">Interested</option>
                      <option value="client">Client</option>
                    </select>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        priorityClasses[lead.priority] || 'bg-gray-50 text-gray-700'
                      }`}
                    >
                      {lead.priority}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-xs text-[#8a94a2]">
                    {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : 'N/A'}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {lead.phone && (
                        <a
                          href={`tel:${lead.phone}`}
                          title="Call Lead"
                          className="rounded-lg p-1.5 text-[#687385] hover:bg-[#eef1ef] hover:text-[#122438]"
                        >
                          <Phone size={15} />
                        </a>
                      )}
                      {cleanPhone && (
                        <a
                          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                            `Hello ${lead.name}, thank you for contacting KP Tax Consultants.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          title="WhatsApp Lead"
                          className="rounded-lg p-1.5 text-[#2c5a4d] hover:bg-[#e8efeb]"
                        >
                          <MessageCircle size={15} />
                        </a>
                      )}
                      {lead.email && (
                        <a
                          href={`mailto:${lead.email}?subject=KP Tax Consultants - Enquiry Follow-up`}
                          title="Email Lead"
                          className="rounded-lg p-1.5 text-[#687385] hover:bg-[#eef1ef] hover:text-[#122438]"
                        >
                          <Mail size={15} />
                        </a>
                      )}
                      <Link
                        to={`/admin/leads/${lead.id}`}
                        title="View Details"
                        className="rounded-lg p-1.5 text-[#122438] hover:bg-[#f2e8cf]"
                      >
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LeadTable
