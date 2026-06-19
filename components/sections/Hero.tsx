import Image from 'next/image';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { urlForImage } from '@/sanity/lib/image';
import type { Project, SiteConfig } from '@/lib/types';

interface HeroProps {
  project: Project | null;
  siteConfig: SiteConfig;
}

export function Hero({ project, siteConfig }: HeroProps) {
  const { whatsappNumber, whatsappMessage } = siteConfig;
  const coverUrl = project
    ? urlForImage(project.cover).width(1920).height(1080).url()
    : null;

  return (
    <section className="relative flex min-h-screen items-end justify-center overflow-hidden">
      {coverUrl ? (
        <Image
          src={coverUrl}
          alt={project?.cover.alt ?? 'Projeto 053 Móveis Sob Medida'}
          fill
          sizes="100vw"
          priority
          className="object-cover"
          blurDataURL={project?.cover.lqip}
          placeholder={project?.cover.lqip ? 'blur' : 'empty'}
        />
      ) : (
        <div className="absolute inset-0 bg-secondary" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-32 text-center md:text-left">
        <p className="mb-4 font-serif text-xs uppercase tracking-[0.3em] text-primary">
          Marcenaria de Luxo · Pelotas
        </p>
        <h1 className="mb-6 max-w-3xl font-serif text-4xl leading-tight text-foreground md:text-6xl">
          A Arte da Marcenaria com{' '}
          <span className="text-primary">Pontualidade Absoluta</span>
        </h1>
        <p className="mb-10 max-w-xl font-serif text-base leading-relaxed text-foreground/70 md:text-lg">
          Projetamos e executamos móveis sob medida de alto padrão, combinando estética refinada,
          materiais nobres e o compromisso inegociável com os prazos de entrega.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row md:items-start">
          <WhatsAppButton
            number={whatsappNumber}
            message={whatsappMessage ?? 'Olá! Gostaria de agendar uma consultoria.'}
            label="Agendar Consultoria"
          />
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 font-serif text-sm uppercase tracking-widest text-foreground/70 transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Ver Portfólio
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
