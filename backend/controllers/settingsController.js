const Setting = require('../models/Setting')
const { settingsSchema } = require('../utils/validators')

const defaultSettings = {
  business_name: 'KP Tax Consultants',
  consultant_name: 'KP Pruthvi',
  designation: 'Tax Consultant',
  experience: '5 years',
  experience_confirmation_needed: true,
  phone: '+91 70194 84928',
  whatsapp: '917019484928',
  email: 'pruthvigowda003@gmail.com',
  address: '144, 9th Cross, 2nd Phase, Sainagar, MS Palya, Vidyaranyapura Post, Bengaluru, Karnataka 560097',
  city: 'Bengaluru',
  state: 'Karnataka',
  pincode: '560097',
  working_hours: '6 days a week • 9:00 AM–8:00 PM',
  consultation_modes: ['in-person', 'online'],
  online_platforms: ['Google Meet', 'Zoom', 'WhatsApp', 'Phone'],
  notification_email: 'pruthvigowda003@gmail.com',
  notification_whatsapp: '+91 70194 84928',
  google_workspace_ready: true,
}

const getSettings = async (req, res, next) => {
  try {
    const dbSettings = await Setting.getAll()
    const merged = {
      ...defaultSettings,
      ...dbSettings,
    }
    return res.json({
      success: true,
      data: merged,
    })
  } catch (error) {
    return res.json({
      success: true,
      data: defaultSettings,
    })
  }
}

const updateSettings = async (req, res, next) => {
  try {
    const validation = settingsSchema.safeParse(req.body)
    if (!validation.success) {
      const issues = validation.error.issues || validation.error.errors || []
      return res.status(400).json({
        success: false,
        message: 'Invalid settings format',
        errors: issues,
      })
    }

    const updates = validation.data
    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) {
        await Setting.setKey(key, value)
      }
    }

    const updatedSettings = await Setting.getAll()
    return res.json({
      success: true,
      message: 'Settings updated successfully',
      data: {
        ...defaultSettings,
        ...updatedSettings,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getSettings,
  updateSettings,
}
