export type Tone = 'red' | 'amber' | 'emerald'

export interface ScoreBand {
  tone: Tone
  label: string // "Труп" | "Слабо" | "Золото"
  dialBg: string // фон круга-дайла
  dialText: string // цвет числа в дайле
  ring: string // цвет обводки/акцентной рамки
  accent: string // акцентный текст (номера вопросов, мини-дайлы)
  accentBg: string // мягкий акцентный фон
}

const BANDS: Record<Tone, ScoreBand> = {
  red: {
    tone: 'red',
    label: 'Труп',
    dialBg: 'bg-red-500',
    dialText: 'text-white',
    ring: 'ring-red-500',
    accent: 'text-red-400',
    accentBg: 'bg-red-500/15',
  },
  amber: {
    tone: 'amber',
    label: 'Слабо',
    dialBg: 'bg-amber-400',
    dialText: 'text-black',
    ring: 'ring-amber-400',
    accent: 'text-amber-400',
    accentBg: 'bg-amber-500/15',
  },
  emerald: {
    tone: 'emerald',
    label: 'Золото',
    dialBg: 'bg-emerald-500',
    dialText: 'text-white',
    ring: 'ring-emerald-500',
    accent: 'text-emerald-400',
    accentBg: 'bg-emerald-500/15',
  },
}

// Диапазоны по ТЗ: 1.0–2.5 красный, 2.6–3.8 жёлтый, 3.9–5.0 зелёный.
export function toneForScore(score: number): Tone {
  if (score <= 2.5) return 'red'
  if (score <= 3.8) return 'amber'
  return 'emerald'
}

export function scoreBand(score: number): ScoreBand {
  return BANDS[toneForScore(score)]
}

export function formatScore(score: number): string {
  return score.toFixed(1)
}

// Разбивает строку с **жирными** фрагментами на сегменты для рендера.
export interface BoldSegment {
  text: string
  bold: boolean
}

export function parseBold(input: string): BoldSegment[] {
  const segments: BoldSegment[] = []
  const regex = /\*\*(.+?)\*\*/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(input)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: input.slice(lastIndex, match.index), bold: false })
    }
    segments.push({ text: match[1], bold: true })
    lastIndex = regex.lastIndex
  }

  if (lastIndex < input.length) {
    segments.push({ text: input.slice(lastIndex), bold: false })
  }

  return segments
}
