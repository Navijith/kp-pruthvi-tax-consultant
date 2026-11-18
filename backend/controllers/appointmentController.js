const Appointment = require('../models/Appointment')
const { appointmentSchema, appointmentStatusSchema } = require('../utils/validators')
const { notifyNewAppointment } = require('../services/notificationService')

const requestAppointment = async (req, res, next) => {
  try {
    const validation = appointmentSchema.safeParse(req.body)
    if (!validation.success) {
      const issues = validation.error.issues || validation.error.errors || []
      const firstError = issues[0]?.message || 'Please check your inputs'
      return res.status(400).json({
        success: false,
        message: firstError,
        errors: issues,
      })
    }

    const data = validation.data

    // Generate unique, clean reference code
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase()
    const timestampPart = Date.now().toString(36).slice(-4).toUpperCase()
    const referenceCode = `KP-${timestampPart}${randomSuffix}`

    // Transactional creation of lead + appointment
    const { leadId, appointment } = await Appointment.createWithLead({
      ...data,
      referenceCode,
    })

    // Trigger consultant notification (Email & WhatsApp alert + in-app)
    const notificationResult = await notifyNewAppointment({
      appointmentId: appointment.id,
      referenceCode,
      name: data.name,
      phone: data.phone,
      email: data.email,
      service: data.service,
      mode: data.mode,
      preferredMethod: data.preferred_method,
      appointmentDate: data.appointment_date,
      appointmentTime: data.appointment_time,
      message: data.message,
    })

    return res.status(201).json({
      success: true,
      message: 'Appointment request received. The practice will review and contact you to confirm the time.',
      data: {
        id: appointment.id,
        reference_code: referenceCode,
        lead_id: leadId,
        name: appointment.name,
        service: appointment.service,
        mode: appointment.mode,
        preferred_method: appointment.preferred_method,
        appointment_date: appointment.appointment_date,
        appointment_time: appointment.appointment_time,
        status: appointment.status,
        whatsapp_direct_url: notificationResult.whatsappUrl,
      },
    })
  } catch (error) {
    next(error)
  }
}

const getAppointments = async (req, res, next) => {
  try {
    const { status, mode, date } = req.query
    const list = await Appointment.findAll({ status, mode, date })

    return res.json({
      success: true,
      count: list.length,
      data: list,
    })
  } catch (error) {
    next(error)
  }
}

const updateAppointmentStatus = async (req, res, next) => {
  try {
    const validation = appointmentStatusSchema.safeParse(req.body)
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid appointment status. Must be requested, confirmed, completed, or cancelled.',
      })
    }

    const { status } = validation.data
    const updated = await Appointment.updateStatus(req.params.id, status)

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      })
    }

    return res.json({
      success: true,
      message: `Appointment marked as ${status}`,
      data: updated,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  requestAppointment,
  getAppointments,
  updateAppointmentStatus,
}
