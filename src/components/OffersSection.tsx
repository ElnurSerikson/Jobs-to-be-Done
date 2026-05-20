import type { Offer } from '../types'
import { OfferCard } from './OfferCard'

export function OffersSection({ offers }: { offers: Offer[] }) {
  return (
    <section>
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Варианты оферов
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  )
}
