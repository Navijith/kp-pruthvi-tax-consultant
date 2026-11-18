import { useEffect } from 'react'
import { site } from '../../config/site'

function SEO({
  title,
  description = 'KP Tax Consultants — Clear guidance for taxes, GST, accounting, statutory compliance and company registration in Bengaluru. Consult with KP Pruthvi, Tax Consultant.',
  path = '',
}) {
  useEffect(() => {
    // 1. Update Document Title
    const fullTitle = title
      ? `${title} | KP Tax Consultants — KP Pruthvi`
      : 'KP Tax Consultants | Clear Guidance for Taxes, Accounts & Business Compliance'
    document.title = fullTitle

    // 2. Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = 'description'
      document.head.appendChild(metaDesc)
    }
    metaDesc.content = description

    // 3. Inject Local Business Structured Data (JSON-LD)
    const scriptId = 'kp-tax-structured-data'
    let scriptTag = document.getElementById(scriptId)
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.id = scriptId
      scriptTag.type = 'application/ld+json'
      document.head.appendChild(scriptTag)
    }

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'AccountingService',
      name: 'KP Tax Consultants',
      description: 'Tax advisory, GST filing, compliance, accounting, and business registration services led by KP Pruthvi, Tax Consultant in Bengaluru.',
      url: window.location.origin,
      telephone: site.phone,
      email: site.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '144, 9th Cross, 2nd Phase, Sainagar, MS Palya, Vidyaranyapura Post',
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        postalCode: '560097',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        addressCountry: 'IN',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
          opens: '09:00',
          closes: '20:00',
        },
      ],
      priceRange: '₹₹',
    }

    scriptTag.text = JSON.stringify(structuredData)
  }, [title, description, path])

  return null
}

export default SEO
