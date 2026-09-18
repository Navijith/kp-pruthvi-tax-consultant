import { ArrowRight, ExternalLink, MapPin, Navigation, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { site } from '../../config/site'

function Location() {
  const query = encodeURIComponent(site.address)
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`
  const embedUrl = `https://www.google.com/maps?q=${query}&z=16&output=embed`

  return <div className="page-shell">
    <section className="bg-[#122438] text-white"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d9b96d]">Office location</p><h1 className="font-display mt-4 max-w-4xl text-5xl leading-tight sm:text-6xl">Visit KP Tax Consultants in Vidyaranyapura.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-[#b9c4cf]">Use the map below for the office location and directions.</p></div></section>
    <section className="py-16"><div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
      <motion.div initial={{opacity:0,x:-18}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="rounded-[2rem] border border-[#e4e2da] bg-white p-7 shadow-sm sm:p-9"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f2e8cf] text-[#a77d2f]"><MapPin size={23}/></div><p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#a77d2f]">Office address</p><h2 className="font-display mt-3 text-3xl text-[#122438]">KP Tax Consultants</h2><p className="mt-5 text-sm leading-7 text-[#687385]">{site.address}</p><div className="mt-7 rounded-2xl bg-[#f7f5ef] p-5"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a929d]">Hours</p><p className="mt-2 text-sm font-semibold text-[#122438]">{site.hours}</p></div><div className="mt-6 grid gap-3"><a href={directionsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#122438] px-5 py-3.5 text-sm font-semibold text-white"><Navigation size={17}/> Get directions</a><a href={googleMapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#dcd8ce] px-5 py-3.5 text-sm font-semibold text-[#122438]"><ExternalLink size={17}/> Open Google Maps</a><a href={site.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#dcd8ce] px-5 py-3.5 text-sm font-semibold text-[#122438]"><Phone size={17}/> Call office</a></div></motion.div>
      <motion.div initial={{opacity:0,x:18}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="overflow-hidden rounded-[2rem] border border-[#e4e2da] bg-white shadow-sm"><div className="h-[500px] w-full"><iframe title="KP Tax Consultants office map" src={embedUrl} className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div><div className="border-t border-[#e4e2da] p-5"><p className="text-sm leading-6 text-[#687385]">For an in-person appointment, please request a slot in advance so the preferred time can be confirmed.</p><a href="/appointment" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#122438]">Book an appointment <ArrowRight size={15}/></a></div></motion.div>
    </div></section>
  </div>
}
export default Location
