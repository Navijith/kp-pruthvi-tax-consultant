const pool = require('../config/db')

const defaultProfile = {
  name: 'KP Pruthvi',
  practice_name: 'KP Tax Consultants',
  designation: 'Tax Consultant',
  experience: '5 years',
  experience_note: 'Subject to client confirmation',
  phone: '+91 70194 84928',
  whatsapp: '917019484928',
  email: 'pruthvigowda003@gmail.com',
  address: '144, 9th Cross, 2nd Phase, Sainagar, MS Palya, Vidyaranyapura Post, Bengaluru, Karnataka 560097',
  city: 'Bengaluru',
  state: 'Karnataka',
  pincode: '560097',
  country: 'India',
  hours: '6 days a week • 9:00 AM–8:00 PM',
  bio: 'Tax Consultant with 5 years of working experience, providing direct tax (Income Tax), indirect tax (GST and Excise Duty), compliance, accounting and company registration support.',
}

const getProfile = async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT id, name, designation, phone, whatsapp, email, address, city, state, pincode, country, latitude, longitude, bio, created_at, updated_at
       FROM profile
       ORDER BY created_at ASC
       LIMIT 1`
    )

    if (result.rows.length === 0) {
      return res.json({
        success: true,
        data: defaultProfile,
      })
    }

    const row = result.rows[0]
    return res.json({
      success: true,
      data: {
        ...defaultProfile,
        ...row,
      },
    })
  } catch (error) {
    // If DB has error, return default profile safely
    return res.json({
      success: true,
      data: defaultProfile,
    })
  }
}

const updateProfile = async (req, res, next) => {
  try {
    const { name, designation, phone, whatsapp, email, address, city, state, pincode, bio } = req.body

    const existing = await pool.query('SELECT id FROM profile LIMIT 1')
    let result

    if (existing.rows.length === 0) {
      result = await pool.query(
        `INSERT INTO profile (name, designation, phone, whatsapp, email, address, city, state, pincode, bio)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING *`,
        [name, designation, phone, whatsapp, email, address, city, state, pincode, bio]
      )
    } else {
      result = await pool.query(
        `UPDATE profile
         SET name = COALESCE($1, name),
             designation = COALESCE($2, designation),
             phone = COALESCE($3, phone),
             whatsapp = COALESCE($4, whatsapp),
             email = COALESCE($5, email),
             address = COALESCE($6, address),
             city = COALESCE($7, city),
             state = COALESCE($8, state),
             pincode = COALESCE($9, pincode),
             bio = COALESCE($10, bio),
             updated_at = NOW()
         WHERE id = $11
         RETURNING *`,
        [name, designation, phone, whatsapp, email, address, city, state, pincode, bio, existing.rows[0].id]
      )
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: result.rows[0],
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getProfile,
  updateProfile,
}
