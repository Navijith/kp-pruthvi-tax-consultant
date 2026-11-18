const Notification = require('../models/Notification')

const getNotifications = async (req, res, next) => {
  try {
    const list = await Notification.findAll({ limit: 50 })
    const unreadCount = await Notification.getUnreadCount()

    return res.json({
      success: true,
      unread_count: unreadCount,
      count: list.length,
      data: list,
    })
  } catch (error) {
    next(error)
  }
}

const markAsRead = async (req, res, next) => {
  try {
    const updated = await Notification.markAsRead(req.params.id)
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found',
      })
    }
    return res.json({
      success: true,
      data: updated,
    })
  } catch (error) {
    next(error)
  }
}

const markAllAsRead = async (req, res, next) => {
  try {
    await Notification.markAllAsRead()
    return res.json({
      success: true,
      message: 'All notifications marked as read',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
}
