require('dotenv').config()
const fs = require('fs')
const path = require('path')
const pool = require('../config/db')

async function runMigrations() {
  console.log('Starting KP Tax Consultants database migrations...')

  const migrationsDir = path.join(__dirname, '../../database/migrations')
  const seedDir = path.join(__dirname, '../../database/seed')

  const filesToRun = [
    path.join(migrationsDir, '001_initial_schema.sql'),
    path.join(migrationsDir, '002_appointments.sql'),
    path.join(seedDir, '002_kp_pruthvi_content.sql'),
  ]

  const client = await pool.connect()

  try {
    for (const filePath of filesToRun) {
      if (fs.existsSync(filePath)) {
        const sql = fs.readFileSync(filePath, 'utf-8')
        const fileName = path.basename(filePath)
        console.log(`Executing ${fileName}...`)
        await client.query(sql)
        console.log(`✓ Completed ${fileName}`)
      }
    }
    console.log('\nAll database migrations and seed scripts executed successfully.')
  } catch (error) {
    console.error('Migration error:', error.message)
    process.exitCode = 1
  } finally {
    client.release()
    await pool.end()
  }
}

if (require.main === module) {
  runMigrations()
}

module.exports = runMigrations
