import { scoreBand, formatScore } from '../lib/score'

interface ScoreDialProps {
  score: number
  size?: 'lg' | 'sm'
  /** Для мини-дайла сил: показывать как «4/5» вместо «4.0». */
  outOfFive?: boolean
  /** Подпись «баллов» внутри большого круга. */
  unit?: boolean
  /** Красить по инверсии (для тревоги: высокий балл → красный). Число — настоящее. */
  invert?: boolean
}

export function ScoreDial({
  score,
  size = 'lg',
  outOfFive = false,
  unit = false,
  invert = false,
}: ScoreDialProps) {
  const band = scoreBand(invert ? 6 - score : score)
  const isLg = size === 'lg'

  const label = outOfFive ? `${Math.round(score)}` : formatScore(score)

  return (
    <div
      className={[
        'flex shrink-0 flex-col items-center justify-center rounded-full font-mono font-bold leading-none tabular-nums',
        band.dialBg,
        band.dialText,
        isLg ? 'h-20 w-20 shadow-md' : 'h-11 w-11 text-base',
      ].join(' ')}
      aria-label={outOfFive ? `${label} из 5 баллов` : `Оценка ${label} из 5.0 баллов`}
    >
      <span className={isLg ? 'text-2xl' : ''}>{label}</span>
      {isLg && unit && (
        <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-wide opacity-80">
          баллов
        </span>
      )}
    </div>
  )
}
