import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Clock3,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Plus,
  Loader2,
  User,
  Phone,
  MessageCircle,
} from 'lucide-react'
import { getFollowUps, createFollowUp, updateFollowUp, getLeads } from '../../services/api'

function FollowUps() {
  const [tasks, setTasks] = useState([])
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('all') // 'all', 'overdue', 'today', 'upcoming', 'completed'

  // Modal / form states
  const [showModal, setShowModal] = useState(false)
  const [leadId, setLeadId] = useState('')
  const [scheduledAt, setScheduledAt] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)
      const [followRes, leadsRes] = await Promise.all([
        getFollowUps({ filter: activeTab !== 'all' && activeTab !== 'completed' ? activeTab : undefined }),
        getLeads({ limit: 100 }),
      ])
      setTasks(followRes?.data || [])
      setLeads(leadsRes?.data || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load follow-up tasks.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [activeTab])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!leadId || !scheduledAt) return

    try {
      setSubmitting(true)
      await createFollowUp({
        lead_id: leadId,
        scheduled_at: new Date(scheduledAt).toISOString(),
        notes: notes.trim(),
      })
      setShowModal(false)
      setLeadId('')
      setScheduledAt('')
      setNotes('')
      await loadData()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create follow-up task.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleComplete = async (id) => {
    try {
      await updateFollowUp(id, { status: 'completed' })
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: 'completed' } : t))
      )
    } catch (err) {
      alert('Failed to mark task completed.')
    }
  }

  const filteredTasks = tasks.filter((t) => {
    if (activeTab === 'completed') return t.status === 'completed'
    if (activeTab === 'overdue') return t.status === 'pending' && new Date(t.scheduled_at) < new Date()
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#a77d2f]">
            Task Management
          </span>
          <h1 className="font-display mt-1 text-2xl sm:text-3xl font-bold text-[#122438]">
            Follow-ups & Reminders
          </h1>
          <p className="text-xs sm:text-sm text-[#687385]">
            Keep track of client calls, document requests, and scheduled deadlines.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#122438] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#20374e]"
        >
          <Plus size={16} /> Schedule Follow-up
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#dedbd3] pb-3 text-xs font-semibold">
        {[
          ['all', 'All Tasks'],
          ['overdue', 'Overdue'],
          ['today', "Today's Tasks"],
          ['upcoming', 'Upcoming'],
          ['completed', 'Completed'],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`rounded-xl px-4 py-2 transition ${
              activeTab === key
                ? 'bg-[#122438] text-white'
                : 'bg-white text-[#687385] hover:bg-[#fbfaf6] border border-[#dedbd3]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
          {error}
        </div>
      )}

      {/* Task List */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#122438]" />
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="rounded-2xl border border-[#dedbd3] bg-white p-12 text-center text-xs sm:text-sm text-[#8a94a2]">
          No follow-up tasks found for this view.
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredTasks.map((task) => {
            const isOverdue = task.status === 'pending' && new Date(task.scheduled_at) < new Date()
            const isDone = task.status === 'completed'
            const cleanPhone = task.lead_phone ? task.lead_phone.replace(/[^0-9]/g, '') : ''

            return (
              <div
                key={task.id}
                className={`flex flex-col justify-between gap-4 rounded-2xl border p-5 shadow-sm sm:flex-row sm:items-center ${
                  isOverdue
                    ? 'border-red-200 bg-red-50/20'
                    : isDone
                    ? 'border-[#dedbd3] bg-[#fbfaf6] opacity-75'
                    : 'border-[#dedbd3] bg-white'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      isDone
                        ? 'bg-emerald-100 text-emerald-800'
                        : isOverdue
                        ? 'bg-red-100 text-red-800'
                        : 'bg-[#f2e8cf] text-[#a77d2f]'
                    }`}
                  >
                    {isDone ? <CheckCircle2 size={20} /> : <Clock3 size={20} />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/admin/leads/${task.lead_id}`}
                        className="text-base font-bold text-[#122438] hover:underline"
                      >
                        {task.lead_name}
                      </Link>
                      {isOverdue && (
                        <span className="rounded-md bg-red-100 px-2 py-0.5 text-[10px] font-bold uppercase text-red-800">
                          Overdue
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-[#536071]">
                      {task.notes || 'Routine follow-up task'}
                    </p>
                    <p className="mt-2 text-[11px] font-semibold text-[#8a94a2]">
                      Scheduled: {new Date(task.scheduled_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:self-center">
                  {cleanPhone && (
                    <a
                      href={`https://wa.me/${cleanPhone}`}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg bg-[#e8efeb] p-2 text-[#2c5a4d] hover:bg-[#d8e5dd]"
                      title="WhatsApp Lead"
                    >
                      <MessageCircle size={15} />
                    </a>
                  )}
                  {task.lead_phone && (
                    <a
                      href={`tel:${task.lead_phone}`}
                      className="rounded-lg border border-[#dedbd3] p-2 text-[#687385] hover:bg-[#f7f5ef]"
                      title="Call Lead"
                    >
                      <Phone size={15} />
                    </a>
                  )}
                  {!isDone && (
                    <button
                      onClick={() => handleComplete(task.id)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#2c5a4d] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#22473d]"
                    >
                      <CheckCircle2 size={14} /> Mark Completed
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-md rounded-3xl border border-[#dedbd3] bg-white p-6 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-[#122438]">
              Schedule Client Follow-up
            </h3>
            <p className="text-xs text-[#687385]">
              Select an existing lead and set a reminder date and note.
            </p>

            <form onSubmit={handleCreate} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#334457]">
                  Associated Lead
                </label>
                <select
                  required
                  value={leadId}
                  onChange={(e) => setLeadId(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-2.5 text-xs sm:text-sm outline-none focus:border-[#b89a58]"
                >
                  <option value="">Select a lead</option>
                  {leads.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name} ({l.phone || l.email || 'No phone'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#334457]">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  required
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-2.5 text-xs sm:text-sm outline-none focus:border-[#b89a58]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#334457]">
                  Follow-up Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Call regarding missing form 16, discuss ITR filing."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 w-full resize-none rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-2.5 text-xs sm:text-sm outline-none focus:border-[#b89a58]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-[#dedbd3] px-4 py-2.5 text-xs font-semibold text-[#687385]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-[#122438] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#20374e]"
                >
                  {submitting ? 'Saving...' : 'Save Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default FollowUps
