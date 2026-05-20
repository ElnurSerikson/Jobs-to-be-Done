import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { Analysis, PivotResult } from '../src/types'

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'

const SYSTEM_PROMPT = `Ты — острый венчурный аналитик. Тебе дают бизнес-идею и её разбор по Jobs-to-be-Done с баллами по 4 силам (push/боль, pull/магнит, inertia/лёгкость, anxiety/тревога). Дай РОВНО 3 совета, как докрутить ИМЕННО эту идею до 5.0.

Правила:
1. Бей в САМЫЕ СЛАБЫЕ силы из разбора (низкий балл; для тревоги — высокий). Усиливай дыры, а не то, что и так сильно.
2. Каждый совет — КОНКРЕТНОЕ изменение под ЭТУ идею: что именно поменять в продукте, модели или аудитории и какую слабую силу это поднимет. Не общие мантры.
3. Только реальные, применимые ходы — без фантазий и «прорывных» лозунгов. Не усиливает реальную слабость этой идеи — не предлагай.
4. Три РАЗНЫХ по сути приёма, а не три формулировки одного. НЕ давай дежурных шаблонов, которые подходят к любой идее.

Стиль: жёстко, по делу. ЯЗЫК: пиши СТРОГО на русском — без иностранных слов, латиницы (кроме Push, Pull, Inertia, CRM, MVP, B2B), иероглифов и случайных символов.

Пример хорошо (слабый Pull у CRM-квалификатора): title «Привязать к деньгам, а не к удобству» — text «Меняй обещание с "удобнее квалифицировать" на "+X закрытых сделок к выручке" — тогда результат перестаёт быть "приятно иметь" и Pull растёт.»
Пример плохо (ленивая мантра, НЕ пиши так): «Сузить до одного сегмента рынка».

Верни ТОЛЬКО валидный JSON (json) без markdown-обёртки, строго по схеме:
{ "variants": [ { "title": "краткий заголовок приёма", "text": "1-2 предложения: что именно сделать и какую слабую силу это усилит" } ] }
Ровно 3 варианта.`

function str(v: unknown, fallback = ''): string {
  const s = typeof v === 'string' && v.trim() ? v.trim() : fallback
  return s.replace(/\*\*/g, '')
}

function assemblePivot(raw: any): PivotResult {
  const variants = Array.isArray(raw?.variants)
    ? raw.variants
        .map((v: any) => ({ title: str(v?.title), text: str(v?.text) }))
        .filter((v: { title: string; text: string }) => v.title && v.text)
        .slice(0, 3)
    : []

  while (variants.length < 1) {
    variants.push({
      title: 'Сузить до горящего сегмента',
      text: 'Найди нишу, где проблему терпят ежедневно и она стоит денег — узкий сегмент купит быстрее.',
    })
  }

  return { targetScore: 5.0, variants }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const key = process.env.GROQ_API_KEY
  if (!key) {
    return res.status(500).json({ error: 'GROQ_API_KEY is not configured' })
  }

  const idea = (req.body?.idea ?? '').toString().trim()
  const analysis = req.body?.analysis as Analysis | undefined
  if (!idea) {
    return res.status(400).json({ error: 'idea is required' })
  }

  let scoreLine = ''
  if (analysis) {
    const fav = (f: Analysis['forces'][number]) => (f.force === 'anxiety' ? 6 - f.score : f.score)
    const forcesLine = analysis.forces.map((f) => `${f.label} ${f.score}/5`).join(', ')
    const weak = [...analysis.forces]
      .sort((a, b) => fav(a) - fav(b))
      .slice(0, 2)
      .map((f) => f.label)
      .join(' и ')
    scoreLine = `Текущая оценка: ${analysis.score}/5. Силы: ${forcesLine}. Слабее всего: ${weak} — бей сюда в первую очередь.`
  }

  try {
    const groqRes = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.65,
        max_tokens: 1024,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `Идея: «${idea}». ${scoreLine}` },
        ],
      }),
    })

    if (!groqRes.ok) {
      const detail = await groqRes.text()
      return res.status(502).json({ error: 'LLM request failed', detail: detail.slice(0, 500) })
    }

    const data = await groqRes.json()
    const content = data?.choices?.[0]?.message?.content
    if (!content) {
      return res.status(502).json({ error: 'Empty LLM response' })
    }

    let parsed: unknown
    try {
      parsed = JSON.parse(content)
    } catch {
      return res.status(502).json({ error: 'LLM returned non-JSON' })
    }

    return res.status(200).json(assemblePivot(parsed))
  } catch (e) {
    return res.status(500).json({ error: 'Unexpected error', detail: String(e).slice(0, 300) })
  }
}
