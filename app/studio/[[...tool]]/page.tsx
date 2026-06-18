'use client';

import dynamic from 'next/dynamic';

const NextStudio = dynamic(() => import('next-sanity/studio').then((m) => m.NextStudio), {
  ssr: false,
});

export default function StudioPage() {
  // Dynamic import of config to avoid server-side evaluation issues
  const config = require('../../../sanity.config').default;
  return <NextStudio config={config} />;
}
