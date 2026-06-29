import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import type { SiteConfig } from '@/lib/types';

interface InlineCtaBannerProps {
  siteConfig: SiteConfig;
  heading: string;
  ctaLabel: string;
  whatsappMessage?: string;
  /** Alterna a textura/fundo para criar ritmo visual entre as duas faixas. */
  variant?: 'default' | 'alt';
}

export const InlineCtaBanner = ({
  siteConfig,
  heading,
  ctaLabel,
  whatsappMessage,
  variant = 'default',
}: InlineCtaBannerProps) => {
  const message =
    whatsappMessage ?? siteConfig.whatsappMessage ?? 'Olá! Gostaria de solicitar um orçamento.';

  return (
    <section
      className={
        variant === 'alt'
          ? 'border-y border-border bg-secondary py-16'
          : 'border-y border-border bg-background py-16'
      }
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-center md:flex-row md:justify-between md:text-left">
        <h2 className="max-w-2xl text-balance font-serif text-2xl text-foreground md:text-3xl">
          {heading}
        </h2>
        <WhatsAppButton
          number={siteConfig.whatsappNumber}
          message={message}
          variant="inline"
          label={ctaLabel}
          className="w-full justify-center md:w-auto"
        />
      </div>
    </section>
  );
};
