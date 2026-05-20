import { Loader2, Sparkles } from 'lucide-react'
import type { PivotResult } from '../types'
import { formatScore } from '../lib/score'
import { Reveal } from './Reveal'

export type PivotStatus = 'idle' | 'loading' | 'done'

interface PivotSectionProps {
  status: PivotStatus
  result: PivotResult | null
  score: number
}

export function PivotSection({ status, result, score }: PivotSectionProps) {
  if (status !== 'done' || !result) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-10 text-center">
        <Loader2 className="h-7 w-7 animate-spin text-accent" aria-hidden />
        <p className="text-sm font-medium text-accent">Докручиваю идею до 5.0…</p>
      </div>
    )
  }

  return (
    <section className="rounded-2xl border border-accent/30 bg-accent/10 p-6">
      <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent">
        <Sparkles className="h-4 w-4" aria-hidden />
        Как докрутить с {formatScore(score)} до {formatScore(result.targetScore)}
      </h2>
      <div className="mt-4 space-y-4">
        {result.variants.map((v, i) => (
          <Reveal key={i} delay={i * 150}>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="font-semibold text-foreground">{v.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
