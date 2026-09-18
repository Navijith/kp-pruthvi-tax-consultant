import { Routes, Route } from 'react-router-dom'
import PublicLayout from '../components/layout/PublicLayout'
import Home from '../pages/public/Home'
import About from '../pages/public/About'
import Services from '../pages/public/Services'
import Contact from '../pages/public/Contact'
import Location from '../pages/public/Location'
import Appointment from '../pages/public/Appointment'
import Login from '../pages/admin/Login'
import Dashboard from '../pages/admin/Dashboard'
import Leads from '../pages/admin/Leads'
import LeadDetails from '../pages/admin/LeadDetails'
import Map from '../pages/admin/Map'
import FollowUps from '../pages/admin/FollowUps'
import Notifications from '../pages/admin/Notifications'
import Settings from '../pages/admin/Settings'
import Appointments from '../pages/admin/Appointments'

function AppRoutes() {
  return <Routes>
    <Route element={<PublicLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/appointment" element={<Appointment />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/location" element={<Location />} />
    </Route>
    <Route path="/admin/login" element={<Login />} />
    <Route path="/admin/dashboard" element={<Dashboard />} />
    <Route path="/admin/leads" element={<Leads />} />
    <Route path="/admin/leads/:id" element={<LeadDetails />} />
    <Route path="/admin/map" element={<Map />} />
    <Route path="/admin/follow-ups" element={<FollowUps />} />
    <Route path="/admin/appointments" element={<Appointments />} />
    <Route path="/admin/notifications" element={<Notifications />} />
    <Route path="/admin/settings" element={<Settings />} />
  </Routes>
}
export default AppRoutes
