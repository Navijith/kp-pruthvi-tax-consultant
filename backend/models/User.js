const pool = require('../config/db')

const User = {
  async findByEmail(email) {
    const result = await pool.query(
      `SELECT id, full_name, email, password_hash, role, is_active, created_at, updated_at
       FROM users
       WHERE LOWER(email) = LOWER($1)
       LIMIT 1`,
      [email.trim()]
    )
    return result.rows[0] || null
  },

  async findById(id) {
    const result = await pool.query(
      `SELECT id, full_name, email, role, is_active, created_at, updated_at
       FROM users
       WHERE id = $1
       LIMIT 1`,
      [id]
    )
    return result.rows[0] || null
  },

  async create({ fullName, email, passwordHash, role = 'admin' }) {
    const result = await pool.query(
      `INSERT INTO users (full_name, email, password_hash, role, is_active)
       VALUES ($1, $2, $3, $4, TRUE)
       RETURNING id, full_name, email, role, is_active, created_at`,
      [fullName.trim(), email.toLowerCase().trim(), passwordHash, role]
    )
    return result.rows[0]
  },
}

module.exports = User
