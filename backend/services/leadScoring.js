function calculateLeadScore({ service, mode, message }) {
  let score = 50
  let priority = 'medium'

  const highIntentServices = ['direct-tax', 'indirect-tax', 'company-registration']
  if (service) {
    const slug = service.toLowerCase().replace(/\s+/g, '-')
    if (highIntentServices.some((s) => slug.includes(s))) {
      score += 20
    }
  }

  // Appointment requests are high priority
  if (mode) {
    score += 20
  }

  if (message && message.length > 50) {
    score += 10
  }

  if (score >= 80) {
    priority = 'high'
  } else if (score >= 50) {
    priority = 'medium'
  } else {
    priority = 'low'
  }

  return { score: Math.min(score, 100), priority }
}

module.exports = {
  calculateLeadScore,
}
