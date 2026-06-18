'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
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
  const [current, setCurrent] = useState(initialIndex);

  useEffect(() => {
    setCurrent(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
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
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, current, images.length]);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  const img = images[current];
  if (!img) return null;

  const imageUrl = urlForImage(img).width(1400).url();

  return (
    <dialog
      ref={dialogRef}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="m-auto w-full max-w-5xl overflow-hidden rounded-sm bg-card p-0 backdrop:bg-card/80 backdrop:backdrop-blur-sm"
    >
      <div className="flex flex-col">
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

        <div className="relative aspect-video bg-background">
          <Image
            src={imageUrl}
            alt={img.alt ?? title}
            fill
            sizes="100vw"
            className="object-contain"
            blurDataURL={img.lqip}
            placeholder={img.lqip ? 'blur' : 'empty'}
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Imagem anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-sm border border-border bg-card/80 p-2 text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                aria-label="Próxima imagem"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm border border-border bg-card/80 p-2 text-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto p-3">
            {images.map((thumb, i) => {
              const thumbUrl = urlForImage(thumb).width(120).url();
              return (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Ir para imagem ${i + 1}`}
                  className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-sm transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary ${
                    i === current ? 'ring-1 ring-primary opacity-100' : 'opacity-50 hover:opacity-80'
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
