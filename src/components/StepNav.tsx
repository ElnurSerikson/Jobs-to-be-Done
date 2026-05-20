import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'
import type { Step } from './Stepper'

interface StepNavProps {
  steps: Step[]
  current: number
  onPrev: () => void
  onNext: () => void
  onReset: () => void
}

export function StepNav({ steps, current, onPrev, onNext, onReset }: StepNavProps) {
  const isFirst = current === 0
  const isLast = current === steps.length - 1

  return (
    <div className={`flex items-center gap-3 ${isFirst ? 'justify-end' : 'justify-between'}`}>
      {!isFirst && (
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-card"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {steps[current - 1].label}
        </button>
      )}

      {isLast ? (
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98]"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          Начать заново
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:bg-accent/90 active:scale-[0.98]"
        >
          {steps[current + 1].label}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      )}
    </div>
  )
}
