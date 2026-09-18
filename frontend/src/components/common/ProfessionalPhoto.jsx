import { useState } from 'react'
import { UserRound } from 'lucide-react'

function ProfessionalPhoto({ className = '' }) {
  const [hasPhoto, setHasPhoto] = useState(true)

  if (!hasPhoto) {
    return (
      <div className={`flex items-center justify-center bg-[radial-gradient(circle_at_top,#f7f1df,#e9e4d7_52%,#d8d3c6)] ${className}`}>
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#122438] text-lg font-bold tracking-[0.12em] text-white">KP</div>
          <UserRound size={28} className="mx-auto mt-6 text-[#122438]/30" />
        </div>
      </div>
    )
  }

  return (
    <img
      src="/pruthvi.jpg"
      alt="KP Pruthvi, Tax Consultant"
      className={`object-cover ${className}`}
      onError={() => setHasPhoto(false)}
    />
  )
}

export default ProfessionalPhoto
