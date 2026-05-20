// Пульсирующий скелет под полем — сигнал, что запрос ушёл.
export function LoadingSkeleton() {
  return (
    <div
      className="mt-8 animate-pulse"
      role="status"
      aria-live="polite"
      aria-label="Анализирую идею"
    >
      <div className="flex items-center gap-5">
        <div className="h-20 w-20 shrink-0 rounded-full bg-muted" />
        <div className="flex-1 space-y-3">
          <div className="h-4 w-3/4 rounded bg-muted" />
          <div className="h-4 w-1/2 rounded bg-muted" />
        </div>
      </div>
      <div className="mt-6 h-28 rounded-2xl bg-card" />
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="h-32 rounded-2xl bg-card" />
        <div className="h-32 rounded-2xl bg-card" />
        <div className="h-32 rounded-2xl bg-card" />
      </div>
      <span className="sr-only">Анализирую идею, подождите…</span>
    </div>
  )
}
