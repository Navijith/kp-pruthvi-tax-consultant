const pool = require('../config/db')

const Appointment = {
  async findAll({ status, mode, date } = {}) {
    let query = `
      SELECT
        a.id,
        a.lead_id,
        a.reference_code,
        a.name,
        a.phone,
        a.email,
        a.service,
        a.mode,
        a.preferred_method,
        a.appointment_date,
        a.appointment_time,
        a.duration_minutes,
        a.message,
        a.status,
        a.created_at,
        a.updated_at
      FROM appointments a
      WHERE 1=1
    `
    const params = []
    let idx = 1

    if (status && status !== 'all') {
      params.push(status)
      query += ` AND a.status = $${idx++}`
    }

    if (mode && mode !== 'all') {
      params.push(mode)
      query += ` AND a.mode = $${idx++}`
    }

    if (date) {
      params.push(date)
      query += ` AND a.appointment_date = $${idx++}`
    }

    query += ` ORDER BY a.appointment_date DESC, a.appointment_time ASC, a.created_at DESC`

    const result = await pool.query(query, params)
    return result.rows
  },

  async findById(id) {
    const result = await pool.query(
      `SELECT * FROM appointments WHERE id = $1`,
      [id]
    )
    return result.rows[0] || null
  },

  async findByReferenceCode(referenceCode) {
    const result = await pool.query(
      `SELECT * FROM appointments WHERE reference_code = $1`,
      [referenceCode]
    )
    return result.rows[0] || null
  },

  /**
   * Transactional appointment booking:
   * Inserts lead + appointment in single transaction.
   * Rolls back if either fails.
   */
  async createWithLead({
    name,
    phone,
    email,
    service,
    mode,
    preferred_method,
    appointment_date,
    appointment_time,
    duration_minutes = 15,
    message,
    referenceCode,
  }) {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')

      // Insert Lead
      const leadNotes = `Appointment requested: ${service}\nMode: ${mode} (${preferred_method})\nPreferred: ${appointment_date} at ${appointment_time}\n${message ? `Notes: ${message}` : ''}`
      const leadRes = await client.query(
        `INSERT INTO leads (name, phone, email, source, status, priority, score, notes)
         VALUES ($1, $2, $3, 'appointment', 'new', 'high', 85, $4)
         RETURNING id`,
        [name.trim(), phone.trim(), email?.trim() || null, leadNotes]
      )
      const leadId = leadRes.rows[0].id

      // Insert Appointment
      const apptRes = await client.query(
        `INSERT INTO appointments (
           lead_id, reference_code, name, phone, email, service, mode,
           preferred_method, appointment_date, appointment_time,
           duration_minutes, message, status
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'requested')
         RETURNING id, reference_code, name, phone, email, service, mode, preferred_method,
                   appointment_date, appointment_time, duration_minutes, status, created_at`,
        [
          leadId,
          referenceCode,
          name.trim(),
          phone.trim(),
          email?.trim() || null,
          service.trim(),
          mode,
          preferred_method.trim(),
          appointment_date,
          appointment_time,
          Number(duration_minutes) || 15,
          message?.trim() || null,
        ]
      )

      await client.query('COMMIT')
      return { leadId, appointment: apptRes.rows[0] }
    } catch (error) {
      await client.query('ROLLBACK')
      throw error
    } finally {
      client.release()
    }
  },

  async updateStatus(id, status) {
    const result = await pool.query(
      `UPDATE appointments
       SET status = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING *`,
      [status, id]
    )
    return result.rows[0] || null
  },
}

module.exports = Appointment
