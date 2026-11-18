const FollowUp = require('../models/FollowUp')
const { followUpSchema, followUpUpdateSchema } = require('../utils/validators')

const getFollowUps = async (req, res, next) => {
  try {
    const { status, filter } = req.query
    const list = await FollowUp.findAll({ status, filter })

    return res.json({
      success: true,
      count: list.length,
      data: list,
    })
  } catch (error) {
    next(error)
  }
}

const createFollowUp = async (req, res, next) => {
  try {
    const validation = followUpSchema.safeParse(req.body)
    if (!validation.success) {
      const issues = validation.error.issues || validation.error.errors || []
      return res.status(400).json({
        success: false,
        message: issues[0]?.message || 'Valid lead ID and date are required',
      })
    }

    const { lead_id, scheduled_at, notes } = validation.data
    const followUp = await FollowUp.create({ lead_id, scheduled_at, notes })

    return res.status(201).json({
      success: true,
      message: 'Follow-up task scheduled successfully',
      data: followUp,
    })
  } catch (error) {
    next(error)
  }
}

const updateFollowUp = async (req, res, next) => {
  try {
    const validation = followUpUpdateSchema.safeParse(req.body)
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid follow-up update payload',
      })
    }

    const updated = await FollowUp.update(req.params.id, validation.data)
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Follow-up not found',
      })
    }

    return res.json({
      success: true,
      message: 'Follow-up updated successfully',
      data: updated,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getFollowUps,
  createFollowUp,
  updateFollowUp,
}
