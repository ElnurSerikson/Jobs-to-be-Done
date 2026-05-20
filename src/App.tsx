import { useCallback, useRef, useState } from 'react'
import { Loader2, Sparkles } from 'lucide-react'
import type { Analysis } from './types'
import { analyzeIdea, suggestIdea } from './lib/llm'
import { IdeaInput } from './components/IdeaInput'
import { LoadingSkeleton } from './components/LoadingSkeleton'
import { ResultView } from './components/ResultView'
import { ErrorState } from './components/ErrorState'

type Status = 'idle' | 'loading' | 'done' | 'error'

export default function App() {
  const [status, setStatus] = useState<Status>('idle')
  const [idea, setIdea] = useState('')
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [suggesting, setSuggesting] = useState(false)

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const runAnalysis = useCallback(async () => {
    if (idea.trim() === '') return
    setStatus('loading')
    setAnalysis(null)
    try {
      const result = await analyzeIdea(idea)
      setAnalysis(result)
      setStatus('done')
      requestAnimationFrame(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } catch {
      setStatus('error')
    }
  }, [idea])

  const handleReset = useCallback(() => {
    setStatus('idle')
    setAnalysis(null)
    setIdea('')
    requestAnimationFrame(() => textareaRef.current?.focus())
  }, [])

  const handleSuggest = useCallback(async () => {
    setSuggesting(true)
    try {
      const suggested = await suggestIdea()
      setIdea(suggested)
      requestAnimationFrame(() => textareaRef.current?.focus())
    } finally {
      setSuggesting(false)
    }
  }, [])

  const isIdle = status === 'idle'

  return (
    <main
      className={`mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 py-10 sm:px-6 ${
        isIdle ? 'justify-center' : 'justify-start'
      }`}
    >
      {isIdle && (
        <button
          type="button"
          onClick={handleSuggest}
          disabled={suggesting}
          title="Нет идеи? Пусть ИИ подкинет"
          aria-label="Подкинуть случайную идею от ИИ"
          className="fixed right-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:border-accent/50 hover:text-foreground disabled:opacity-60"
        >
          {suggesting ? (
            <Loader2 className="h-4 w-4 animate-spin text-accent" aria-hidden />
          ) : (
            <Sparkles className="h-4 w-4 text-accent" aria-hidden />
          )}
          AI
        </button>
      )}

      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Прожарка идеи
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Жёсткий разбор по Jobs-to-be-Done: Push · Pull · Inertia
        </p>
      </header>

      {status !== 'done' && (
        <IdeaInput
          ref={textareaRef}
          value={idea}
          onChange={setIdea}
          onSubmit={runAnalysis}
          loading={status === 'loading'}
        />
      )}

      {status === 'loading' && <LoadingSkeleton />}

      {status === 'error' && <ErrorState onRetry={runAnalysis} />}

      {status === 'done' && analysis && (
        <div ref={resultRef} className="scroll-mt-6">
          <ResultView idea={idea} analysis={analysis} onReset={handleReset} />
        </div>
      )}
    </main>
  )
}
