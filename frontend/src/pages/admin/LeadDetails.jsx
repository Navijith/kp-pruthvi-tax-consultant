import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Calendar,
  Send,
  Loader2,
  CheckCircle,
  FileText,
  User,
  PlusCircle,
} from 'lucide-react'
import { getLeadById, updateLead, addLeadNote, createFollowUp } from '../../services/api'

function LeadDetails() {
  const { id } = useParams()
  const [lead, setLead] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Form states
  const [noteContent, setNoteContent] = useState('')
  const [noteType, setNoteType] = useState('call')
  const [submittingNote, setSubmittingNote] = useState(false)

  const [followUpDate, setFollowUpDate] = useState('')
  const [followUpNotes, setFollowUpNotes] = useState('')
  const [submittingFollowUp, setSubmittingFollowUp] = useState(false)

  const fetchDetails = async () => {
    try {
      setLoading(true)
      const res = await getLeadById(id)
      if (res?.success) {
        setLead(res.data)
      } else {
        setError('Lead not found')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to retrieve lead details.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDetails()
  }, [id])

  const handleStatusChange = async (newStatus) => {
    try {
      await updateLead(id, { status: newStatus })
      setLead((prev) => ({ ...prev, status: newStatus }))
    } catch (err) {
      alert('Failed to update status')
    }
  }

  const handlePriorityChange = async (newPriority) => {
    try {
      await updateLead(id, { priority: newPriority })
      setLead((prev) => ({ ...prev, priority: newPriority }))
    } catch (err) {
      alert('Failed to update priority')
    }
  }

  const handleAddNote = async (e) => {
    e.preventDefault()
    if (!noteContent.trim()) return

    try {
      setSubmittingNote(true)
      await addLeadNote(id, {
        notes: noteContent.trim(),
        contact_type: noteType,
      })
      setNoteContent('')
      await fetchDetails()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to record note.')
    } finally {
      setSubmittingNote(false)
    }
  }

  const handleAddFollowUp = async (e) => {
    e.preventDefault()
    if (!followUpDate) return

    try {
      setSubmittingFollowUp(true)
      await createFollowUp({
        lead_id: id,
        scheduled_at: new Date(followUpDate).toISOString(),
        notes: followUpNotes.trim(),
      })
      setFollowUpDate('')
      setFollowUpNotes('')
      await fetchDetails()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to schedule follow-up.')
    } finally {
      setSubmittingFollowUp(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#122438]" />
      </div>
    )
  }

  if (error || !lead) {
    return (
      <div className="space-y-4">
        <Link to="/admin/leads" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#a77d2f]">
          <ArrowLeft size={16} /> Back to Leads
        </Link>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {error || 'Lead not found'}
        </div>
      </div>
    )
  }

  const cleanPhone = lead.phone ? lead.phone.replace(/[^0-9]/g, '') : ''

  return (
    <div className="space-y-8">
      {/* Header with back navigation */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/leads"
            className="rounded-xl border border-[#dedbd3] bg-white p-2.5 text-[#122438] hover:bg-[#fbfaf6]"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#122438]">{lead.name}</h1>
              <span className="rounded-md bg-[#eef1ef] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#2c5a4d]">
                {lead.source}
              </span>
            </div>
            <p className="text-xs text-[#687385]">
              Created on {new Date(lead.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Quick Contact Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {lead.phone && (
            <a
              href={`tel:${lead.phone}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#122438] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#20374e]"
            >
              <Phone size={14} /> Call
            </a>
          )}
          {cleanPhone && (
            <a
              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                `Hello ${lead.name}, this is KP Tax Consultants following up on your enquiry.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#2c5a4d] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#23483e]"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          )}
          {lead.email && (
            <a
              href={`mailto:${lead.email}?subject=KP Tax Consultants - Enquiry Follow-up`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#dedbd3] bg-white px-4 py-2.5 text-xs font-semibold text-[#122438] hover:bg-[#fbfaf6]"
            >
              <Mail size={14} /> Email
            </a>
          )}
        </div>
      </div>

      {/* Grid: Profile Details + Status Controls */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Contact Info Card */}
        <div className="rounded-2xl border border-[#dedbd3] bg-white p-6 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#a77d2f]">
            Client Information
          </h2>
          <div className="mt-4 space-y-3 text-xs sm:text-sm">
            <div>
              <p className="text-[11px] font-bold uppercase text-[#8a94a2]">Full Name</p>
              <p className="font-semibold text-[#122438]">{lead.name}</p>
            </div>
            {lead.company_name && (
              <div>
                <p className="text-[11px] font-bold uppercase text-[#8a94a2]">Company / Business</p>
                <p className="font-semibold text-[#122438]">{lead.company_name}</p>
              </div>
            )}
            <div>
              <p className="text-[11px] font-bold uppercase text-[#8a94a2]">Phone Number</p>
              <p className="font-semibold text-[#122438]">{lead.phone || 'None'}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase text-[#8a94a2]">Email Address</p>
              <p className="font-semibold text-[#122438]">{lead.email || 'None'}</p>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase text-[#8a94a2]">Lead Priority Score</p>
              <p className="font-bold text-[#a77d2f]">{lead.score || 50} / 100</p>
            </div>
          </div>
        </div>

        {/* Status & Priority Controls */}
        <div className="rounded-2xl border border-[#dedbd3] bg-white p-6 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#a77d2f]">
            Status & Priority
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#687385]">Current Status</label>
              <select
                value={lead.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-2.5 text-xs sm:text-sm font-semibold text-[#122438] outline-none focus:border-[#b89a58]"
              >
                <option value="new">New (Awaiting response)</option>
                <option value="contacted">Contacted (Spoke with client)</option>
                <option value="interested">Interested (Discussing scope)</option>
                <option value="client">Client (Converted / Ongoing)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[#687385]">Priority Level</label>
              <select
                value={lead.priority}
                onChange={(e) => handlePriorityChange(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-2.5 text-xs sm:text-sm font-semibold text-[#122438] outline-none focus:border-[#b89a58]"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>

            <div className="rounded-xl bg-[#f7f5ef] p-3 text-xs text-[#536071]">
              <p>Last Contacted: {lead.contacted_at ? new Date(lead.contacted_at).toLocaleDateString() : 'Not recorded yet'}</p>
            </div>
          </div>
        </div>

        {/* Schedule Next Follow-up */}
        <div className="rounded-2xl border border-[#dedbd3] bg-white p-6 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#a77d2f]">
            Schedule Follow-up
          </h2>
          <form onSubmit={handleAddFollowUp} className="mt-4 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#687385]">Date & Time</label>
              <input
                type="datetime-local"
                required
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-2.5 text-xs outline-none focus:border-[#b89a58]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#687385]">Reminder Note</label>
              <input
                type="text"
                placeholder="e.g. Call regarding ITR docs"
                value={followUpNotes}
                onChange={(e) => setFollowUpNotes(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-2.5 text-xs outline-none focus:border-[#b89a58]"
              />
            </div>
            <button
              type="submit"
              disabled={submittingFollowUp}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#122438] py-2.5 text-xs font-semibold text-white hover:bg-[#20374e]"
            >
              <Clock size={14} /> Schedule Task
            </button>
          </form>
        </div>
      </div>

      {/* Requirement / Message Details */}
      {lead.notes && (
        <div className="rounded-2xl border border-[#dedbd3] bg-white p-6 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#a77d2f]">
            Enquiry Requirements & Details
          </h2>
          <div className="mt-3 whitespace-pre-wrap rounded-xl bg-[#fbfaf6] p-4 text-xs sm:text-sm leading-relaxed text-[#334457]">
            {lead.notes}
          </div>
        </div>
      )}

      {/* Internal Notes & Contact History */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Record Internal Note */}
        <div className="rounded-2xl border border-[#dedbd3] bg-white p-6 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#a77d2f]">
            Add Internal Note / Activity
          </h2>
          <p className="mt-1 text-xs text-[#8a94a2]">
            Private consultant notes and record of client conversations.
          </p>

          <form onSubmit={handleAddNote} className="mt-4 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#687385]">Activity Type</label>
              <select
                value={noteType}
                onChange={(e) => setNoteType(e.target.value)}
                className="mt-1 w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-2.5 text-xs outline-none focus:border-[#b89a58]"
              >
                <option value="call">Phone Call</option>
                <option value="whatsapp">WhatsApp Discussion</option>
                <option value="email">Email Sent / Received</option>
                <option value="meeting">In-Person / Online Meeting</option>
                <option value="note">Internal Review Note</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#687385]">Details / Notes</label>
              <textarea
                required
                rows={3}
                placeholder="Record what was discussed with the client..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="mt-1 w-full resize-none rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-3 text-xs outline-none focus:border-[#b89a58]"
              />
            </div>

            <button
              type="submit"
              disabled={submittingNote}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#2c5a4d] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#23483e]"
            >
              <Send size={14} /> Record Activity
            </button>
          </form>
        </div>

        {/* Activity Timeline */}
        <div className="rounded-2xl border border-[#dedbd3] bg-white p-6 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#a77d2f]">
            Activity & Contact History
          </h2>
          <div className="mt-4 max-h-[360px] overflow-y-auto space-y-3 divide-y divide-[#f0ede6]">
            {(!lead.contact_history || lead.contact_history.length === 0) ? (
              <p className="py-8 text-center text-xs text-[#8a94a2]">No internal activities recorded yet.</p>
            ) : (
              lead.contact_history.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0">
                  <div className="flex items-center justify-between text-xs text-[#8a94a2]">
                    <span className="font-bold uppercase text-[#122438]">[{item.contact_type}]</span>
                    <span>{new Date(item.contacted_at).toLocaleString()}</span>
                  </div>
                  <p className="mt-1 text-xs text-[#334457]">{item.notes}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeadDetails
