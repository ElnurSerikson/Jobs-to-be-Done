export type Force = 'push' | 'pull' | 'inertia' | 'anxiety'

export interface ForceScore {
  force: Force
  label: string // "Боль (Push)", "Магнит (Pull)", "Лёгкость (Inertia)", "Тревога (Anxiety)"
  score: number // 1–5 (целое). Для anxiety выше = больше тревоги (хуже).
  text: string // абзац разбора, может содержать **жирные** фрагменты
}

export type OfferStrength = 'strong' | 'medium' | 'weak'

export interface Offer {
  id: string
  angle: string // "Агрессор" | "Магнит" | "Стелс" | "Гарант"
  angleHint: string // "Упор на Push" | "Упор на Pull" | "Упор на Inertia" | "Упор на Anxiety"
  headline: string // продающий УТП-заголовок (как H1 на лендинге), без кавычек
  support: string // 1 короткая строка-расшифровка / механика
  strength: OfferStrength // честная оценка убедительности угла под идею
}

export interface QuestionGroup {
  force: Force
  label: string // ярлык силы: "Боль (Push)" и т.д.
  questions: string[] // 2–3 кастдев-вопроса для проверки этой силы
}

export interface Analysis {
  score: number // агрегат 1.0–5.0 (1 знак), тревога входит инверсией (6 − балл)
  verdict: string // короткая фраза
  forces: ForceScore[] // ровно 4: push, pull, inertia, anxiety
  offers: Offer[] // ровно 4: push, pull, inertia, anxiety
  questions: QuestionGroup[] // 4 группы по силам, по 2–3 вопроса (≈12)
}

export interface PivotVariant {
  title: string
  text: string
}

export interface PivotResult {
  targetScore: number // 5.0
  variants: PivotVariant[] // 2–3 улучшенных направления идеи
}
