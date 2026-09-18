import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from '../common/WhatsAppButton'

function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#182536]">
      <Navbar />
      <main><Outlet /></main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default PublicLayout
