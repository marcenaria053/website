import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';
import type { Testimonial } from '@/lib/types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const fallback: Testimonial[] = [
  {
    _id: '1',
    clientName: 'Carlos Albuquerque',
    city: 'Pelotas',
    quote:
      'A 053 superou minhas expectativas. Não apenas a qualidade da madeira é excepcional, mas eles entregaram exatamente no dia prometido. Uma raridade no mercado.',
  },
  {
    _id: '2',
    clientName: 'Mariana Fontes',
    city: 'Pelotas',
    quote:
      'O nível de detalhe nos acabamentos é impressionante. O closet que desenharam aproveitou cada milímetro do meu quarto. Recomendo de olhos fechados.',
  },
];

export function Testimonials({ testimonials }: TestimonialsProps) {
  const items = testimonials.length > 0 ? testimonials : fallback;

  return (
    <section className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 font-serif text-xs uppercase tracking-[0.3em] text-primary">
            Clientes
          </p>
          <h2 className="font-serif text-3xl text-foreground md:text-4xl">
            O Que Dizem Sobre Nós
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => {
            const avatarUrl = t.avatar ? urlForImage(t.avatar).width(80).height(80).url() : null;
            return (
              <figure
                key={t._id}
                className="rounded-sm border border-border bg-card p-8"
              >
                <blockquote className="mb-6">
                  <p className="font-serif text-sm leading-relaxed text-foreground/80">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={t.clientName}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                      blurDataURL={t.avatar?.lqip}
                      placeholder={t.avatar?.lqip ? 'blur' : 'empty'}
                    />
                  ) : (
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary font-serif text-sm text-primary"
                      aria-hidden="true"
                    >
                      {t.clientName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-serif text-sm capitalize text-foreground">{t.clientName}</p>
                    {t.city && (
                      <p className="font-serif text-xs text-muted">{t.city}</p>
                    )}
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
