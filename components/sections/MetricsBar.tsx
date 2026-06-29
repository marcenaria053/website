import type { About as AboutType } from '@/lib/types';

interface MetricsBarProps {
  about: AboutType | null;
}

interface Metric {
  value: string;
  label: string;
}

export const MetricsBar = ({ about }: MetricsBarProps) => {
  if (!about) return null;

  const metrics: Metric[] = [];

  if (about.yearsOfExperience) {
    metrics.push({ value: `${about.yearsOfExperience}+`, label: 'Anos de Experiência' });
  }

  if (about.projectsDelivered) {
    metrics.push({ value: `${about.projectsDelivered}+`, label: 'Projetos Entregues' });
  }

  if (metrics.length === 0) return null;

  return (
    <section className="border-y border-border bg-card py-12" aria-label="Nossos números">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-6 text-center sm:grid-cols-2 md:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <p className="font-serif text-4xl text-primary">{metric.value}</p>
            <p className="mt-1 font-serif text-xs uppercase tracking-widest text-muted">
              {metric.label}
            </p>
          </div>
        ))}
        <div>
          <p className="font-serif text-4xl text-primary" aria-hidden="true">
            ✓
          </p>
          <p className="mt-1 font-serif text-xs uppercase tracking-widest text-muted">
            Entrega no Prazo
          </p>
        </div>
      </div>
    </section>
  );
};
