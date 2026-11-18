import { useState, useEffect } from 'react'
import {
  Bell,
  CheckCheck,
  Check,
  Calendar,
  MessageSquare,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { getNotifications, markNotificationRead, markAllNotificationsRead } from '../../services/api'

function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadNotifications = async () => {
    try {
      setLoading(true)
      const res = await getNotifications()
      if (res?.success) {
        setNotifications(res.data || [])
        setUnreadCount(res.unread_count || 0)
      } else {
        setError('Failed to load notifications')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to retrieve notifications.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadNotifications()
  }, [])

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationRead(id)
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      )
      setUnreadCount((c) => Math.max(0, c - 1))
    } catch (err) {
      // Silently handle
    }
  }

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead()
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
      setUnreadCount(0)
    } catch (err) {
      alert('Failed to mark all as read.')
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case 'appointment':
        return <Calendar size={18} className="text-[#a77d2f]" />
      case 'enquiry':
        return <MessageSquare size={18} className="text-[#2c5a4d]" />
      default:
        return <AlertCircle size={18} className="text-blue-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#a77d2f]">
            Alerts & Activity
          </span>
          <h1 className="font-display mt-1 text-2xl sm:text-3xl font-bold text-[#122438]">
            Notifications Center
          </h1>
          <p className="text-xs sm:text-sm text-[#687385]">
            In-app alerts for new enquiries, requested consultations, and scheduled reminders.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#dedbd3] bg-white px-4 py-2.5 text-xs font-semibold text-[#122438] hover:bg-[#fbfaf6]"
          >
            <CheckCheck size={16} /> Mark All as Read
          </button>
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
          {error}
        </div>
      )}

      {/* Notifications List */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#122438]" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="rounded-2xl border border-[#dedbd3] bg-white p-12 text-center text-xs sm:text-sm text-[#8a94a2]">
          <Bell size={24} className="mx-auto mb-2 opacity-40" />
          No notifications recorded yet.
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`flex items-start justify-between gap-4 rounded-2xl border p-5 shadow-sm transition ${
                item.is_read
                  ? 'border-[#dedbd3] bg-white opacity-80'
                  : 'border-[#b89a58]/50 bg-[#fffdfa]'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f7f5ef]">
                  {getIcon(item.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#122438]">{item.title}</h3>
                    {!item.is_read && (
                      <span className="h-2 w-2 rounded-full bg-[#a77d2f]" />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-[#536071]">{item.message}</p>
                  <p className="mt-2 text-[10px] text-[#8a94a2]">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              {!item.is_read && (
                <button
                  onClick={() => handleMarkAsRead(item.id)}
                  title="Mark as read"
                  className="rounded-lg p-2 text-[#8a94a2] hover:bg-[#eef1ef] hover:text-[#122438]"
                >
                  <Check size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Notifications
