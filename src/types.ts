export type Force = 'push' | 'pull' | 'inertia' | 'anxiety'

export interface ForceScore {
  force: Force
  label: string // "Боль (Push)", "Магнит (Pull)", "Лёгкость (Inertia)", "Тревога (Anxiety)"
  score: number // 1–5 (целое). Для anxiety выше = больше тревоги (хуже).
  text: string // абзац разбора, может содержать **жирные** фрагменты
}

export interface Offer {
  id: string
  title: string // "Агрессор" | "Магнит" | "Стелс"
  subtitle: string // "Упор на Push" / "Упор на Pull" / "Упор на Inertia"
  text: string // текст офера для копирования
}

export interface Analysis {
  score: number // агрегат 1.0–5.0 (1 знак), тревога входит инверсией (6 − балл)
  verdict: string // короткая фраза
  forces: ForceScore[] // ровно 4: push, pull, inertia, anxiety
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
