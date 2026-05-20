import { Check } from 'lucide-react'

export interface Step {
  id: string
  label: string
}

interface StepperProps {
  steps: Step[]
  current: number
  onJump: (index: number) => void
}

export function Stepper({ steps, current, onJump }: StepperProps) {
  return (
    <nav aria-label="Шаги разбора">
      <ol className="flex items-center">
        {steps.map((step, i) => {
          const done = i < current
          const active = i === current
          const reached = done || active

          return (
            <li key={step.id} className="flex flex-1 items-center last:flex-none">
              <button
                type="button"
                onClick={() => onJump(i)}
                aria-current={active ? 'step' : undefined}
                className="group flex flex-col items-center gap-1.5"
              >
                <span
                  className={[
                    'flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors',
                    reached
                      ? 'border-accent bg-accent text-accent-foreground'
                      : 'border-border bg-card text-muted-foreground group-hover:border-accent/50',
                    active ? 'ring-4 ring-accent/20' : '',
                  ].join(' ')}
                >
                  {done ? <Check className="h-4 w-4" aria-hidden /> : i + 1}
                </span>
                <span
                  className={[
                    'hidden text-xs font-medium transition-colors sm:block',
                    active ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground',
                  ].join(' ')}
                >
                  {step.label}
                </span>
              </button>

              {i < steps.length - 1 && (
                <span className="mx-2 mb-5 h-0.5 flex-1 overflow-hidden rounded-full bg-border sm:mb-6">
                  <span
                    className={`block h-full rounded-full bg-accent transition-all duration-300 ${
                      done ? 'w-full' : 'w-0'
                    }`}
                  />
                </span>
              )}
            </li>
          )
        })}
      </ol>

      <p className="mt-3 text-center text-xs text-muted-foreground sm:hidden">
        Шаг {current + 1} из {steps.length} · {steps[current].label}
      </p>
    </nav>
  )
}
