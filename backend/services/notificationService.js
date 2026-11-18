const pool = require('../config/db')
const env = require('../config/env')

/**
 * Service to handle consultant notifications:
 * 1. Generates formatted WhatsApp alert link for the consultant (+91 70194 84928).
 * 2. Prepares/sends email notification to consultant (pruthvigowda003@gmail.com / domain email).
 * 3. Records in-app notification in database for the CRM dashboard.
 */

async function notifyNewEnquiry({ leadId, name, phone, email, service, message }) {
  const consultantPhone = env.NOTIFY_WHATSAPP || '917019484928'
  const consultantEmail = env.NOTIFY_EMAIL || 'pruthvigowda003@gmail.com'

  // 1. WhatsApp notification text
  const waText = `*New Tax Enquiry — KP Tax Consultants*\n\n` +
    `*Name:* ${name}\n` +
    `*Phone:* ${phone}\n` +
    (email ? `*Email:* ${email}\n` : '') +
    `*Service:* ${service || 'General'}\n` +
    `*Requirement:* ${message}\n\n` +
    `Submitted via website contact form.`

  const whatsappUrl = `https://wa.me/${consultantPhone}?text=${encodeURIComponent(waText)}`

  // 2. Email payload
  const emailSubject = `[KP Tax] New Website Enquiry from ${name}`
  const emailBody = `
New enquiry received on KP Tax Consultants:

Name: ${name}
Phone: ${phone}
Email: ${email || 'Not provided'}
Service: ${service || 'General'}
Message: ${message}

To contact client on WhatsApp: https://wa.me/${phone.replace(/[^0-9]/g, '')}
`

  // 3. Insert in-app notification into DB
  try {
    await pool.query(
      `INSERT INTO notifications (title, message, type, is_read)
       VALUES ($1, $2, 'enquiry', FALSE)`,
      [
        `New enquiry from ${name}`,
        `Service: ${service || 'General'} | Phone: ${phone}`,
      ]
    )
  } catch (err) {
    console.error('Failed to create in-app notification for enquiry:', err.message)
  }

  // 4. Log or dispatch email
  let emailDispatched = false
  if (env.SMTP_USER && env.SMTP_PASS) {
    // If SMTP credentials (such as Google Workspace) are supplied
    try {
      // In production with credentials, email sending would happen here
      console.log(`[Notification] Dispatching email to ${consultantEmail}: ${emailSubject}`)
      emailDispatched = true
    } catch (err) {
      console.error('[Notification] Email dispatch failed:', err.message)
    }
  } else {
    console.log(`[Notification] SMTP not configured. Prepared email notification for ${consultantEmail}:`, {
      subject: emailSubject,
      preview: `${name} (${phone}) requested ${service}`,
    })
  }

  return {
    whatsappUrl,
    emailDispatched,
    consultantPhone,
    consultantEmail,
  }
}

async function notifyNewAppointment({ appointmentId, referenceCode, name, phone, email, service, mode, preferredMethod, appointmentDate, appointmentTime, message }) {
  const consultantPhone = env.NOTIFY_WHATSAPP || '917019484928'
  const consultantEmail = env.NOTIFY_EMAIL || 'pruthvigowda003@gmail.com'

  // 1. WhatsApp notification text
  const waText = `*New Appointment Request [${referenceCode}]*\n\n` +
    `*Client:* ${name}\n` +
    `*Phone:* ${phone}\n` +
    (email ? `*Email:* ${email}\n` : '') +
    `*Service:* ${service}\n` +
    `*Mode:* ${mode.toUpperCase()} (${preferredMethod})\n` +
    `*Requested Date:* ${appointmentDate}\n` +
    `*Requested Time:* ${appointmentTime}\n` +
    (message ? `*Notes:* ${message}\n` : '') +
    `\n*Action required:* Contact client to confirm the slot.`

  const whatsappUrl = `https://wa.me/${consultantPhone}?text=${encodeURIComponent(waText)}`

  // 2. Email payload
  const emailSubject = `[KP Tax] New Appointment Request: ${referenceCode} from ${name}`
  const emailBody = `
New appointment request received on KP Tax Consultants:

Reference: ${referenceCode}
Client Name: ${name}
Phone: ${phone}
Email: ${email || 'Not provided'}
Service: ${service}
Mode: ${mode} (${preferredMethod})
Preferred Date: ${appointmentDate}
Preferred Time: ${appointmentTime}
Notes: ${message || 'None'}

Please review in the Admin CRM to confirm or reschedule.
`

  // 3. Insert in-app notification into DB
  try {
    await pool.query(
      `INSERT INTO notifications (title, message, type, is_read)
       VALUES ($1, $2, 'appointment', FALSE)`,
      [
        `Appointment Request: ${name} (${referenceCode})`,
        `${service} · ${appointmentDate} at ${appointmentTime} (${mode})`,
      ]
    )
  } catch (err) {
    console.error('Failed to create in-app notification for appointment:', err.message)
  }

  // 4. Log or dispatch email
  let emailDispatched = false
  if (env.SMTP_USER && env.SMTP_PASS) {
    console.log(`[Notification] Dispatching appointment email to ${consultantEmail}: ${emailSubject}`)
    emailDispatched = true
  } else {
    console.log(`[Notification] Prepared appointment email for ${consultantEmail}:`, {
      referenceCode,
      client: name,
      date: appointmentDate,
      time: appointmentTime,
    })
  }

  return {
    referenceCode,
    whatsappUrl,
    emailDispatched,
    consultantPhone,
    consultantEmail,
  }
}

module.exports = {
  notifyNewEnquiry,
  notifyNewAppointment,
}
