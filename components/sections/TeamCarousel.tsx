'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { urlForImage, hasImageAsset } from '@/sanity/lib/image';
import type { TeamMember } from '@/lib/types';

interface TeamCarouselProps {
  team: TeamMember[];
}

export const TeamCarousel = ({ team }: TeamCarouselProps) => {
  const members = team.filter((member) => hasImageAsset(member.photo));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: members.length > 1, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  if (members.length === 0) return null;

  const total = members.length;

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="relative">
        <div
          ref={emblaRef}
          className="overflow-hidden rounded-sm border border-border"
          role="group"
          aria-roledescription="carrossel"
          aria-label="Equipe 053"
        >
          <div className="flex">
            {members.map((member, i) => {
              const photoUrl = urlForImage(member.photo).width(800).url();
              return (
              <figure
                key={`${member.name}-${i}`}
                className="relative aspect-square min-w-0 flex-[0_0_100%] overflow-hidden"
                aria-hidden={i !== selectedIndex}
              >
                {/* Fundo borrado preenchendo as sobras do object-contain. */}
                <Image
                  src={photoUrl}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="scale-110 object-cover blur"
                />
                {/* Imagem nítida, inteira e centralizada. */}
                <Image
                  src={photoUrl}
                  alt={member.photo.alt ?? member.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-contain"
                  blurDataURL={member.photo.lqip}
                  placeholder={member.photo.lqip ? 'blur' : 'empty'}
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-card via-card/70 to-transparent p-5">
                  <span className="block font-serif text-base text-foreground">{member.name}</span>
                  {member.role && (
                    <span className="mt-0.5 block font-serif text-[11px] uppercase tracking-[0.2em] text-primary">
                      {member.role}
                    </span>
                  )}
                </figcaption>
              </figure>
              );
            })}
          </div>
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              aria-label="Foto anterior"
              onClick={scrollPrev}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary/50 bg-card/60 text-primary backdrop-blur-sm transition-colors hover:border-primary hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Próxima foto"
              onClick={scrollNext}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-primary/50 bg-card/60 text-primary backdrop-blur-sm transition-colors hover:border-primary hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Selecionar foto">
          {members.map((member, i) => (
            <button
              key={`dot-${member.name}-${i}`}
              type="button"
              role="tab"
              aria-selected={i === selectedIndex}
              aria-label={`Ir para ${member.name}`}
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                i === selectedIndex ? 'w-6 bg-primary' : 'w-2 bg-muted/40 hover:bg-muted'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
