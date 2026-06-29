import { CtaButton } from '@/components/ui/CtaButton';
import { WhatsAppIcon } from '@/components/ui/WhatsAppButton';

interface InlineCtaBannerProps {
  heading: string;
  ctaLabel: string;
  /** Alterna a textura/fundo para criar ritmo visual entre as duas faixas. */
  variant?: 'default' | 'alt';
}

export const InlineCtaBanner = ({ heading, ctaLabel, variant = 'default' }: InlineCtaBannerProps) => {
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
        <CtaButton
          href="#contato"
          label={ctaLabel}
          icon={<WhatsAppIcon className="h-4 w-4" />}
          className="w-full justify-center md:w-auto"
        />
      </div>
    </section>
  );
};
