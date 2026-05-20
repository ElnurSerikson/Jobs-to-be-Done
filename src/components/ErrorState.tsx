import { AlertTriangle, RotateCcw } from 'lucide-react'

interface ErrorStateProps {
  onRetry: () => void
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div
      className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-destructive/40 bg-destructive/10 p-8 text-center"
      role="alert"
    >
      <AlertTriangle className="h-8 w-8 text-destructive" aria-hidden />
      <div>
        <p className="font-semibold text-foreground">Не получилось прожарить идею</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Что-то пошло не так при анализе. Попробуй ещё раз.
        </p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        <RotateCcw className="h-4 w-4" aria-hidden />
        Попробовать снова
      </button>
    </div>
  )
}
