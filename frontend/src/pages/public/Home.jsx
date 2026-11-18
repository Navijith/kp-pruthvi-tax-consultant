import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SEO from '../../components/common/SEO'
import Hero from '../../components/home/Hero'
import ServicesSection from '../../components/home/ServicesSection'
import AboutSection from '../../components/home/AboutSection'
import ConsultationSection from '../../components/home/ConsultationSection'
import FeedbackSection from '../../components/home/FeedbackSection'
import WhyChooseUs from '../../components/home/WhyChooseUs'

function Home() {
  const [selectedService, setSelectedService] = useState('')
  const location = useLocation()

  // Handle URL hash or path routing to smooth scroll on page load
  useEffect(() => {
    let targetId = ''
    if (location.hash) {
      targetId = location.hash.replace('#', '')
    } else if (location.pathname === '/services') {
      targetId = 'services'
    } else if (location.pathname === '/about') {
      targetId = 'about'
    } else if (location.pathname === '/contact' || location.pathname === '/appointment') {
      targetId = 'contact'
    } else if (location.pathname === '/feedback' || location.pathname === '/reviews') {
      targetId = 'feedback'
    }

    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 250)
    }
  }, [location])

  const handleSelectService = (serviceTitle) => {
    setSelectedService(serviceTitle)
  }

  return (
    <div className="page-shell">
      <SEO
        title="KP Tax Consultants — Business Bookkeeping, Tax & Statutory Compliance"
        description="KP Tax Consultants helps businesses maintain timely and accurate bookkeeping while ensuring compliance with direct taxation, payroll, and statutory requirements."
      />

      {/* 1. Hero Section (#home) */}
      <Hero />

      {/* 2. Unified Standard Business Advisory & Services Section (#services) */}
      <ServicesSection onSelectService={handleSelectService} />

      {/* 3. Complete About Section (#about) */}
      <AboutSection />

      {/* 4. Working Consultation & Enquiry Section (#contact) */}
      <ConsultationSection
        preselectedService={selectedService}
        onResetService={() => setSelectedService('')}
      />

      {/* 5. Rating, Reviews & Client Suggestions (#feedback) - Placed immediately after contact */}
      <FeedbackSection />

      {/* 6. Why Clients Approach the Practice */}
      <WhyChooseUs />
    </div>
  )
}

export default Home
