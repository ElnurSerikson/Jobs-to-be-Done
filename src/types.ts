export type Force = 'push' | 'pull' | 'inertia'

export interface ForceScore {
  force: Force
  label: string // "Боль (Push)", "Магнит (Pull)", "Лёгкость (Inertia)"
  score: number // 1–5 (целое)
  text: string // абзац разбора, может содержать **жирные** фрагменты
}

export interface Offer {
  id: string
  title: string // "Агрессор" | "Магнит" | "Стелс"
  subtitle: string // "Упор на Push" / "Упор на Pull" / "Упор на Inertia"
  text: string // текст офера для копирования
}

export interface Analysis {
  score: number // агрегат 1.0–5.0 (1 знак)
  verdict: string // короткая фраза
  forces: ForceScore[] // ровно 3
  offers: Offer[] // ровно 3
  questions: string[] // ровно 3
}

export interface PivotVariant {
  title: string
  text: string
}

export interface PivotResult {
  targetScore: number // 5.0
  variants: PivotVariant[] // 2–3 улучшенных направления идеи
}
