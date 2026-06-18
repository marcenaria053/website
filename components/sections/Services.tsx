import { icons } from 'lucide-react';
import type { Service } from '@/lib/types';

interface ServicesProps {
  services: Service[];
}

function ServiceIcon({ name }: { name: string }) {
  const Icon = icons[name as keyof typeof icons] ?? icons['Square'];
  return <Icon className="h-6 w-6 text-primary" aria-hidden="true" />;
}

const fallbackServices: Service[] = [
  { _id: '1', name: 'Cozinhas Planejadas', description: 'Projetos exclusivos com materiais nobres e ferragens europeias.', icon: 'ChefHat', order: 1 },
  { _id: '2', name: 'Closets e Dormitórios', description: 'Aproveitamento inteligente de cada centímetro do seu espaço.', icon: 'Shirt', order: 2 },
  { _id: '3', name: 'Ambientes Corporativos', description: 'Móveis sob medida para escritórios e ambientes executivos.', icon: 'Briefcase', order: 3 },
  { _id: '4', name: 'Home Theater e Painéis', description: 'Painéis ripados, home theaters e ambientes de entretenimento.', icon: 'Tv', order: 4 },
  { _id: '5', name: 'Banheiros e Lavabos', description: 'Gabinetes e marcenaria para banheiros de alto padrão.', icon: 'Bath', order: 5 },
  { _id: '6', name: 'Decks e Áreas Externas', description: 'Madeiras tratadas para decks, pérgolas e áreas de lazer.', icon: 'Trees', order: 6 },
];

export function Services({ services }: ServicesProps) {
  const items = services.length > 0 ? services : fallbackServices;

  return (
    <section id="servicos" className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 font-serif text-xs uppercase tracking-[0.3em] text-primary">
            O Que Fazemos
          </p>
          <h2 className="font-serif text-3xl text-foreground md:text-4xl">
            Especialidades
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service) => (
            <div
              key={service._id}
              className="group rounded-sm border border-border bg-card p-8 transition-colors hover:border-primary"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-sm border border-border transition-colors group-hover:border-primary">
                <ServiceIcon name={service.icon} />
              </div>
              <h3 className="mb-3 font-serif text-lg text-foreground">{service.name}</h3>
              <p className="font-serif text-sm leading-relaxed text-muted">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
