const pool = require('../config/db')

const getDashboardSummary = async (req, res, next) => {
  try {
    // 1. Leads counts
    const leadsResult = await pool.query(`
      SELECT
        COUNT(*) AS total_leads,
        COUNT(*) FILTER (WHERE status = 'new') AS new_leads,
        COUNT(*) FILTER (WHERE status = 'contacted') AS contacted_leads,
        COUNT(*) FILTER (WHERE status = 'interested') AS interested_leads,
        COUNT(*) FILTER (WHERE status = 'client') AS converted_clients
      FROM leads
    `)

    // 2. Appointments counts
    const appointmentsResult = await pool.query(`
      SELECT
        COUNT(*) AS total_appointments,
        COUNT(*) FILTER (WHERE status = 'requested') AS pending_appointments,
        COUNT(*) FILTER (WHERE status = 'confirmed') AS confirmed_appointments,
        COUNT(*) FILTER (WHERE status = 'completed') AS completed_appointments
      FROM appointments
    `)

    // 3. Follow-ups counts
    const followUpsResult = await pool.query(`
      SELECT
        COUNT(*) FILTER (WHERE status = 'pending' AND scheduled_at >= NOW()) AS upcoming_follow_ups,
        COUNT(*) FILTER (WHERE status = 'pending' AND scheduled_at < NOW()) AS overdue_follow_ups
      FROM follow_ups
    `)

    // 4. Recent leads (last 5)
    const recentLeadsResult = await pool.query(`
      SELECT id, name, company_name, phone, email, source, status, priority, created_at
      FROM leads
      ORDER BY created_at DESC
      LIMIT 5
    `)

    // 5. Upcoming appointments (next 5)
    const upcomingAppointmentsResult = await pool.query(`
      SELECT id, reference_code, name, phone, service, mode, appointment_date, appointment_time, status
      FROM appointments
      WHERE status IN ('requested', 'confirmed') AND appointment_date >= CURRENT_DATE
      ORDER BY appointment_date ASC, appointment_time ASC
      LIMIT 5
    `)

    // 6. Overdue follow-ups list
    const overdueFollowUpsResult = await pool.query(`
      SELECT f.id, f.lead_id, f.scheduled_at, f.notes, l.name AS lead_name, l.phone AS lead_phone
      FROM follow_ups f
      JOIN leads l ON f.lead_id = l.id
      WHERE f.status = 'pending' AND f.scheduled_at < NOW()
      ORDER BY f.scheduled_at ASC
      LIMIT 5
    `)

    const leadsData = leadsResult.rows[0]
    const appointmentsData = appointmentsResult.rows[0]
    const followUpsData = followUpsResult.rows[0]

    return res.json({
      success: true,
      data: {
        total_leads: parseInt(leadsData.total_leads, 10) || 0,
        new_leads: parseInt(leadsData.new_leads, 10) || 0,
        contacted_leads: parseInt(leadsData.contacted_leads, 10) || 0,
        interested_leads: parseInt(leadsData.interested_leads, 10) || 0,
        converted_clients: parseInt(leadsData.converted_clients, 10) || 0,
        total_appointments: parseInt(appointmentsData.total_appointments, 10) || 0,
        pending_appointments: parseInt(appointmentsData.pending_appointments, 10) || 0,
        confirmed_appointments: parseInt(appointmentsData.confirmed_appointments, 10) || 0,
        upcoming_follow_ups: parseInt(followUpsData.upcoming_follow_ups, 10) || 0,
        overdue_follow_ups: parseInt(followUpsData.overdue_follow_ups, 10) || 0,
        recent_leads: recentLeadsResult.rows,
        upcoming_appointments: upcomingAppointmentsResult.rows,
        overdue_tasks: overdueFollowUpsResult.rows,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getDashboardSummary,
}
