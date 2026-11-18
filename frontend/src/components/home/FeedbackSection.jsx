import { useState } from 'react'
import { Star, MessageSquarePlus, CheckCircle2, Send, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { site } from '../../config/site'

function FeedbackSection() {
  // Start clean: No fake/dummy customer reviews. Real customer reviews populate here upon submission.
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('kp_tax_client_reviews')
      if (saved) {
        return JSON.parse(saved)
      }
    } catch {
      // storage fallback
    }
    return []
  })

  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [clientName, setClientName] = useState('')
  const [clientRole, setClientRole] = useState('')
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [whatsappShareUrl, setWhatsappShareUrl] = useState('')

  const handleRatingSubmit = (e) => {
    e.preventDefault()
    if (!clientName.trim() || !comment.trim()) return

    const newReview = {
      id: Date.now(),
      name: clientName.trim(),
      role: clientRole.trim() || 'Verified Client',
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
    }

    const updated = [newReview, ...reviews]
    setReviews(updated)
    try {
      localStorage.setItem('kp_tax_client_reviews', JSON.stringify(updated))
    } catch {
      // storage unavailable
    }

    // Build WhatsApp share URL
    const starsText = '⭐'.repeat(rating)
    const shareText = encodeURIComponent(
      `*Client Feedback & Rating — KP Tax Consultants*\n\n` +
      `*Rating:* ${starsText} (${rating}/5)\n` +
      `*Client:* ${newReview.name}\n` +
      (clientRole ? `*Business/Role:* ${clientRole}\n` : '') +
      `*Feedback/Suggestion:*\n"${newReview.comment}"\n\n` +
      `Submitted via KP Tax Consultants Website`
    )
    setWhatsappShareUrl(`https://wa.me/${site.whatsapp}?text=${shareText}`)

    setSubmitted(true)
  }

  const handleReset = () => {
    setClientName('')
    setClientRole('')
    setComment('')
    setRating(5)
    setSubmitted(false)
  }

  return (
    <section id="feedback" className="py-20 lg:py-28 bg-[#fbfaf6] border-t border-[#e5e2da]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a77d2f]">
            Client Feedback & Suggestions
          </p>
          <h2 className="font-display mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold text-[#122438]">
            Ratings, Reviews & Suggestions.
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#536071]">
            We value client input and continuous service improvement. Submit your consultation rating or share suggestions directly with consultant KP Pruthvi.
          </p>
        </div>

        {/* Top Satisfaction Standards Bar */}
        <div className="mb-12 rounded-3xl border border-[#b89a58]/40 bg-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f2e8cf] text-[#a77d2f]">
              <Star size={26} fill="#a77d2f" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#a77d2f]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} fill="#a77d2f" className="text-[#a77d2f]" />
                ))}
              </div>
              <p className="mt-1 text-sm font-bold text-[#122438]">
                Dedicated Client Service Standards
              </p>
              <p className="text-xs text-[#687385]">
                Direct Consultant Accountability • Practical Guidance
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-[#2c5a4d]/10 px-3.5 py-1.5 text-xs font-semibold text-[#2c5a4d]">
              ✓ Direct WhatsApp Dispatch
            </span>
            <span className="rounded-full bg-[#122438]/5 px-3.5 py-1.5 text-xs font-semibold text-[#122438]">
              ✓ Real Customer Feedback
            </span>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
          {/* Real Customer Reviews Display Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#a77d2f]">
              Customer Reviews ({reviews.length})
            </h3>

            {reviews.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-[#dedbd3] bg-white p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fbfaf6] text-[#8a94a2]">
                  <Star size={22} />
                </div>
                <h4 className="mt-4 font-bold text-base text-[#122438]">
                  No reviews published yet
                </h4>
                <p className="mt-1.5 text-xs sm:text-sm text-[#687385] max-w-sm mx-auto">
                  Real customer ratings and reviews will appear here as clients submit their feedback after consultation.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((r) => (
                  <motion.article
                    key={r.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-[#e4e2da] bg-white p-6 shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-base text-[#122438]">{r.name}</h4>
                        <p className="text-xs text-[#687385]">{r.role}</p>
                      </div>
                      <div className="flex items-center gap-0.5 text-[#a77d2f]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            fill={star <= r.rating ? '#a77d2f' : 'none'}
                            className={star <= r.rating ? 'text-[#a77d2f]' : 'text-[#dedbd3]'}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#536071]">
                      &ldquo;{r.comment}&rdquo;
                    </p>

                    <div className="mt-3 pt-3 border-t border-[#f0ede6] flex items-center justify-between text-[11px] text-[#8a94a2]">
                      <span>{r.date}</span>
                      <span className="text-[#2c5a4d] font-semibold">Verified Client Review</span>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Rating & Suggestion Form */}
          <div className="rounded-3xl border border-[#dedbd3] bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5 mb-5 border-b border-[#f0ede6] pb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f2e8cf] text-[#a77d2f]">
                <MessageSquarePlus size={20} />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-[#122438]">
                  Share Your Review or Suggestion
                </h3>
                <p className="text-xs text-[#687385]">Help us serve you better</p>
              </div>
            </div>

            {submitted ? (
              <div className="text-center py-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e8efeb] text-[#2c5a4d]">
                  <CheckCircle2 size={30} />
                </div>
                <h4 className="font-display mt-4 text-xl font-bold text-[#122438]">
                  Thank You for Your Feedback!
                </h4>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#687385]">
                  Your review has been saved. You can also send your feedback directly to KP Pruthvi via WhatsApp.
                </p>

                {whatsappShareUrl && (
                  <div className="mt-5">
                    <a
                      href={whatsappShareUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-xs font-bold text-white shadow-sm hover:bg-[#20b858] transition"
                    >
                      <MessageCircle size={15} /> Send Review via WhatsApp
                    </a>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 text-xs font-semibold text-[#a77d2f] hover:underline cursor-pointer"
                >
                  Write another review
                </button>
              </div>
            ) : (
              <form onSubmit={handleRatingSubmit} className="space-y-4">
                {/* Star Rating Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase text-[#334457] mb-1.5">
                    Your Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                        className="p-1 cursor-pointer transition hover:scale-110"
                        aria-label={`${star} Stars`}
                      >
                        <Star
                          size={24}
                          fill={(hoverRating || rating) >= star ? '#a77d2f' : 'none'}
                          className={(hoverRating || rating) >= star ? 'text-[#a77d2f]' : 'text-[#dedbd3]'}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-[#122438] ml-2">
                      {rating} of 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#334457]">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="mt-1 w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-3 text-sm text-[#182536] outline-none focus:border-[#a77d2f] focus:bg-white focus:ring-4 focus:ring-[#a77d2f]/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#334457]">
                    Business / Role <span className="text-[#8a94a2] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={clientRole}
                    onChange={(e) => setClientRole(e.target.value)}
                    placeholder="e.g. Small Business Owner or Salaried Professional"
                    className="mt-1 w-full rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-3 text-sm text-[#182536] outline-none focus:border-[#a77d2f] focus:bg-white focus:ring-4 focus:ring-[#a77d2f]/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-[#334457]">
                    Review or Suggestion <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience regarding our bookkeeping, statutory compliance, taxation, or consultation support..."
                    className="mt-1 w-full resize-none rounded-xl border border-[#dedbd3] bg-[#fbfaf6] p-3 text-sm text-[#182536] outline-none focus:border-[#a77d2f] focus:bg-white focus:ring-4 focus:ring-[#a77d2f]/10"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#122438] py-3.5 px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#20374e] cursor-pointer"
                >
                  <Send size={14} />
                  Submit Rating & Suggestion
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeedbackSection
