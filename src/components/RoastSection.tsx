import type { ForceScore } from '../types'
import { parseBold } from '../lib/score'
import { ScoreDial } from './ScoreDial'

function BoldText({ text }: { text: string }) {
  return (
    <>
      {parseBold(text).map((seg, i) =>
        seg.bold ? (
          <strong key={i} className="font-semibold text-foreground">
            {seg.text}
          </strong>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </>
  )
}

export function RoastSection({ forces }: { forces: ForceScore[] }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Суровый разбор
      </h2>
      <div className="space-y-5">
        {forces.map((f) => (
          <div key={f.force} className="flex gap-4">
            <ScoreDial score={f.score} size="sm" outOfFive />
            <div>
              <p className="font-semibold text-foreground">
                {f.label} · <span className="font-mono">{f.score}/5</span>
              </p>
              <p className="mt-1 leading-relaxed text-muted-foreground">
                <BoldText text={f.text} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
