require('dotenv').config()

const bcrypt = require('bcryptjs')
const pool = require('../config/db')

const ADMIN_NAME = 'KP PRUTHVI'
const ADMIN_EMAIL = 'admin@kppruthvi.com'

async function createAdmin() {
  try {
    const password = process.env.ADMIN_PASSWORD

    if (!password) {
      throw new Error(
        'ADMIN_PASSWORD is missing from backend/.env'
      )
    }

    if (password.length < 8) {
      throw new Error(
        'ADMIN_PASSWORD must be at least 8 characters long'
      )
    }

    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [ADMIN_EMAIL]
    )

    if (existingUser.rows.length > 0) {
      console.log('Admin account already exists.')
      return
    }

    const passwordHash = await bcrypt.hash(password, 12)

    await pool.query(
      `
      INSERT INTO users (
        full_name,
        email,
        password_hash,
        role,
        is_active
      )
      VALUES ($1, $2, $3, $4, $5)
      `,
      [
        ADMIN_NAME,
        ADMIN_EMAIL,
        passwordHash,
        'admin',
        true,
      ]
    )

    console.log('')
    console.log('======================================')
    console.log('       ADMIN ACCOUNT CREATED')
    console.log('======================================')
    console.log(`Email: ${ADMIN_EMAIL}`)
    console.log('Password: stored securely as a hash')
    console.log('======================================')
    console.log('')
  } catch (error) {
    console.error('Failed to create admin:', error.message)
    process.exitCode = 1
  } finally {
    await pool.end()
  }
}

createAdmin()