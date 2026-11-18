function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left', // 'left', 'center'
  className = '',
  light = false,
}) {
  const isCenter = align === 'center'

  return (
    <div className={`${isCenter ? 'text-center mx-auto' : ''} max-w-3xl ${className}`}>
      {eyebrow && (
        <span
          className={`inline-block text-xs font-bold uppercase tracking-[0.22em] ${
            light ? 'text-[#d9b96d]' : 'text-[#a77d2f]'
          }`}
        >
          {eyebrow}
        </span>
      )}

      {title && (
        <h2
          className={`font-display mt-3 text-3xl sm:text-4xl lg:text-5xl leading-tight font-normal ${
            light ? 'text-white' : 'text-[#122438]'
          }`}
        >
          {title}
        </h2>
      )}

      {description && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            isCenter ? 'mx-auto' : ''
          } ${light ? 'text-[#b9c4cf]' : 'text-[#687385]'}`}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionTitle
