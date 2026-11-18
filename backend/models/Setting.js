const pool = require('../config/db')

const Setting = {
  async getByKey(key) {
    const result = await pool.query(
      `SELECT key, value, updated_at FROM settings WHERE key = $1`,
      [key]
    )
    return result.rows[0] ? result.rows[0].value : null
  },

  async setKey(key, value) {
    const result = await pool.query(
      `INSERT INTO settings (key, value, updated_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (key) DO UPDATE
       SET value = EXCLUDED.value, updated_at = NOW()
       RETURNING key, value, updated_at`,
      [key, JSON.stringify(value)]
    )
    return result.rows[0]
  },

  async getAll() {
    const result = await pool.query(
      `SELECT key, value, updated_at FROM settings`
    )
    const map = {}
    result.rows.forEach((row) => {
      map[row.key] = row.value
    })
    return map
  },
}

module.exports = Setting
