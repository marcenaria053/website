import { createImageUrlBuilder } from '@sanity/image-url';
import { client } from './client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

const builder = client ? createImageUrlBuilder(client) : null;

export function urlForImage(source: SanityImageSource) {
  if (!builder) throw new Error('Sanity client not configured');
  return builder.image(source).auto('format').fit('max');
}

/**
 * Verifica se a imagem do Sanity tem um asset resolvível. Slots vazios
 * (upload incompleto ou imagem removida) chegam sem `asset` e fazem o
 * `urlForImage` lançar "Unable to resolve image URL from source".
 */
export function hasImageAsset(source: SanityImageSource): boolean {
  return Boolean(source?.asset?._ref ?? source?.asset?._id);
}
