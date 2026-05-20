import { useEffect, useState, type ReactNode } from 'react'

interface RevealProps {
  delay?: number // мс до появления
  children: ReactNode
  className?: string
}

// Каскадное появление: fade-in + slide-up. Уважает prefers-reduced-motion.
export function Reveal({ delay = 0, children, className = '' }: RevealProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <div
      className={[
        'transition-all duration-500 ease-out motion-reduce:transition-none',
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-3 motion-reduce:translate-y-0',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}
