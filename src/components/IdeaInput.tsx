import { forwardRef } from 'react'
import { Flame, Loader2, Sparkles } from 'lucide-react'

interface IdeaInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onSuggest: () => void
  suggesting: boolean
  loading: boolean
}

export const IdeaInput = forwardRef<HTMLTextAreaElement, IdeaInputProps>(
  ({ value, onChange, onSubmit, onSuggest, suggesting, loading }, ref) => {
    const empty = value.trim() === ''
    const disabled = empty || loading

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Cmd/Ctrl+Enter — быстрый запуск.
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && !disabled) {
        e.preventDefault()
        onSubmit()
      }
    }

    return (
      <div className="flex flex-col gap-3">
        <div className="relative">
          <textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            rows={3}
            placeholder="Опиши свою идею. Чем конкретнее — тем лучше прожарка."
            aria-label="Идея для анализа"
            className="w-full resize-none rounded-xl border border-border bg-card py-3 pl-4 pr-16 text-base leading-relaxed text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:opacity-60"
          />

          <button
            type="button"
            onClick={onSuggest}
            disabled={loading || suggesting}
            title="Нет идеи? Пусть ИИ подкинет"
            aria-label="Подкинуть случайную идею от ИИ"
            className="absolute right-2 top-2 flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground disabled:opacity-60"
          >
            {suggesting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" aria-hidden />
            ) : (
              <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
            )}
            AI
          </button>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={onSubmit}
            disabled={disabled}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Думаю…
              </>
            ) : (
              <>
                <Flame className="h-4 w-4" aria-hidden />
                Прожарить идею
              </>
            )}
          </button>
        </div>
      </div>
    )
  },
)

IdeaInput.displayName = 'IdeaInput'
