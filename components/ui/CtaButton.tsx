'use client';

import type { ReactNode } from 'react';

interface CtaButtonProps {
  /** Destino interno — ex.: '#contato' para rolar até o formulário. */
  href: string;
  label: string;
  variant?: 'solid' | 'outline';
  className?: string;
  onClick?: () => void;
  icon?: ReactNode;
}

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 font-serif text-sm uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';

const VARIANTS: Record<NonNullable<CtaButtonProps['variant']>, string> = {
  solid: 'bg-primary text-primary-foreground hover:bg-accent',
  outline: 'border border-border text-foreground/80 hover:border-primary',
};

export const CtaButton = ({
  href,
  label,
  variant = 'solid',
  className = '',
  onClick,
  icon,
}: CtaButtonProps) => (
  <a href={href} onClick={onClick} className={`${BASE} ${VARIANTS[variant]} ${className}`}>
    {icon}
    {label}
  </a>
);
