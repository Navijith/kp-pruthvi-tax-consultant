export const site = {
  name: 'KP PRUTHVI',
  practiceName: 'KP Tax Consultants',
  designation: 'Tax Consultant',
  experience: '5+ years',
  experienceNote: 'Practical tax & bookkeeping experience',
  phone: '+91 70194 84928',
  phoneHref: 'tel:+917019484928',
  whatsapp: '917019484928',
  email: 'pruthvigowda003@gmail.com',
  location: 'Bengaluru, Karnataka (Online & Remote Practice)',
  hours: 'Mon–Sat • 9:30 AM–6:30 PM (Online Consultations)',

  // Core business positioning
  positioning:
    'KP Tax Consultants helps businesses maintain timely and accurate bookkeeping while ensuring compliance with applicable tax and statutory requirements.',
  subPositioning:
    'The practice provides support for direct taxation, bookkeeping, payroll and statutory compliance, helping businesses manage their financial records and recurring compliance responsibilities.',

  // Social media consultation channels
  socials: {
    whatsapp: 'https://wa.me/917019484928',
    instagram: 'https://www.instagram.com/kppruthvi_tax/',
    instagramDm: 'https://ig.me/m/kppruthvi_tax',
    linkedin: 'https://www.linkedin.com/in/kp-pruthvi-tax-consultant/',
    x: 'https://x.com/kppruthvi_tax',
  },
}

export const services = [
  {
    id: 'bookkeeping-accounting',
    title: 'Bookkeeping & Accounting Services',
    shortTitle: 'Bookkeeping & Accounting',
    isPrimary: true,
    description:
      'Timely and accurate bookkeeping that keeps your financial records organized, up-to-date and ready for routine review, audits, and business decisions.',
    points: [
      'Timely and accurate bookkeeping',
      'Maintaining organised financial records',
      'Accounting support for businesses',
      'Ongoing bookkeeping assistance',
    ],
  },
  {
    id: 'direct-tax',
    title: 'Direct Tax Services',
    shortTitle: 'Direct Tax & TDS',
    isPrimary: true,
    description:
      'Comprehensive income tax support covering proactive tax planning, accurate annual filings, advance tax calculations, and official notice responses.',
    points: [
      'Tax planning',
      'Income tax return filing',
      'Advance tax calculation',
      'Income tax notice response',
      'TDS deduction and filing',
      'Income tax refund follow-up',
    ],
  },
  {
    id: 'statutory-payroll',
    title: 'Statutory Compliance & Payroll',
    shortTitle: 'Statutory & Payroll',
    isPrimary: true,
    description:
      'Structured payroll processing and recurring monthly statutory filings so your business meets employer compliance deadlines without penalties.',
    points: [
      'Monthly ESI filing',
      'Monthly PF filing',
      'Professional Tax (PT) filing',
      'Payroll processing',
      'TDS-related compliance support',
      'Other event-based statutory filings',
    ],
  },
  {
    id: 'indirect-tax',
    title: 'Indirect Tax Services',
    shortTitle: 'Indirect Tax (GST)',
    isPrimary: false,
    description:
      'End-to-end GST compliance and indirect tax advisory to ensure accurate input tax credits, return submissions, and regulatory alignment.',
    points: [
      'GST-related services',
      'Other applicable indirect tax assistance',
    ],
  },
  {
    id: 'company-registration',
    title: 'Company Registration',
    shortTitle: 'Company Registration',
    isPrimary: false,
    description:
      'End-to-end guidance and documentation support for entrepreneurs and founders establishing new proprietorships, LLPs, or private companies.',
    points: [
      'Company and business registration assistance',
      'Related documentation and compliance guidance',
    ],
  },
]

export const clientGroups = [
  'Small & Medium Businesses',
  'Growing Enterprises',
  'Startups & Founders',
  'Self-Employed Professionals',
  'Salaried Professionals',
  'Proprietorships & LLPs',
]

/**
 * Helper to build direct WhatsApp link with user filled details
 */
export function buildWhatsAppLink({ name, phone, email, service, platform, details }) {
  const lines = [
    `*New Consultation Request — KP Tax Consultants*`,
    `----------------------------------------`,
    `*Full Name:* ${name}`,
    `*Phone:* ${phone}`,
    email ? `*Email:* ${email}` : null,
    service ? `*Service Required:* ${service}` : null,
    platform ? `*Preferred Platform:* ${platform}` : null,
    details ? `*Requirement Details:*\n${details}` : null,
    `----------------------------------------`,
    `Timing: 9:00 AM – 7:00 PM (Online Consultation)`,
    `Sent from KP Tax Consultants Website`,
  ].filter(Boolean)

  const text = encodeURIComponent(lines.join('\n'))
  return `https://wa.me/${site.whatsapp}?text=${text}`
}

/**
 * Helper to build direct mailto link with prefilled subject and body
 */
export function buildMailtoLink({ name, phone, email, service, platform, details }) {
  const subject = encodeURIComponent(`Consultation Request: ${name} (${service || 'Business Tax & Accounting'})`)
  const body = encodeURIComponent(
    `Hello KP Pruthvi,\n\n` +
    `I would like to request an online consultation for business tax/accounting services with the following details:\n\n` +
    `Full Name: ${name}\n` +
    `Phone: ${phone}\n` +
    (email ? `Email: ${email}\n` : '') +
    (service ? `Service Required: ${service}\n` : '') +
    (platform ? `Preferred Online Platform: ${platform}\n` : '') +
    (details ? `Requirement Details:\n${details}\n\n` : '\n') +
    `Best regards,\n${name}`
  )
  return `mailto:${site.email}?subject=${subject}&body=${body}`
}
