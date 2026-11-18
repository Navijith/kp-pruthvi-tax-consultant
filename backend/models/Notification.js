const pool = require('../config/db')

const Notification = {
  async findAll({ limit = 50 } = {}) {
    const result = await pool.query(
      `SELECT id, user_id, title, message, type, is_read, created_at
       FROM notifications
       ORDER BY created_at DESC
       LIMIT $1`,
      [limit]
    )
    return result.rows
  },

  async getUnreadCount() {
    const result = await pool.query(
      `SELECT COUNT(*) AS unread_count FROM notifications WHERE is_read = FALSE`
    )
    return parseInt(result.rows[0].unread_count, 10) || 0
  },

  async markAsRead(id) {
    const result = await pool.query(
      `UPDATE notifications SET is_read = TRUE WHERE id = $1 RETURNING *`,
      [id]
    )
    return result.rows[0] || null
  },

  async markAllAsRead() {
    await pool.query(`UPDATE notifications SET is_read = TRUE WHERE is_read = FALSE`)
    return true
  },

  async create({ title, message, type = 'info', user_id = null }) {
    const result = await pool.query(
      `INSERT INTO notifications (user_id, title, message, type, is_read)
       VALUES ($1, $2, $3, $4, FALSE)
       RETURNING *`,
      [user_id, title, message, type]
    )
    return result.rows[0]
  },
}

module.exports = Notification
