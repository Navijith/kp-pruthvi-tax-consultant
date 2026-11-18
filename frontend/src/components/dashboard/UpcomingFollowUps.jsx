import { Link } from 'react-router-dom'
import { ArrowRight, Clock3, AlertCircle } from 'lucide-react'

function UpcomingFollowUps({ tasks = [] }) {
  return (
    <div className="rounded-2xl border border-[#dedbd3] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-[#f0ede6] pb-4">
        <div>
          <h2 className="text-base font-bold text-[#122438]">Overdue & Due Tasks</h2>
          <p className="text-xs text-[#687385]">Follow-up calls or reminders requiring attention</p>
        </div>
        <Link to="/admin/follow-ups" className="inline-flex items-center gap-1 text-xs font-bold text-[#a77d2f] hover:underline">
          View all <ArrowRight size={14} />
        </Link>
      </div>

      <div className="mt-4 divide-y divide-[#f0ede6]">
        {tasks.length === 0 ? (
          <div className="py-6 text-center text-xs text-[#8a94a2]">
            <Clock3 size={20} className="mx-auto mb-2 opacity-40" />
            No overdue or pending follow-ups right now.
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="flex items-start justify-between py-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle size={16} className="mt-0.5 shrink-0 text-amber-600" />
                <div>
                  <Link to={`/admin/leads/${task.lead_id}`} className="text-sm font-bold text-[#122438] hover:underline">
                    {task.lead_name}
                  </Link>
                  <p className="text-xs text-[#687385]">{task.notes || 'Routine follow-up'}</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-red-700 bg-red-50 border border-red-200 rounded-md px-2 py-0.5 shrink-0">
                {task.scheduled_at?.slice(0, 10)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default UpcomingFollowUps
