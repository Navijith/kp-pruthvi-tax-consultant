import { Search } from 'lucide-react'

function LeadFilters({ search, onSearchChange, status, onStatusChange, priority, onPriorityChange, sortBy, onSortByChange }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {/* Search Input */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a94a2]" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, phone, email..."
          className="w-full rounded-xl border border-[#dedbd3] bg-white py-2.5 pl-10 pr-4 text-xs sm:text-sm text-[#182536] outline-none focus:border-[#b89a58] focus:ring-2 focus:ring-[#b89a58]/20"
        />
      </div>

      {/* Status Filter */}
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="rounded-xl border border-[#dedbd3] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#182536] outline-none focus:border-[#b89a58]"
      >
        <option value="all">All Statuses</option>
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="interested">Interested</option>
        <option value="client">Client (Converted)</option>
      </select>

      {/* Priority Filter */}
      <select
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value)}
        className="rounded-xl border border-[#dedbd3] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#182536] outline-none focus:border-[#b89a58]"
      >
        <option value="all">All Priorities</option>
        <option value="high">High Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="low">Low Priority</option>
      </select>

      {/* Sort By */}
      <select
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value)}
        className="rounded-xl border border-[#dedbd3] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#182536] outline-none focus:border-[#b89a58]"
      >
        <option value="newest">Sort by: Newest First</option>
        <option value="oldest">Sort by: Oldest First</option>
        <option value="priority">Sort by: Priority</option>
        <option value="score">Sort by: Lead Score</option>
      </select>
    </div>
  )
}

export default LeadFilters
