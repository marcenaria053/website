import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

const builder = client ? imageUrlBuilder(client) : null;

export function urlForImage(source: SanityImageSource) {
  if (!builder) throw new Error('Sanity client not configured');
  return builder.image(source).auto('format').fit('max');
}
