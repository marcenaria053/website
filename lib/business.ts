import type { GoogleRating } from './googleRating';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.053moveissobmedida.com';

const MAPS_QUERY = '053 Móveis Sob Medida, R. Adalberto Guerra Duval, 258 - Fragata, Pelotas - RS';

/** Dados do negócio (NAP) — fonte única para JSON-LD, footer e SEO local. */
export const BUSINESS = {
  name: '053 Móveis Sob Medida',
  url: SITE_URL,
  image: `${SITE_URL}/hero-053.webp`,
  telephone: '+5553999829915',
  phoneDisplay: '(53) 99982-9915',
  googleProfileUrl: 'https://share.google/xcN8jikkFYs6lDqaa',
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`,
  instagramUrl: 'https://www.instagram.com/053moveissobmedida',
  address: {
    streetAddress: 'R. Adalberto Guerra Duval, 258 - Fragata',
    addressLocality: 'Pelotas',
    addressRegion: 'RS',
    postalCode: '96040-200',
    addressCountry: 'BR',
  },
  areaServed: 'Pelotas e região',
} as const;

/**
 * JSON-LD LocalBusiness (FurnitureStore). O `aggregateRating` só entra quando
 * há nota real do Google — nunca é inventado.
 */
export const buildBusinessJsonLd = (review?: GoogleRating | null) => ({
  '@context': 'https://schema.org',
  '@type': 'FurnitureStore',
  '@id': `${SITE_URL}/#business`,
  name: BUSINESS.name,
  image: BUSINESS.image,
  url: BUSINESS.url,
  telephone: BUSINESS.telephone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BUSINESS.address.streetAddress,
    addressLocality: BUSINESS.address.addressLocality,
    addressRegion: BUSINESS.address.addressRegion,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.addressCountry,
  },
  areaServed: BUSINESS.areaServed,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:30',
    },
  ],
  sameAs: [BUSINESS.googleProfileUrl, BUSINESS.instagramUrl],
  ...(review && {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: review.rating,
      reviewCount: review.count,
    },
  }),
});
