const Lead = require('../models/Lead')
const { leadUpdateSchema, leadNoteSchema } = require('../utils/validators')

const getLeads = async (req, res, next) => {
  try {
    const { search, status, priority, source, sortBy } = req.query
    const leads = await Lead.findAll({ search, status, priority, source, sortBy })

    return res.json({
      success: true,
      count: leads.length,
      data: leads,
    })
  } catch (error) {
    next(error)
  }
}

const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id)
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      })
    }
    return res.json({
      success: true,
      data: lead,
    })
  } catch (error) {
    next(error)
  }
}

const updateLead = async (req, res, next) => {
  try {
    const validation = leadUpdateSchema.safeParse(req.body)
    if (!validation.success) {
      const issues = validation.error.issues || validation.error.errors || []
      return res.status(400).json({
        success: false,
        message: 'Invalid update payload',
        errors: issues,
      })
    }

    const updated = await Lead.update(req.params.id, validation.data)
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      })
    }

    return res.json({
      success: true,
      message: 'Lead updated successfully',
      data: updated,
    })
  } catch (error) {
    next(error)
  }
}

const addLeadNote = async (req, res, next) => {
  try {
    const validation = leadNoteSchema.safeParse(req.body)
    if (!validation.success) {
      const issues = validation.error.issues || validation.error.errors || []
      return res.status(400).json({
        success: false,
        message: issues[0]?.message || 'Note content is required',
      })
    }

    const { notes, contact_type } = validation.data
    const history = await Lead.addContactHistory(req.params.id, { notes, contact_type })

    return res.status(201).json({
      success: true,
      message: 'Note recorded successfully',
      data: history,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getLeads,
  getLeadById,
  updateLead,
  addLeadNote,
}
