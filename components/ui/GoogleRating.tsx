import { Star } from 'lucide-react';
import { BUSINESS } from '@/lib/business';
import type { GoogleRating as GoogleRatingData } from '@/lib/googleRating';

interface GoogleRatingProps {
  review: GoogleRatingData;
  /** `badge` = pílula com borda; `inline` = só estrelas + texto (para o hero). */
  variant?: 'badge' | 'inline';
  className?: string;
}

export const GoogleRating = ({ review, variant = 'badge', className = '' }: GoogleRatingProps) => {
  const ratingText = review.rating.toLocaleString('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const variantClasses =
    variant === 'badge'
      ? 'rounded-full border border-border px-5 py-2.5 hover:border-primary'
      : '';

  return (
    <a
      href={BUSINESS.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Nota ${ratingText} de 5 com ${review.count} avaliações no Google`}
      className={`inline-flex items-center gap-2 font-serif text-sm text-foreground/80 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${variantClasses} ${className}`}
    >
      <span className="flex shrink-0 gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
        ))}
      </span>
      <span>
        <span className="text-primary">{ratingText}</span> no Google · {review.count} avaliações
      </span>
    </a>
  );
};
