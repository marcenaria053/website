import Image from 'next/image';
import { CtaButton } from '@/components/ui/CtaButton';
import { WhatsAppIcon } from '@/components/ui/WhatsAppButton';
import heroBackground from '@/public/hero-053.webp';
import heroBackgroundMobile from '@/public/hero-053-mobile.webp';
import type { SiteConfig } from '@/lib/types';

interface HeroProps {
  siteConfig: SiteConfig;
}

export const HERO_DEFAULTS = {
  eyebrow: 'Marcenaria de Luxo · Pelotas',
  title: 'A Arte da Marcenaria com',
  titleHighlight: 'Pontualidade Absoluta',
  subtitle:
    'Projetamos e executamos móveis sob medida de alto padrão, combinando estética refinada, materiais nobres e o compromisso inegociável com os prazos de entrega.',
  primaryCtaLabel: 'Solicitar Projeto',
  secondaryCtaLabel: 'Ver Portfólio',
  socialProof: 'Projeto 3D sob medida · Entrega no prazo · Pelotas e região',
} as const;

export function Hero({ siteConfig }: HeroProps) {
  const { hero } = siteConfig;

  const eyebrow = hero?.eyebrow ?? HERO_DEFAULTS.eyebrow;
  const title = hero?.title ?? HERO_DEFAULTS.title;
  const titleHighlight = hero?.titleHighlight ?? HERO_DEFAULTS.titleHighlight;
  const subtitle = hero?.subtitle ?? HERO_DEFAULTS.subtitle;
  const supportLine = hero?.supportLine;
  const primaryCtaLabel = hero?.primaryCtaLabel ?? HERO_DEFAULTS.primaryCtaLabel;
  const secondaryCtaLabel = hero?.secondaryCtaLabel ?? HERO_DEFAULTS.secondaryCtaLabel;

  // Quebra do título em 2 grupos semânticos: a última palavra do título (preposição
  // de ligação, ex. "com") desce com o destaque dourado, evitando órfã (R1–R4).
  const titleWords = title.trim().split(/\s+/);
  const titleConnector = titleWords.length > 1 ? titleWords[titleWords.length - 1] : '';
  const titleLead = titleWords.length > 1 ? titleWords.slice(0, -1).join(' ') : title;

  return (
    <section className="relative flex min-h-screen items-end justify-center overflow-hidden">
      {/* MOBILE: foto vertical (9:16) em cover. DESKTOP: foto landscape em cover.
          Ambas fetchPriority high + lazy padrão → só a visível é baixada (Next 16). */}
      <Image
        src={heroBackgroundMobile}
        alt="053 Móveis Sob Medida"
        fill
        sizes="100vw"
        fetchPriority="high"
        placeholder="blur"
        className="object-cover md:hidden"
      />
      <Image
        src={heroBackground}
        alt="053 Móveis Sob Medida"
        fill
        sizes="100vw"
        fetchPriority="high"
        placeholder="blur"
        className="hidden object-cover md:block"
      />

      {/* Scrim de topo (mobile): leitura do logo + menu sobre áreas claras. 3 stops = fade
          suave, sem faixa sólida nem escurecer a foto abaixo da zona do header (R5–R7). */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background/85 via-background/35 to-transparent md:hidden" />
      {/* Scrim inferior (mobile): fade longo e gradual (foto↔texto imperceptível, R10),
          mantendo a zona do texto escura o suficiente para AA. */}
      <div className="absolute inset-0 bg-gradient-to-t from-background from-0% via-background/72 via-52% to-transparent to-90% md:hidden" />
      {/* Scrim direcional desktop (R7–R8): escuro à esquerda → transparente à direita,
          criando a "zona de silêncio" do texto sem apagar o brilho/detalhe da madeira à direita. */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-background from-0% via-background/40 via-55% to-transparent to-90% md:block" />
      {/* Reforço inferior sutil (texto fica em baixo-esquerda). */}
      <div className="absolute inset-0 hidden bg-gradient-to-t from-background/60 via-transparent to-transparent md:block" />
      {/* Scrim de topo desktop (R9–R10): legibilidade da nav/logo sobre a madeira clara à direita. */}
      <div className="absolute inset-x-0 top-0 hidden h-32 bg-gradient-to-b from-background/80 via-background/30 to-transparent md:block" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-32 text-center md:text-left">
        {eyebrow && (
          <p className="mb-4 font-serif text-xs uppercase tracking-[0.3em] text-primary [text-shadow:0_1px_8px_rgba(0,0,0,0.75)] md:[text-shadow:none]">
            {eyebrow}
          </p>
        )}
        {/* Mobile: 2 grupos em blocos (lead branco / conexao+destaque dourado), 2a linha sem
            quebra e fonte fluida que cabe ate 320px -> sem orfa (R1-R4).
            Desktop (md): volta ao inline + text-6xl + balance ja aprovado, sem alteracao. */}
        <h1 className="mb-6 max-w-3xl text-balance font-serif text-[clamp(1.5rem,7vw,2.75rem)] leading-tight text-foreground md:text-6xl">
          <span className="block md:inline">{titleLead}</span>{' '}
          {titleHighlight ? (
            <span className="block whitespace-nowrap md:inline md:whitespace-normal">
              {titleConnector && <>{titleConnector}{' '}</>}
              <span className="text-primary">{titleHighlight}</span>
            </span>
          ) : (
            titleConnector && <span className="block md:inline">{titleConnector}</span>
          )}
        </h1>

        {/* Linha curta de apoio (mobile) — opcional, só renderiza se preenchida no Sanity (R7). */}
        {supportLine && (
          <p className="mb-10 max-w-xl text-balance font-serif text-base leading-relaxed text-foreground/80 md:hidden">
            {supportLine}
          </p>
        )}

        {/* Parágrafo longo: só desktop. No mobile é realocado para a seção Process (R6). */}
        {subtitle && (
          <p className="mb-10 hidden max-w-xl font-serif text-base leading-relaxed text-foreground/70 md:block md:text-lg">
            {subtitle}
          </p>
        )}

        <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-start">
          {/* CTA primário sólido (dourado encorpado, mesmo tom do mobile) — rola até o formulário (R1–R3). */}
          <CtaButton
            href="#contato"
            label={primaryCtaLabel}
            icon={<WhatsAppIcon className="h-4 w-4" />}
            className="w-full justify-center !bg-[#b6863a] hover:!bg-[#c9a05a] md:w-auto"
          />
          {/* "Ver Portfólio": secundário discreto no mobile; botão com borda no desktop. */}
          <a
            href="#portfolio"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 self-center font-serif text-sm uppercase tracking-widest text-foreground/70 underline-offset-4 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:self-auto md:rounded-sm md:border md:border-border md:px-6 md:py-3 md:text-foreground/80 md:hover:border-primary md:focus-visible:ring-offset-2"
          >
            {secondaryCtaLabel}
          </a>
        </div>

        {/* Microprova qualitativa — claims já verdadeiros no site (sem número/nota).
            Mobile-safe: abaixo do CTA primário + text-xs, não empurra o CTA para fora da dobra. */}
        {HERO_DEFAULTS.socialProof && (
          <p className="mt-6 font-serif text-xs uppercase tracking-[0.15em] text-foreground/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.75)] md:mt-8 md:[text-shadow:none]">
            {HERO_DEFAULTS.socialProof}
          </p>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
