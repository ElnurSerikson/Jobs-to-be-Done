import type { QuestionGroup } from '../types'
import { scoreBand } from '../lib/score'

interface QuestionsSectionProps {
  questions: QuestionGroup[]
  score: number
}

export function QuestionsSection({ questions, score }: QuestionsSectionProps) {
  const band = scoreBand(score)

  return (
    <section>
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Контрольные вопросы
      </h2>
      <div className="space-y-6">
        {questions.map((group) => (
          <div key={group.force}>
            <h3 className="mb-2 text-sm font-semibold text-foreground">{group.label}</h3>
            <ol className="space-y-2">
              {group.questions.map((q, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold ${band.accentBg} ${band.accent}`}
                  >
                    {i + 1}
                  </span>
                  <p className="pt-0.5 leading-relaxed text-foreground">{q}</p>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  )
}
