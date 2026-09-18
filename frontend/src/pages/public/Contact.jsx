import { useState } from 'react'
import { ArrowRight, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { submitEnquiry } from '../../services/api'
import { services, site } from '../../config/site'

function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true); setError('')
    const form = event.currentTarget
    const formData = new FormData(form)
    try {
      await submitEnquiry({ name: formData.get('name')?.trim(), phone: formData.get('phone')?.trim(), email: formData.get('email')?.trim(), service: formData.get('service'), message: formData.get('message')?.trim() })
      form.reset(); setSubmitted(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to submit your enquiry. Please call or WhatsApp instead.')
    } finally { setLoading(false) }
  }

  const contactCards = [
    { icon: Phone, title: 'Call', value: site.phone, href: site.phoneHref, text: 'Speak directly' },
    { icon: MessageCircle, title: 'WhatsApp', value: site.phone, href: `https://wa.me/${site.whatsapp}`, text: 'Send a message', external: true },
    { icon: Mail, title: 'Email', value: site.email, href: `mailto:${site.email}`, text: 'Send an enquiry' },
  ]

  return <div className="page-shell">
    <section className="bg-[#122438] text-white"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d9b96d]">Contact</p><h1 className="font-display mt-4 max-w-4xl text-5xl leading-tight sm:text-6xl">A direct way to ask a question or start a consultation.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-[#b9c4cf]">Call, WhatsApp, email or send an enquiry through the form below.</p></div></section>
    <section className="py-16"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="grid gap-5 md:grid-cols-3">{contactCards.map((item, index) => { const Icon = item.icon; return <motion.a key={item.title} href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noreferrer' : undefined} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*0.05}} className="group rounded-[1.5rem] border border-[#e4e2da] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-professional"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f2e8cf] text-[#a77d2f]"><Icon size={21}/></div><p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#89919c]">{item.text}</p><h2 className="mt-2 text-xl font-bold text-[#122438]">{item.title}</h2><p className="mt-2 break-all text-sm text-[#687385]">{item.value}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#122438]">Connect <ArrowRight size={15} className="transition group-hover:translate-x-1"/></span></motion.a> })}</div></div></section>

    <section className="pb-24"><div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[1fr_0.7fr] lg:px-8">
      <div className="rounded-[2rem] border border-[#e4e2da] bg-white p-7 shadow-sm sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a77d2f]">Enquiry form</p><h2 className="font-display mt-3 text-3xl text-[#122438] sm:text-4xl">Tell us what you need help with.</h2>
        {submitted ? <div className="mt-8 rounded-2xl border border-[#cfe2d9] bg-[#eef7f2] p-6"><p className="font-bold text-[#245443]">Enquiry received</p><p className="mt-2 text-sm leading-6 text-[#487061]">Thank you. Your details have been submitted to KP Tax Consultants.</p></div> : <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2"><Field label="Full name" name="name" placeholder="Your name" required/><Field label="Phone" name="phone" placeholder="+91" required/></div>
          <Field label="Email" name="email" placeholder="you@example.com" type="email"/>
          <label className="block"><span className="mb-2 block text-sm font-semibold text-[#334457]">Service</span><select name="service" required className="w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] px-4 py-3.5 text-sm outline-none focus:border-[#b89a58] focus:ring-4 focus:ring-[#b89a58]/10"><option value="">Select a service</option>{services.map((service)=><option key={service.id} value={service.title}>{service.title}</option>)}</select></label>
          <label className="block"><span className="mb-2 block text-sm font-semibold text-[#334457]">Message</span><textarea name="message" rows="5" required placeholder="Briefly describe your requirement" className="w-full resize-none rounded-xl border border-[#dedbd3] bg-[#fbfaf6] px-4 py-3.5 text-sm outline-none focus:border-[#b89a58] focus:bg-white focus:ring-4 focus:ring-[#b89a58]/10" /></label>
          {error && <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
          <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#122438] px-6 py-3.5 font-semibold text-white transition hover:bg-[#20374e] disabled:opacity-60">{loading ? 'Submitting…' : 'Send enquiry'} <Send size={17}/></button>
        </form>}
      </div>
      <div className="space-y-5">
        <div className="rounded-[2rem] border border-[#e4e2da] bg-[#122438] p-7 text-white"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d9b96d]">Office</p><h2 className="font-display mt-3 text-3xl">Vidyaranyapura, Bengaluru</h2><p className="mt-4 text-sm leading-7 text-[#c4ced8]">{site.address}</p><div className="mt-6 border-t border-white/10 pt-5"><p className="text-xs uppercase tracking-[0.16em] text-[#9eabb8]">Working hours</p><p className="mt-2 text-sm font-semibold">{site.hours}</p></div></div>
        <div className="rounded-[2rem] border border-[#e4e2da] bg-white p-7"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef1ef] text-[#496154]"><MapPin size={21}/></div><div><p className="font-bold text-[#122438]">Need directions?</p><p className="text-sm text-[#687385]">Open the exact office location on the Location page.</p></div></div><a href="/location" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#122438]">View location <ArrowRight size={15}/></a></div>
      </div>
    </div></section>
  </div>
}
function Field({label,name,placeholder,type='text',required=false}){return <label className="block"><span className="mb-2 block text-sm font-semibold text-[#334457]">{label}</span><input type={type} name={name} placeholder={placeholder} required={required} className="w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] px-4 py-3.5 text-sm outline-none focus:border-[#b89a58] focus:bg-white focus:ring-4 focus:ring-[#b89a58]/10"/></label>}
export default Contact
