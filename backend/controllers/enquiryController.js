const Lead = require('../models/Lead')
const { enquirySchema } = require('../utils/validators')
const { calculateLeadScore } = require('../services/leadScoring')
const { notifyNewEnquiry } = require('../services/notificationService')

const submitEnquiry = async (req, res, next) => {
  try {
    const validation = enquirySchema.safeParse(req.body)
    if (!validation.success) {
      const issues = validation.error.issues || validation.error.errors || []
      const firstError = issues[0]?.message || 'Please check your inputs'
      return res.status(400).json({
        success: false,
        message: firstError,
        errors: issues,
      })
    }

    const { name, phone, email, service, message } = validation.data
    const { score, priority } = calculateLeadScore({ service, message })

    const formattedNotes = `Requested Service: ${service || 'General Enquiry'}\n\nClient Message:\n${message.trim()}`

    const lead = await Lead.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || null,
      source: 'website',
      status: 'new',
      priority,
      score,
      notes: formattedNotes,
    })

    // Trigger consultant notification (Email & WhatsApp + in-app)
    const notificationResult = await notifyNewEnquiry({
      leadId: lead.id,
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      service,
      message,
    })

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been received. KP Tax Consultants will review and get in touch with you shortly.',
      data: {
        id: lead.id,
        name: lead.name,
        created_at: lead.created_at,
        whatsapp_direct_url: notificationResult.whatsappUrl,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  submitEnquiry,
}
