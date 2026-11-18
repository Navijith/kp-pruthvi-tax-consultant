const Business = require('../models/Business')

const getBusinesses = async (req, res, next) => {
  try {
    const list = await Business.findAll({ limit: 50 })
    return res.json({
      success: true,
      count: list.length,
      data: list,
    })
  } catch (error) {
    next(error)
  }
}

const getBusinessById = async (req, res, next) => {
  try {
    const business = await Business.findById(req.params.id)
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business record not found',
      })
    }
    return res.json({
      success: true,
      data: business,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getBusinesses,
  getBusinessById,
}
