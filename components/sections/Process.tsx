const steps = [
  {
    number: '01',
    title: 'Consultoria e Medição',
    description:
      'Entendemos suas necessidades e realizamos medições precisas do seu ambiente para um projeto perfeito.',
  },
  {
    number: '02',
    title: 'Design Exclusivo',
    description:
      'Criamos projetos 3D detalhados, escolhendo as melhores madeiras e acabamentos para o seu estilo.',
  },
  {
    number: '03',
    title: 'Produção Artesanal',
    description:
      'Nossa equipe de mestres marceneiros executa o projeto com precisão milimétrica e materiais nobres.',
  },
  {
    number: '04',
    title: 'Instalação Pontual',
    description:
      'Entregamos e instalamos no prazo combinado, com toda a limpeza e organização que você merece.',
  },
];

interface ProcessProps {
  /** Texto realocado do hero no mobile (R6). Renderizado apenas em telas < md. */
  mobileIntro?: string;
}

export function Process({ mobileIntro }: ProcessProps) {
  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 font-serif text-xs uppercase tracking-[0.3em] text-primary">
            Como Trabalhamos
          </p>
          <h2 className="font-serif text-3xl text-foreground md:text-4xl">
            Nosso Método de Trabalho
          </h2>
          {mobileIntro && (
            <p className="mx-auto mt-6 max-w-xl font-serif text-base leading-relaxed text-muted md:hidden">
              {mobileIntro}
            </p>
          )}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative rounded-sm border border-border bg-card p-8 transition-colors hover:border-primary"
            >
              <span className="mb-6 block font-serif text-5xl font-light text-primary/20 transition-colors group-hover:text-primary/40">
                {step.number}
              </span>
              <h3 className="mb-3 font-serif text-lg text-foreground">{step.title}</h3>
              <p className="font-serif text-sm leading-relaxed text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
