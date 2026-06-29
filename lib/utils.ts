import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ProjectCategory } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildWhatsAppLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const categoryLabels: Record<ProjectCategory | 'todos', string> = {
  todos: 'Todos',
  cozinha: 'Cozinhas',
  banheiro: 'Banheiros',
  sala: 'Salas',
  quarto: 'Quartos',
  escritorio: 'Escritórios',
  outro: 'Outros',
};

export const investmentOptions = [
  { value: 'ate-30k', label: 'Até R$ 30 mil' },
  { value: '30-80k', label: 'R$ 30 mil – R$ 80 mil' },
  { value: '80-150k', label: 'R$ 80 mil – R$ 150 mil' },
  { value: 'acima-150k', label: 'Acima de R$ 150 mil' },
  { value: 'nao-definido', label: 'Ainda não defini' },
] as const;

export type InvestmentValue = (typeof investmentOptions)[number]['value'];
