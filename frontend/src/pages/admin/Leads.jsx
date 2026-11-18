import { useState, useEffect } from 'react'
import { Loader2, Users, Download } from 'lucide-react'
import { getLeads, updateLead } from '../../services/api'
import LeadFilters from '../../components/leads/LeadFilters'
import LeadTable from '../../components/leads/LeadTable'
import LeadCard from '../../components/leads/LeadCard'

function Leads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [priority, setPriority] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const res = await getLeads({
        search: search.trim() || undefined,
        status: status !== 'all' ? status : undefined,
        priority: priority !== 'all' ? priority : undefined,
        sortBy,
      })
      if (res?.success) {
        setLeads(res.data || [])
      } else {
        setError('Failed to load leads')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to retrieve leads.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeads()
    }, 250)
    return () => clearTimeout(timer)
  }, [search, status, priority, sortBy])

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateLead(id, { status: newStatus })
      // Update local state smoothly
      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
      )
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update lead status.')
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#a77d2f]">
            Client Management
          </span>
          <h1 className="font-display mt-1 text-2xl sm:text-3xl font-bold text-[#122438]">
            Leads & Enquiries
          </h1>
          <p className="text-xs sm:text-sm text-[#687385]">
            Manage website enquiries, consultations, and prospective client records ({leads.length} found).
          </p>
        </div>

        <button
          onClick={fetchLeads}
          className="rounded-xl border border-[#dedbd3] bg-white px-4 py-2.5 text-xs font-semibold text-[#122438] hover:bg-[#fbfaf6]"
        >
          Refresh List
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="rounded-2xl border border-[#dedbd3] bg-white p-4 shadow-sm">
        <LeadFilters
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          priority={priority}
          onPriorityChange={setPriority}
          sortBy={sortBy}
          onSortByChange={setSortBy}
        />
      </div>

      {/* Leads Content */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#122438]" />
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <LeadTable leads={leads} onStatusChange={handleStatusChange} />
          </div>

          {/* Mobile Cards */}
          <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
            {leads.length === 0 ? (
              <div className="col-span-2 rounded-2xl border border-[#dedbd3] bg-white p-10 text-center text-xs text-[#8a94a2]">
                No leads match your criteria.
              </div>
            ) : (
              leads.map((lead) => (
                <LeadCard key={lead.id} lead={lead} onStatusChange={handleStatusChange} />
              ))
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Leads
