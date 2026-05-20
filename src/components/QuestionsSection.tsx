import { scoreBand } from '../lib/score'

interface QuestionsSectionProps {
  questions: string[]
  score: number
}

export function QuestionsSection({ questions, score }: QuestionsSectionProps) {
  const band = scoreBand(score)

  return (
    <section>
      <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Контрольные вопросы
      </h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Задай их потенциальным клиентам — можно прямо переслать в мессенджер.
      </p>
      <ol className="space-y-4">
        {questions.map((q, i) => (
          <li key={i} className="flex gap-3">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold ${band.accentBg} ${band.accent}`}
            >
              {i + 1}
            </span>
            <p className="pt-0.5 leading-relaxed text-foreground">{q}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
