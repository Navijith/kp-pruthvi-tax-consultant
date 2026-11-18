import { Loader2 } from 'lucide-react'

function Button({
  children,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'gold', 'danger', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  type = 'button',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  icon: Icon,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none'

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-3 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  }

  const variantStyles = {
    primary: 'bg-[#122438] text-white hover:bg-[#20374e] focus:ring-[#122438]',
    gold: 'bg-[#e3c474] text-[#122438] hover:bg-[#edd48e] focus:ring-[#e3c474]',
    secondary: 'bg-[#eef1ef] text-[#2c5a4d] hover:bg-[#e2e8e4] focus:ring-[#2c5a4d]',
    outline: 'border border-[#dedbd3] bg-white text-[#122438] hover:bg-[#fbfaf6] hover:border-[#b89a58] focus:ring-[#b89a58]',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
    ghost: 'text-[#536071] hover:bg-[#f2e8cf]/50 hover:text-[#122438]',
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin shrink-0" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="h-4 w-4 shrink-0" />}
          {children}
        </>
      )}
    </button>
  )
}

export default Button
