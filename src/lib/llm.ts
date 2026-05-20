import type { Analysis, PivotResult } from '../types'
import { analyzeIdea as mockAnalyze, pivotIdea as mockPivot } from './mockEngine'

// Единая точка входа для анализа: в проде зовёт serverless-прокси (/api/*),
// который держит ключ Groq у себя; в DEV (без функции/ключа) — фолбэк на мок.

async function postJSON<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    throw new Error(`API ${res.status}`)
  }
  return (await res.json()) as T
}

export async function analyzeIdea(idea: string): Promise<Analysis> {
  try {
    return await postJSON<Analysis>('/api/analyze', { idea })
  } catch (e) {
    if (import.meta.env.DEV) return mockAnalyze(idea)
    throw e
  }
}

export async function pivotIdea(idea: string, analysis: Analysis): Promise<PivotResult> {
  try {
    return await postJSON<PivotResult>('/api/pivot', { idea, analysis })
  } catch (e) {
    if (import.meta.env.DEV) return mockPivot(idea, analysis)
    throw e
  }
}

// «Подкинь идею» — на случай, если у юзера нет своей. Всегда возвращает строку:
// при любом сбое сети/эндпоинта берём запасную из локального списка.
const FALLBACK_IDEAS = [
  'Аренда собачек на вечер для милого фото',
  'Блютус-шапочки для енотов',
  'Подписка на чужие несбывшиеся мечты',
  'Тиндер для комнатных растений, которым одиноко',
  'Сервис проката оправданий для прогульщиков',
  'Будильник, который звонит голосом твоей бывшей',
  'Маркетплейс невыгулянных собак',
]

export async function suggestIdea(): Promise<string> {
  try {
    const { idea } = await postJSON<{ idea: string }>('/api/idea', {})
    return idea?.trim() || FALLBACK_IDEAS[Math.floor(Math.random() * FALLBACK_IDEAS.length)]
  } catch {
    return FALLBACK_IDEAS[Math.floor(Math.random() * FALLBACK_IDEAS.length)]
  }
}
