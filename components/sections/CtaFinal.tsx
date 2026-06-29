'use client';

import { useActionState } from 'react';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { submitContact, type ContactState } from '@/actions/contact';
import { investmentOptions } from '@/lib/utils';
import type { SiteConfig } from '@/lib/types';

interface CtaFinalProps {
  siteConfig: SiteConfig;
}

const initialState: ContactState = { status: 'idle' };

export function CtaFinal({ siteConfig }: CtaFinalProps) {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);

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
            <p className="mb-10 font-serif text-base leading-relaxed text-foreground/70">
              Nossa equipe está pronta para entender suas necessidades e apresentar soluções de
              design exclusivas com orçamentos detalhados.
            </p>
            <WhatsAppButton
              number={siteConfig.whatsappNumber}
              message={siteConfig.whatsappMessage ?? 'Olá! Gostaria de solicitar um orçamento.'}
              label="Falar pelo WhatsApp"
            />
          </div>

          <div className="rounded-sm border border-border bg-card p-8">
            <h3 className="mb-6 font-serif text-xl text-foreground">Solicitar Orçamento</h3>

            {state.status === 'success' ? (
              <div className="rounded-sm border border-primary/30 bg-primary/10 p-6 text-center">
                <p className="font-serif text-sm text-primary">{state.message}</p>
              </div>
            ) : (
              <form action={formAction} noValidate>
                <input type="text" name="website" className="hidden" tabIndex={-1} aria-hidden="true" />

                {state.status === 'error' && !state.fieldErrors && (
                  <p className="mb-4 rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-3 font-serif text-sm text-red-400">
                    {state.message}
                  </p>
                )}

                <div className="space-y-4">
                  <FormField
                    name="name"
                    label="Nome Completo"
                    type="text"
                    placeholder="Seu nome"
                    required
                    error={state.fieldErrors?.name}
                  />
                  <FormField
                    name="phone"
                    label="Telefone / WhatsApp"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    required
                    error={state.fieldErrors?.phone}
                  />
                  <FormField
                    name="email"
                    label="E-mail"
                    type="email"
                    placeholder="seu@email.com"
                    required
                    error={state.fieldErrors?.email}
                  />

                  <div>
                    <label htmlFor="investment" className="mb-1.5 block font-serif text-xs uppercase tracking-widest text-muted">
                      Investimento Estimado
                    </label>
                    <select
                      id="investment"
                      name="investment"
                      required
                      className={`w-full rounded-sm border bg-background px-4 py-3 font-serif text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary ${
                        state.fieldErrors?.investment ? 'border-red-500' : 'border-border'
                      }`}
                    >
                      <option value="">Selecione uma faixa</option>
                      {investmentOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {state.fieldErrors?.investment && (
                      <p className="mt-1 font-serif text-xs text-red-400">{state.fieldErrors.investment}</p>
                    )}
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
                      className={`w-full resize-none rounded-sm border bg-background px-4 py-3 font-serif text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary ${
                        state.fieldErrors?.message ? 'border-red-500' : 'border-border'
                      }`}
                    />
                    {state.fieldErrors?.message && (
                      <p className="mt-1 font-serif text-xs text-red-400">{state.fieldErrors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full rounded-sm bg-primary px-6 py-3 font-serif text-sm uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {isPending ? 'Enviando...' : 'Enviar Solicitação'}
                  </button>

                  <p className="text-center font-serif text-xs text-muted">
                    Seus dados estão seguros. Não compartilhamos com terceiros.
                  </p>
                </div>
              </form>
            )}
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
  error?: string;
}

function FormField({ name, label, type, placeholder, required, error }: FormFieldProps) {
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
        className={`w-full rounded-sm border bg-background px-4 py-3 font-serif text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-primary ${
          error ? 'border-red-500' : 'border-border'
        }`}
      />
      {error && <p className="mt-1 font-serif text-xs text-red-400">{error}</p>}
    </div>
  );
}
