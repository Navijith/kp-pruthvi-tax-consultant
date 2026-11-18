const pool = require('../config/db')

const Lead = {
  async findAll({ search = '', status = '', priority = '', source = '', sortBy = 'newest' } = {}) {
    let query = `
      SELECT
        l.id,
        l.name,
        l.company_name,
        l.phone,
        l.email,
        l.source,
        l.status,
        l.priority,
        l.score,
        l.notes,
        l.contacted_at,
        l.created_at,
        l.updated_at
      FROM leads l
      WHERE 1=1
    `
    const params = []
    let paramIndex = 1

    if (search && search.trim()) {
      params.push(`%${search.trim().toLowerCase()}%`)
      query += ` AND (
        LOWER(l.name) LIKE $${paramIndex}
        OR LOWER(COALESCE(l.phone, '')) LIKE $${paramIndex}
        OR LOWER(COALESCE(l.email, '')) LIKE $${paramIndex}
        OR LOWER(COALESCE(l.company_name, '')) LIKE $${paramIndex}
      )`
      paramIndex++
    }

    if (status && status !== 'all') {
      params.push(status)
      query += ` AND l.status = $${paramIndex}`
      paramIndex++
    }

    if (priority && priority !== 'all') {
      params.push(priority)
      query += ` AND l.priority = $${paramIndex}`
      paramIndex++
    }

    if (source && source !== 'all') {
      params.push(source)
      query += ` AND l.source = $${paramIndex}`
      paramIndex++
    }

    if (sortBy === 'oldest') {
      query += ` ORDER BY l.created_at ASC`
    } else if (sortBy === 'priority') {
      query += ` ORDER BY CASE l.priority WHEN 'high' THEN 1 WHEN 'medium' THEN 2 ELSE 3 END, l.created_at DESC`
    } else if (sortBy === 'score') {
      query += ` ORDER BY l.score DESC, l.created_at DESC`
    } else {
      query += ` ORDER BY l.created_at DESC`
    }

    const result = await pool.query(query, params)
    return result.rows
  },

  async findById(id) {
    const leadResult = await pool.query(
      `SELECT id, name, company_name, phone, email, source, status, priority, score, notes, contacted_at, created_at, updated_at
       FROM leads
       WHERE id = $1`,
      [id]
    )
    if (leadResult.rows.length === 0) return null

    const lead = leadResult.rows[0]

    // Fetch contact history
    const historyResult = await pool.query(
      `SELECT id, lead_id, contact_type, notes, contacted_at
       FROM contact_history
       WHERE lead_id = $1
       ORDER BY contacted_at DESC`,
      [id]
    )
    lead.contact_history = historyResult.rows

    // Fetch follow ups
    const followUpsResult = await pool.query(
      `SELECT id, lead_id, scheduled_at, status, notes, completed_at, created_at
       FROM follow_ups
       WHERE lead_id = $1
       ORDER BY scheduled_at ASC`,
      [id]
    )
    lead.follow_ups = followUpsResult.rows

    // Fetch appointments if any
    const appointmentsResult = await pool.query(
      `SELECT id, reference_code, service, mode, preferred_method, appointment_date, appointment_time, status, created_at
       FROM appointments
       WHERE lead_id = $1
       ORDER BY appointment_date DESC`,
      [id]
    )
    lead.appointments = appointmentsResult.rows

    return lead
  },

  async create({ name, phone, email, source = 'website', status = 'new', priority = 'medium', score = 50, notes = '' }) {
    const result = await pool.query(
      `INSERT INTO leads (name, phone, email, source, status, priority, score, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [name.trim(), phone.trim(), email?.trim() || null, source, status, priority, score, notes]
    )
    return result.rows[0]
  },

  async update(id, { status, priority, notes }) {
    const fields = []
    const values = []
    let idx = 1

    if (status !== undefined) {
      fields.push(`status = $${idx++}`)
      values.push(status)
      if (status === 'contacted') {
        fields.push(`contacted_at = NOW()`)
      }
    }
    if (priority !== undefined) {
      fields.push(`priority = $${idx++}`)
      values.push(priority)
    }
    if (notes !== undefined) {
      fields.push(`notes = $${idx++}`)
      values.push(notes)
    }

    if (fields.length === 0) return this.findById(id)

    fields.push(`updated_at = NOW()`)
    values.push(id)

    const result = await pool.query(
      `UPDATE leads SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
      values
    )
    return result.rows[0] || null
  },

  async addContactHistory(leadId, { contact_type = 'note', notes = '' }) {
    const result = await pool.query(
      `INSERT INTO contact_history (lead_id, contact_type, notes, contacted_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING *`,
      [leadId, contact_type, notes]
    )
    // Update lead contacted_at
    await pool.query(
      `UPDATE leads SET contacted_at = NOW(), updated_at = NOW() WHERE id = $1`,
      [leadId]
    )
    return result.rows[0]
  },
}

module.exports = Lead
