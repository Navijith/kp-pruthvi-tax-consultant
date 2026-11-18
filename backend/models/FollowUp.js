const pool = require('../config/db')

const FollowUp = {
  async findAll({ status, filter } = {}) {
    let query = `
      SELECT
        f.id,
        f.lead_id,
        f.scheduled_at,
        f.status,
        f.notes,
        f.completed_at,
        f.created_at,
        f.updated_at,
        l.name AS lead_name,
        l.phone AS lead_phone,
        l.email AS lead_email,
        l.company_name AS lead_company
      FROM follow_ups f
      JOIN leads l ON f.lead_id = l.id
      WHERE 1=1
    `
    const params = []
    let idx = 1

    if (status && status !== 'all') {
      params.push(status)
      query += ` AND f.status = $${idx++}`
    }

    if (filter === 'overdue') {
      query += ` AND f.scheduled_at < NOW() AND f.status = 'pending'`
    } else if (filter === 'today') {
      query += ` AND DATE(f.scheduled_at) = CURRENT_DATE`
    } else if (filter === 'upcoming') {
      query += ` AND f.scheduled_at > NOW() AND f.status = 'pending'`
    }

    query += ` ORDER BY f.scheduled_at ASC`

    const result = await pool.query(query, params)
    return result.rows
  },

  async findById(id) {
    const result = await pool.query(
      `SELECT f.*, l.name AS lead_name, l.phone AS lead_phone
       FROM follow_ups f
       JOIN leads l ON f.lead_id = l.id
       WHERE f.id = $1`,
      [id]
    )
    return result.rows[0] || null
  },

  async create({ lead_id, scheduled_at, notes = '' }) {
    const result = await pool.query(
      `INSERT INTO follow_ups (lead_id, scheduled_at, status, notes)
       VALUES ($1, $2, 'pending', $3)
       RETURNING *`,
      [lead_id, scheduled_at, notes]
    )
    return result.rows[0]
  },

  async update(id, { status, notes, scheduled_at }) {
    const fields = []
    const values = []
    let idx = 1

    if (status !== undefined) {
      fields.push(`status = $${idx++}`)
      values.push(status)
      if (status === 'completed') {
        fields.push(`completed_at = NOW()`)
      }
    }
    if (notes !== undefined) {
      fields.push(`notes = $${idx++}`)
      values.push(notes)
    }
    if (scheduled_at !== undefined) {
      fields.push(`scheduled_at = $${idx++}`)
      values.push(scheduled_at)
    }

    if (fields.length === 0) return this.findById(id)

    fields.push(`updated_at = NOW()`)
    values.push(id)

    const result = await pool.query(
      `UPDATE follow_ups SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
      values
    )
    return result.rows[0] || null
  },
}

module.exports = FollowUp
