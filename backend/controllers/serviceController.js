const pool = require('../config/db')

const defaultServices = [
  {
    id: 'direct-tax',
    slug: 'direct-tax',
    name: 'Direct Tax',
    short_description: 'Income Tax filing, tax planning, and advisory support',
    description: 'Practical support for income-tax compliance for individuals, salaried employees, self-employed professionals, and businesses.',
    points: ['Income Tax Return filing', 'Tax calculation & planning guidance', 'Advance tax & TDS compliance review', 'Tax notice guidance & response support'],
    target: 'Individuals, Salaried Professionals, Self-Employed, Firms',
    display_order: 1,
  },
  {
    id: 'indirect-tax',
    slug: 'indirect-tax',
    name: 'Indirect Tax',
    short_description: 'GST registration, periodic filing, and Excise Duty where applicable',
    description: 'Structured indirect-tax assistance covering GST registration, monthly/quarterly returns, input tax credit reconciliation, and statutory filing.',
    points: ['New GST registration & amendments', 'Monthly/Quarterly GSTR-1 & GSTR-3B filings', 'Input Tax Credit (ITC) reconciliation', 'Indirect tax compliance assistance'],
    target: 'Traders, Manufacturers, Service Providers, Startups',
    display_order: 2,
  },
  {
    id: 'compliance',
    slug: 'compliance',
    name: 'Compliance',
    short_description: 'Statutory compliance tracking and timely calendar filings',
    description: 'Structured assistance to keep your regular tax and regulatory deadlines organized without missing statutory dates.',
    points: ['Statutory due-date calendar tracking', 'Periodic documentation & records upkeep', 'Business regulatory guidance', 'Routine compliance audit support'],
    target: 'Small Businesses, Growing Enterprises, Startups',
    display_order: 3,
  },
  {
    id: 'accounting',
    slug: 'accounting',
    name: 'Accounting',
    short_description: 'Bookkeeping, ledgers, and financial record keeping',
    description: 'Maintain clean, organized financial records ready for review, taxation, and financial reporting.',
    points: ['Systematic bookkeeping & vouchers', 'Bank and ledger reconciliation', 'Profit & Loss and Balance Sheet review', 'Financial documentation management'],
    target: 'Proprietorships, Partnerships, Private Limited Companies, LLPs',
    display_order: 4,
  },
  {
    id: 'company-registration',
    slug: 'company-registration',
    name: 'Company Registration',
    short_description: 'Guidance and documentation support for formal business incorporation',
    description: 'Assistance for entrepreneurs and business owners to formalize their business structure with clarity on registration steps and requirements.',
    points: ['Private Limited Company incorporation guidance', 'LLP & Partnership Deed documentation', 'Sole Proprietorship registration steps', 'Initial post-incorporation compliance guidance'],
    target: 'Entrepreneurs, Startups, New Business Ventures',
    display_order: 5,
  },
]

const getServices = async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT id, name, slug, short_description, description, display_order
       FROM services
       WHERE is_active = TRUE
       ORDER BY display_order ASC`
    )

    if (result.rows.length === 0) {
      return res.json({
        success: true,
        count: defaultServices.length,
        data: defaultServices,
      })
    }

    // Merge default points and targets if not in DB table
    const data = result.rows.map((row) => {
      const match = defaultServices.find((s) => s.slug === row.slug)
      return {
        ...row,
        points: match ? match.points : [],
        target: match ? match.target : 'Businesses & Individuals',
      }
    })

    return res.json({
      success: true,
      count: data.length,
      data,
    })
  } catch (error) {
    return res.json({
      success: true,
      count: defaultServices.length,
      data: defaultServices,
    })
  }
}

const getServiceBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params
    const match = defaultServices.find((s) => s.slug === slug)
    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      })
    }
    return res.json({
      success: true,
      data: match,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getServices,
  getServiceBySlug,
  defaultServices,
}
