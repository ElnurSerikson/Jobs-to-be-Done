import { Check, Copy } from 'lucide-react'
import type { Offer } from '../types'
import { strengthMeta } from '../lib/score'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'

export function OfferCard({ offer }: { offer: Offer }) {
  const { copied, copy } = useCopyToClipboard()
  const strength = strengthMeta(offer.strength)

  return (
    <article className="relative flex flex-col rounded-2xl border border-border bg-card p-5 shadow-md">
      <button
        type="button"
        onClick={() => copy(`${offer.headline}\n${offer.support}`)}
        aria-label={copied ? 'Скопировано' : 'Скопировать офер'}
        className="absolute right-3 top-3 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-400" aria-hidden />
        ) : (
          <Copy className="h-4 w-4" aria-hidden />
        )}
      </button>

      <p className="pr-8 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {offer.angle} · {offer.angleHint}
      </p>

      <h3 className="mt-2 text-base font-semibold leading-snug text-foreground">
        {offer.headline}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{offer.support}</p>

      <span
        className={`mt-3 inline-flex w-fit items-center rounded-full px-2 py-0.5 text-xs font-semibold ${strength.accentBg} ${strength.accent}`}
      >
        {strength.label} аргумент
      </span>
    </article>
  )
}
