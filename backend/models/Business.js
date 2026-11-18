const pool = require('../config/db')

const Business = {
  async findAll({ limit = 50 } = {}) {
    const result = await pool.query(
      `SELECT id, business_name, category, phone, email, website, address, city, state, pincode, latitude, longitude, created_at
       FROM businesses
       ORDER BY created_at DESC
       LIMIT $1`,
      [limit]
    )
    return result.rows
  },

  async findById(id) {
    const result = await pool.query(
      `SELECT * FROM businesses WHERE id = $1`,
      [id]
    )
    return result.rows[0] || null
  },
}

module.exports = Business
