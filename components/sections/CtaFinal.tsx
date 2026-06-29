'use client';

import { WhatsAppIcon } from '@/components/ui/WhatsAppButton';
import { buildWhatsAppLink, investmentOptions } from '@/lib/utils';
import type { SiteConfig } from '@/lib/types';

interface CtaFinalProps {
  siteConfig: SiteConfig;
}

export function CtaFinal({ siteConfig }: CtaFinalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const investment = String(data.get('investment') ?? '');
    const investmentLabel = investmentOptions.find((opt) => opt.value === investment)?.label;

    const message = [
      'Olá! Gostaria de solicitar um orçamento.',
      `Nome: ${data.get('name')}`,
      `Telefone: ${data.get('phone')}`,
      `E-mail: ${data.get('email')}`,
      investmentLabel ? `Investimento: ${investmentLabel}` : null,
      `Necessidade: ${data.get('message')}`,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(
      buildWhatsAppLink(siteConfig.whatsappNumber, message),
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <section id="contato" className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-3 font-serif text-xs uppercase tracking-[0.3em] text-primary">
              Próximo Passo
            </p>
            <h2 className="mb-6 font-serif text-3xl text-foreground md:text-4xl">
              Pronto para dar o próximo passo no seu projeto?
            </h2>
            <p className="font-serif text-base leading-relaxed text-foreground/70">
              Nossa equipe está pronta para entender suas necessidades e apresentar soluções de
              design exclusivas com orçamentos detalhados.
            </p>
          </div>

          <div className="rounded-sm border border-border bg-card p-8">
            <h3 className="mb-6 font-serif text-xl text-foreground">Solicitar Orçamento</h3>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <FormField name="name" label="Nome Completo" type="text" placeholder="Seu nome" required />
                <FormField
                  name="phone"
                  label="Telefone / WhatsApp"
                  type="tel"
                  placeholder="(53) 99999-9999"
                  required
                />
                <FormField name="email" label="E-mail" type="email" placeholder="seu@email.com" required />

                <div>
                  <label htmlFor="investment" className="mb-1.5 block font-serif text-xs uppercase tracking-widest text-muted">
                    Investimento Estimado
                  </label>
                  <select
                    id="investment"
                    name="investment"
                    required
                    className="w-full rounded-sm border border-border bg-background px-4 py-3 font-serif text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Selecione uma faixa</option>
                    {investmentOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block font-serif text-xs uppercase tracking-widest text-muted">
                    Descreva sua Necessidade
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Descreva o ambiente, estilo desejado, prazo..."
                    required
                    className="w-full resize-none rounded-sm border border-border bg-background px-4 py-3 font-serif text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 font-serif text-sm uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Enviar pelo WhatsApp
                </button>

                <p className="text-center font-serif text-xs text-muted">
                  Seus dados estão seguros. Não compartilhamos com terceiros.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FormFieldProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}

function FormField({ name, label, type, placeholder, required }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block font-serif text-xs uppercase tracking-widest text-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-sm border border-border bg-background px-4 py-3 font-serif text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}
