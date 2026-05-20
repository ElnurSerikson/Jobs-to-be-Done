import type { VercelRequest, VercelResponse } from '@vercel/node'

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'

const SYSTEM_PROMPT = `Придумай ОДНУ случайную идею стартапа или продукта одним коротким предложением на русском.
Может быть обычной или абсурдно-смешной — неважно, это «подкинь идею» для пользователя, у которого своей нет.
Пиши СТРОГО на русском, без иностранных слов и иероглифов. Верни ТОЛЬКО текст идеи — без кавычек, нумерации и пояснений.`

const FALLBACK = [
  'Подписка на доставку случайного носка раз в неделю',
  'Приложение, которое лает на тебя, когда ты ленишься',
  'Соцсеть, где постить можно только в 3 часа ночи',
  'Умный холодильник, который стыдит за ночные перекусы',
  'Сервис аренды комнатных растений на один вечер',
  'Будильник, который звонит голосом твоей мамы',
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
        temperature: 1.1,
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
