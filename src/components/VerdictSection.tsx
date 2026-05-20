import type { Analysis } from '../types'
import { scoreBand, formatScore } from '../lib/score'
import { ScoreDial } from './ScoreDial'

export function VerdictSection({ analysis }: { analysis: Analysis }) {
  const band = scoreBand(analysis.score)

  return (
    <section className="flex items-center gap-5">
      <div className={`rounded-full p-1 ring-2 ${band.ring}`}>
        <ScoreDial score={analysis.score} size="lg" unit />
      </div>
      <div>
        <p className={`text-xs font-semibold uppercase tracking-wide ${band.accent}`}>
          {band.label}
        </p>
        <p className="mt-0.5 text-lg leading-snug text-foreground">
          Идея получила оценку{' '}
          <span className="font-mono font-bold">{formatScore(analysis.score)}</span> из 5.0.{' '}
          <span className="font-semibold">{analysis.verdict}</span>
        </p>
      </div>
    </section>
  )
}
