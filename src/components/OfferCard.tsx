import { Check, Copy } from 'lucide-react'
import type { Offer } from '../types'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'

export function OfferCard({ offer }: { offer: Offer }) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <article className="relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-md">
      <button
        type="button"
        onClick={() => copy(offer.text)}
        aria-label={copied ? 'Скопировано' : 'Скопировать офер'}
        className="absolute right-4 top-4 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-400" aria-hidden />
        ) : (
          <Copy className="h-4 w-4" aria-hidden />
        )}
      </button>

      <h3 className="pr-8 font-semibold text-foreground">{offer.title}</h3>
      <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {offer.subtitle}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{offer.text}</p>
    </article>
  )
}
