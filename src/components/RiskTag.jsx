const RISK_STYLES = {
  low: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    dot: 'bg-green-500',
    label: 'Conservative'
  },
  medium: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    dot: 'bg-yellow-500',
    label: 'Moderate'
  },
  high: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    dot: 'bg-red-500',
    label: 'Aggressive'
  }
}

export default function RiskTag({ risk, size = 'default' }) {
  const style = RISK_STYLES[risk.toLowerCase()] || RISK_STYLES.medium
  const sizeClasses = size === 'small' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1'

  return (
    <span 
      className={`
        inline-flex items-center gap-1.5 rounded-full font-medium
        ${style.bg} ${style.text} ${sizeClasses}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
      {style.label}
    </span>
  )
}