import { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import PublicLayout from '../components/layout/PublicLayout'
import Home from '../pages/public/Home'

function RouteFallback() {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <Loader2 className="h-7 w-7 animate-spin text-[#122438]" />
    </div>
  )
}

function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        {/* Unified Single Page Experience */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/contact" element={<Home />} />
          <Route path="/appointment" element={<Home />} />
        </Route>

        {/* Catch-all redirect to single page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
