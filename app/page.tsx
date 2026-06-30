import { cacheTag } from 'next/cache';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { HOME_QUERY } from '@/sanity/lib/queries';
import type { HomeData, SiteConfig } from '@/lib/types';
import { Navbar } from '@/components/sections/Navbar';
import { Hero, HERO_DEFAULTS } from '@/components/sections/Hero';
import { Ticker } from '@/components/sections/Ticker';
import { Process } from '@/components/sections/Process';
import { Services } from '@/components/sections/Services';
import { Portfolio } from '@/components/sections/Portfolio';
import { InlineCtaBanner } from '@/components/sections/InlineCtaBanner';
import { MetricsBar } from '@/components/sections/MetricsBar';
import { About } from '@/components/sections/About';
import { Testimonials } from '@/components/sections/Testimonials';
import { CtaFinal } from '@/components/sections/CtaFinal';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { getGoogleRating } from '@/lib/googleRating';
import { urlForImage } from '@/sanity/lib/image';

async function getHomeData(): Promise<HomeData> {
  'use cache';
  cacheTag('home');

  if (!client) {
    return { siteConfig: null, projects: [], services: [], testimonials: [], about: null };
  }

  return client.fetch<HomeData>(HOME_QUERY);
}

const defaultSiteConfig: SiteConfig = {
  name: '053 Móveis Sob Medida',
  whatsappNumber: '5511987654321',
  whatsappMessage: 'Olá! Gostaria de solicitar um orçamento.',
  city: 'Pelotas',
  metaTitle: '053 Móveis Sob Medida | Marcenaria de Luxo em Pelotas',
  metaDescription:
    'Móveis sob medida de alto padrão com entrega rigorosamente no prazo. Pelotas e região.',
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomeData();
  const config = data.siteConfig ?? defaultSiteConfig;
  const ogImageUrl = config.ogImage ? urlForImage(config.ogImage).width(1200).height(630).url() : undefined;

  return {
    title: config.metaTitle ?? defaultSiteConfig.metaTitle,
    description: config.metaDescription ?? defaultSiteConfig.metaDescription,
    openGraph: {
      title: config.metaTitle ?? defaultSiteConfig.metaTitle,
      description: config.metaDescription ?? defaultSiteConfig.metaDescription,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : [],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.metaTitle ?? defaultSiteConfig.metaTitle,
      description: config.metaDescription ?? defaultSiteConfig.metaDescription,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}

export default async function HomePage() {
  const data = await getHomeData();

  const siteConfig = data.siteConfig ?? defaultSiteConfig;
  const heroSubtitle = siteConfig.hero?.subtitle ?? HERO_DEFAULTS.subtitle;
  const hasAbout = data.about != null;
  const googleRating = await getGoogleRating();

  return (
    <>
      <Navbar siteConfig={siteConfig} hasAbout={hasAbout} />
      <main>
        <Hero siteConfig={siteConfig} googleRating={googleRating} />
        <MetricsBar about={data.about} />
        <Ticker />
        <Process mobileIntro={heroSubtitle} />
        <InlineCtaBanner
          heading="Gostou do nosso método? Vamos planejar o seu projeto."
          ctaLabel="Solicitar Projeto"
          variant="default"
        />
        <Services services={data.services ?? []} />
        <Portfolio projects={data.projects ?? []} />
        <InlineCtaBanner
          heading="Inspirado pelo nosso portfólio? Conte sua ideia."
          ctaLabel="Solicitar Projeto"
          variant="alt"
        />
        <About about={data.about} />
        <Testimonials testimonials={data.testimonials ?? []} googleRating={googleRating} />
        <Suspense>
          <CtaFinal siteConfig={siteConfig} googleRating={googleRating} />
        </Suspense>
      </main>
      <Suspense>
        <Footer siteConfig={siteConfig} />
      </Suspense>

      {/* WhatsApp flutuante persistente — sempre visível (mobile e desktop). */}
      <WhatsAppButton
        variant="floating"
        number={siteConfig.whatsappNumber}
        message={siteConfig.whatsappMessage ?? 'Olá! Gostaria de solicitar um orçamento.'}
      />
    </>
  );
}
