import { scoreBand, formatScore } from '../lib/score'

interface ScoreDialProps {
  score: number
  size?: 'lg' | 'sm'
  /** Для мини-дайла сил: показывать как «4/5» вместо «4.0». */
  outOfFive?: boolean
}

export function ScoreDial({ score, size = 'lg', outOfFive = false }: ScoreDialProps) {
  const band = scoreBand(score)
  const isLg = size === 'lg'

  const label = outOfFive ? `${Math.round(score)}` : formatScore(score)

  return (
    <div
      className={[
        'flex shrink-0 items-center justify-center rounded-full font-mono font-bold tabular-nums',
        band.dialBg,
        band.dialText,
        isLg ? 'h-20 w-20 text-3xl shadow-md' : 'h-11 w-11 text-base',
      ].join(' ')}
      aria-label={outOfFive ? `${label} из 5` : `Рейтинг ${label} из 5.0`}
    >
      {label}
    </div>
  )
}
