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
    <section>
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Суровый разбор
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {forces.map((f) => (
          <article
            key={f.force}
            className="flex gap-4 rounded-xl border border-border bg-card p-4"
          >
            <ScoreDial score={f.score} size="sm" outOfFive invert={f.force === 'anxiety'} />
            <div>
              <p className="font-semibold text-foreground">{f.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                <span className="font-mono">{f.score}/5</span> баллов
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                <BoldText text={f.text} />
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
