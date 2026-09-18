import { useMemo, useState } from 'react'
import { CalendarDays, CheckCircle2, Clock3, MapPin, MessageCircle, Monitor, Phone, Video } from 'lucide-react'
import { motion } from 'framer-motion'
import { requestAppointment } from '../../services/api'
import { services, site } from '../../config/site'

const onlineMethods = ['Google Meet', 'Zoom', 'WhatsApp', 'Phone']

function getMinDate() {
  const date = new Date()
  const offset = date.getTimezoneOffset()
  const local = new Date(date.getTime() - offset * 60 * 1000)
  return local.toISOString().split('T')[0]
}

function timeSlots() {
  const result = []
  for (let minutes = 9 * 60; minutes <= 19 * 60 + 45; minutes += 15) {
    const hour = Math.floor(minutes / 60)
    const minute = minutes % 60
    const suffix = hour >= 12 ? 'PM' : 'AM'
    const twelveHour = hour % 12 || 12
    result.push(`${twelveHour}:${String(minute).padStart(2, '0')} ${suffix}`)
  }
  return result
}

function Appointment() {
  const slots = useMemo(() => timeSlots(), [])
  const [mode, setMode] = useState('offline')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [reference, setReference] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    data.mode = mode
    data.duration_minutes = 15
    try {
      const response = await requestAppointment(data)
      setReference(response?.data?.reference || '')
      setSubmitted(true)
      form.reset()
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to submit the appointment request. Please call or WhatsApp instead.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-shell">
      <section className="bg-[#122438] text-white"><div className="mx-auto max-w-7xl px-5 py-18 lg:px-8 lg:py-22"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d9b96d]">Appointments</p><h1 className="font-display mt-4 max-w-4xl text-5xl leading-tight sm:text-6xl">Book a free 15-minute consultation.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-[#b9c4cf]">Choose online or in-person. Submit your preferred date and time, and the practice will confirm the request directly.</p></div></section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <div className="space-y-4">
            {[
              ['offline', MapPin, 'In-person consultation', 'Visit the office in Vidyaranyapura, Bengaluru.'],
              ['online', Monitor, 'Online consultation', 'Connect through Google Meet, Zoom, WhatsApp or phone.'],
            ].map(([value, Icon, title, text]) => (
              <button key={value} type="button" onClick={() => setMode(value)} className={`w-full rounded-[1.5rem] border p-6 text-left transition ${mode === value ? 'border-[#bfa05d] bg-[#fffdf8] shadow-professional' : 'border-[#e4e2da] bg-white hover:border-[#cfc8ba]'}`}>
                <div className="flex items-start gap-4"><div className={`flex h-11 w-11 items-center justify-center rounded-xl ${mode === value ? 'bg-[#f2e8cf] text-[#a77d2f]' : 'bg-[#eef1ef] text-[#496154]'}`}><Icon size={21} /></div><div><p className="font-bold text-[#122438]">{title}</p><p className="mt-1 text-sm leading-6 text-[#687385]">{text}</p></div></div>
              </button>
            ))}
            <div className="rounded-[1.5rem] border border-[#e4e2da] bg-white p-6"><div className="flex items-start gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef1ef] text-[#496154]"><Clock3 size={21} /></div><div><p className="font-bold text-[#122438]">Office hours</p><p className="mt-1 text-sm leading-6 text-[#687385]">{site.hours}</p></div></div></div>
            <div className="rounded-[1.5rem] bg-[#122438] p-6 text-white"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#d9b96d]">Need a quick answer?</p><p className="mt-2 text-sm leading-6 text-[#c8d1d9]">You can also call or WhatsApp without filling the appointment form.</p><div className="mt-5 flex flex-wrap gap-3"><a href={site.phoneHref} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#122438]"><Phone size={16} /> Call</a><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white"><MessageCircle size={16} /> WhatsApp</a></div></div>
          </div>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-[#e4e2da] bg-white p-7 shadow-sm sm:p-9">
            {submitted ? (
              <div className="flex min-h-[520px] flex-col items-center justify-center text-center"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8efeb] text-[#2c5a4d]"><CheckCircle2 size={32} /></div><h2 className="font-display mt-6 text-4xl text-[#122438]">Appointment request received.</h2><p className="mt-4 max-w-md text-sm leading-7 text-[#687385]">Your request has been recorded. The practice will confirm the preferred date and time directly.</p>{reference && <p className="mt-5 rounded-xl bg-[#f7f5ef] px-4 py-3 text-xs font-bold tracking-[0.12em] text-[#122438]">REFERENCE: {reference}</p>}<button type="button" onClick={() => setSubmitted(false)} className="mt-7 rounded-xl border border-[#dcd8ce] px-5 py-3 text-sm font-semibold text-[#122438]">Book another</button></div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a77d2f]">Request a slot</p><h2 className="font-display mt-3 text-3xl text-[#122438]">Tell us how we can contact you.</h2></div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" name="name" placeholder="Your name" required />
                  <Field label="Phone" name="phone" placeholder="+91" required />
                  <Field label="Email" name="email" placeholder="you@example.com" type="email" />
                  <label className="block"><span className="mb-2 block text-sm font-semibold text-[#334457]">Service</span><select name="service" required className="w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] px-4 py-3.5 text-sm outline-none focus:border-[#b89a58] focus:ring-4 focus:ring-[#b89a58]/10"><option value="">Choose a service</option>{services.map((service) => <option key={service.id} value={service.title}>{service.title}</option>)}</select></label>
                </div>

                <div><p className="mb-2 text-sm font-semibold text-[#334457]">Consultation mode</p><div className="grid gap-3 sm:grid-cols-2"><label className={`cursor-pointer rounded-xl border p-4 ${mode === 'offline' ? 'border-[#bfa05d] bg-[#fffdf8]' : 'border-[#dedbd3]'}`}><input type="radio" name="mode_display" checked={mode === 'offline'} onChange={() => setMode('offline')} className="sr-only" /><span className="text-sm font-semibold text-[#122438]">In-person at office</span></label><label className={`cursor-pointer rounded-xl border p-4 ${mode === 'online' ? 'border-[#bfa05d] bg-[#fffdf8]' : 'border-[#dedbd3]'}`}><input type="radio" name="mode_display" checked={mode === 'online'} onChange={() => setMode('online')} className="sr-only" /><span className="text-sm font-semibold text-[#122438]">Online consultation</span></label></div></div>

                {mode === 'online' && <label className="block"><span className="mb-2 block text-sm font-semibold text-[#334457]">Preferred online method</span><select name="preferred_method" required className="w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] px-4 py-3.5 text-sm outline-none focus:border-[#b89a58] focus:ring-4 focus:ring-[#b89a58]/10"><option value="">Choose a method</option>{onlineMethods.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>}
                {mode === 'offline' && <input type="hidden" name="preferred_method" value="In-person office" />}

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block"><span className="mb-2 block text-sm font-semibold text-[#334457]">Preferred date</span><input type="date" name="appointment_date" min={getMinDate()} required className="w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] px-4 py-3.5 text-sm outline-none focus:border-[#b89a58] focus:ring-4 focus:ring-[#b89a58]/10" /></label>
                  <label className="block"><span className="mb-2 block text-sm font-semibold text-[#334457]">Preferred time</span><select name="appointment_time" required className="w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] px-4 py-3.5 text-sm outline-none focus:border-[#b89a58] focus:ring-4 focus:ring-[#b89a58]/10"><option value="">Choose a time</option>{slots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}</select></label>
                </div>
                <label className="block"><span className="mb-2 block text-sm font-semibold text-[#334457]">Anything we should know? <span className="font-normal text-[#89919c]">(optional)</span></span><textarea name="message" rows="4" placeholder="Briefly describe your requirement" className="w-full resize-none rounded-xl border border-[#dedbd3] bg-[#fbfaf6] px-4 py-3.5 text-sm outline-none focus:border-[#b89a58] focus:bg-white focus:ring-4 focus:ring-[#b89a58]/10" /></label>
                {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
                <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#122438] px-6 py-4 font-semibold text-white transition hover:bg-[#20374e] disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Submitting request…' : 'Request appointment'} <CalendarDays size={18} /></button>
                <p className="text-xs leading-5 text-[#818b98]">Appointments are requested in advance. Your preferred slot is not confirmed until the practice responds.</p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function Field({ label, name, placeholder, type = 'text', required = false }) {
  return <label className="block"><span className="mb-2 block text-sm font-semibold text-[#334457]">{label}</span><input type={type} name={name} placeholder={placeholder} required={required} className="w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] px-4 py-3.5 text-sm outline-none focus:border-[#b89a58] focus:bg-white focus:ring-4 focus:ring-[#b89a58]/10" /></label>
}

export default Appointment
