'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { CtaButton } from '@/components/ui/CtaButton';
import { WhatsAppIcon } from '@/components/ui/WhatsAppButton';

interface MobileNavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  links: MobileNavLink[];
}

const ANIM_MS = 320;

export function MobileNav({ open, onClose, links }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // a11y: scroll lock, Esc, focus trap e retorno de foco — enquanto aberto.
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  // Move o foco para o botão de fechar quando o menu abre.
  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  // Sempre montado: a animação de entrada/saída é dirigida pela prop `open` via transições CSS.
  // `inert` + `pointer-events-none` mantêm o drawer inerte (sem foco/clique) quando fechado.
  return (
    <div
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
      aria-hidden={!open}
      inert={!open}
      className={`fixed inset-0 z-50 md:hidden ${open ? '' : 'pointer-events-none'}`}
    >
      <button
        type="button"
        aria-label="Fechar menu"
        onClick={onClose}
        tabIndex={-1}
        className={`absolute inset-0 h-full w-full cursor-default bg-background/80 backdrop-blur-sm transition-opacity duration-300 ease-out motion-reduce:transition-none ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      <div
        ref={panelRef}
        style={{ transitionDuration: `${ANIM_MS}ms` }}
        className={`absolute inset-y-0 right-0 flex w-full max-w-xs flex-col border-l border-border/40 bg-background px-6 pb-10 pt-5 shadow-2xl transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-reduce:transition-none ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-end">
          <button
            ref={closeRef}
            type="button"
            aria-label="Fechar menu"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-sm text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Navegação principal" className="mt-4 flex flex-col">
          <ul role="list" className="flex flex-col">
            {links.map(({ href, label }, i) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={onClose}
                  style={{ transitionDelay: open ? `${120 + i * 55}ms` : '0ms' }}
                  className={`flex min-h-[44px] items-center font-serif text-sm uppercase tracking-widest text-foreground transition-[color,opacity,transform] duration-300 ease-out hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-reduce:translate-x-0 motion-reduce:opacity-100 motion-reduce:transition-none ${open ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-8">
          <CtaButton
            href="#contato"
            label="Orçamento"
            onClick={onClose}
            icon={<WhatsAppIcon className="h-4 w-4" />}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
