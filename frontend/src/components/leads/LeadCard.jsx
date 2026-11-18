import { Link } from 'react-router-dom'
import { Phone, MessageCircle, Mail, ChevronRight } from 'lucide-react'

function LeadCard({ lead, onStatusChange }) {
  const cleanPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, '') : ''

  return (
    <div className="rounded-2xl border border-[#dedbd3] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link to={`/admin/leads/${lead.id}`} className="text-base font-bold text-[#122438] hover:underline">
            {lead.name}
          </Link>
          {lead.company_name && (
            <p className="text-xs text-[#8a94a2]">{lead.company_name}</p>
          )}
          <p className="mt-1 text-xs text-[#536071]">{lead.phone}</p>
        </div>
        <select
          value={lead.status}
          onChange={(e) => onStatusChange(lead.id, e.target.value)}
          className="rounded-full border border-[#dedbd3] bg-[#fbfaf6] px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[#122438]"
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="interested">Interested</option>
          <option value="client">Client</option>
        </select>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[#f0ede6] pt-3 text-xs text-[#8a94a2]">
        <span>Source: <strong className="text-[#182536] uppercase">{lead.source}</strong></span>
        <div className="flex items-center gap-2">
          {cleanPhone && (
            <a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-[#e8efeb] p-1.5 text-[#2c5a4d]"
            >
              <MessageCircle size={14} />
            </a>
          )}
          <Link
            to={`/admin/leads/${lead.id}`}
            className="inline-flex items-center gap-1 font-bold text-[#122438]"
          >
            Details <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LeadCard
