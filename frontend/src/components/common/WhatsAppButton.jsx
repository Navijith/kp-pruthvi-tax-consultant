import { MessageCircle } from 'lucide-react'
import { site } from '../../config/site'

function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Hello KP Tax Consultants, I would like to discuss a tax or accounting requirement.')}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with KP Tax Consultants on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#214f45] text-white shadow-[0_12px_30px_rgba(18,36,56,0.22)] transition hover:-translate-y-0.5 hover:bg-[#183e36]"
    >
      <MessageCircle size={24} />
    </a>
  )
}

export default WhatsAppButton
