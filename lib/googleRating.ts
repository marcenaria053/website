import { cacheLife } from 'next/cache';

/** Place ID público da 053 no Google Maps. */
const GOOGLE_PLACE_ID = 'ChIJvWjUu5HLEZURurjprSh1Rag';

export interface GoogleRating {
  rating: number;
  count: number;
}

/**
 * Nota média e total de avaliações do Google (Places API). Cacheado via
 * `use cache` + `cacheLife('hours')`: a chamada externa entra na shell
 * estática e revalida em background — não roda a cada request. Retorna null
 * se a key estiver ausente ou a chamada falhar (degradação graciosa).
 */
export const getGoogleRating = async (): Promise<GoogleRating | null> => {
  'use cache';
  cacheLife('hours');

  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return null;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}`, {
      headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'rating,userRatingCount' },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (typeof data.rating !== 'number' || typeof data.userRatingCount !== 'number') return null;
    return { rating: data.rating, count: data.userRatingCount };
  } catch {
    return null;
  }
};
