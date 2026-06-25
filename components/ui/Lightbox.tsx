'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { urlForImage } from '@/sanity/lib/image';
import type { SanityImage } from '@/lib/types';

interface LightboxProps {
  images: SanityImage[];
  title: string;
  initialIndex: number;
  open: boolean;
  onClose: () => void;
}

export function Lightbox({ images, title, initialIndex, open, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex: initialIndex });
  const [current, setCurrent] = useState(initialIndex);

  // Sincroniza o índice atual com o Embla (listener apenas — sem setState síncrono no efeito).
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
    dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') scrollNext();
      if (e.key === 'ArrowLeft') scrollPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, scrollNext, scrollPrev]);

  if (images.length === 0) return null;

  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="m-0 h-dvh max-h-dvh w-screen max-w-none overflow-hidden bg-card p-0 backdrop:bg-card/80 backdrop:backdrop-blur-sm"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p className="font-serif text-sm text-foreground">{title}</p>
          <div className="flex items-center gap-3">
            <span className="font-serif text-xs text-muted">
              {current + 1} / {images.length}
            </span>
            <button
              onClick={onClose}
              aria-label="Fechar galeria"
              className="rounded-sm p-1 text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative min-h-0 flex-1 bg-background">
          {/* Carrossel Embla: arraste/slide entre as fotos. Cada slide tem fundo borrado + imagem inteira. */}
          <div className="h-full overflow-hidden" ref={emblaRef}>
            <div className="flex h-full">
              {images.map((slide, i) => {
                const slideUrl = urlForImage(slide).width(1920).url();
                return (
                  <div key={i} className="relative h-full min-w-0 flex-[0_0_100%] overflow-hidden">
                    {/* Fundo borrado preenchendo as sobras do object-contain. */}
                    <Image
                      src={slideUrl}
                      alt=""
                      aria-hidden
                      fill
                      sizes="100vw"
                      className="scale-110 object-cover blur"
                    />
                    {/* Imagem nítida, inteira e centralizada. */}
                    <Image
                      src={slideUrl}
                      alt={slide.alt ?? title}
                      fill
                      sizes="100vw"
                      className="object-contain"
                      blurDataURL={slide.lqip}
                      placeholder={slide.lqip ? 'blur' : 'empty'}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={scrollPrev}
                aria-label="Imagem anterior"
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-sm border border-border bg-card/80 p-2 text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={scrollNext}
                aria-label="Próxima imagem"
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-sm border border-border bg-card/80 p-2 text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="hidden gap-2 overflow-x-auto p-3 sm:flex">
            {images.map((thumb, i) => {
              const thumbUrl = urlForImage(thumb).width(120).url();
              return (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Ir para imagem ${i + 1}`}
                  className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-sm transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                    i === current ? 'opacity-100 ring-1 ring-primary' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <Image
                    src={thumbUrl}
                    alt={thumb.alt ?? `Imagem ${i + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                    blurDataURL={thumb.lqip}
                    placeholder={thumb.lqip ? 'blur' : 'empty'}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </dialog>
  );
}
