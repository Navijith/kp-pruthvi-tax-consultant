import { MapPin, Navigation, ExternalLink } from 'lucide-react'
import { site } from '../../config/site'

function Map() {
  const query = encodeURIComponent(site.address)
  const embedUrl = `https://www.google.com/maps?q=${query}&z=16&output=embed`

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-[#a77d2f]">
          Office Location
        </span>
        <h1 className="font-display mt-1 text-2xl sm:text-3xl font-bold text-[#122438]">
          Practice Location Map
        </h1>
        <p className="text-xs sm:text-sm text-[#687385]">
          Physical location of KP Tax Consultants in Vidyaranyapura, Bengaluru.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-[#dedbd3] bg-white shadow-sm">
        <div className="h-[480px] w-full">
          <iframe
            title="KP Tax Consultants Location"
            src={embedUrl}
            className="h-full w-full border-0"
            loading="lazy"
          />
        </div>
        <div className="border-t border-[#dedbd3] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-[#122438]">{site.practiceName}</p>
            <p className="text-xs text-[#687385]">{site.address}</p>
          </div>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${query}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#122438] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#20374e]"
          >
            <Navigation size={14} /> Open Directions
          </a>
        </div>
      </div>
    </div>
  )
}

export default Map
