import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SITE_URL, businessJsonLd } from '@/lib/business';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: '053 Móveis Sob Medida',
  description: 'Móveis sob medida de alto padrão com entrega rigorosamente no prazo. Pelotas.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="pt-BR" className={`${playfair.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        {children}
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
