import type { VercelRequest, VercelResponse } from '@vercel/node'

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'

const SYSTEM_PROMPT = `Придумай ОДНУ короткую, АБСУРДНУЮ и СМЕШНУЮ идею стартапа или продукта — одним предложением на русском.
Чем нелепее и неожиданнее, тем лучше: бытовая вещь с дикой функцией, странная услуга или абсурдная аудитория. Это кнопка «подкинь идею» для развлечения — юмор ОБЯЗАТЕЛЕН, банальности под запретом.
Тон-ориентиры: «аренда собачек на вечер», «блютус-шапочки для енотов», «подписка на чужие несбывшиеся мечты», «тиндер для комнатных растений», «сервис проката оправданий».
Пиши СТРОГО на русском, без иностранных слов и иероглифов. Верни ТОЛЬКО текст идеи — без кавычек, нумерации и пояснений.`

const FALLBACK = [
  'Аренда чужих собак на вечер — выгулял и вернул',
  'Блютус-шапочки для енотов с подогревом',
  'Подписка на ежедневный комплимент от незнакомца',
  'Сервис, который придумывает тебе оправдания за прогулы',
  'Тиндер для комнатных растений, которым одиноко',
  'Будильник, который оскорбляет тебя, пока ты не встанешь',
  'Доставка одного носка в неделю — второй ищи сам',
]

function pickFallback(): string {
  return FALLBACK[Math.floor(Math.random() * FALLBACK.length)]
}

// Этот эндпоинт всегда отдаёт идею (200) — даже без ключа/при сбое возвращает запасную.
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const key = process.env.GROQ_API_KEY
  if (!key) {
    return res.status(200).json({ idea: pickFallback() })
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
        temperature: 1.2,
        max_tokens: 80,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: 'Подкинь идею.' },
        ],
      }),
    })

    if (!groqRes.ok) {
      return res.status(200).json({ idea: pickFallback() })
    }

    const data = await groqRes.json()
    let idea = (data?.choices?.[0]?.message?.content ?? '').toString().trim()
    idea = idea.replace(/\*\*/g, '').replace(/^["'«»\s]+|["'«»\s]+$/g, '').trim()
    if (!idea) idea = pickFallback()

    return res.status(200).json({ idea })
  } catch {
    return res.status(200).json({ idea: pickFallback() })
  }
}
