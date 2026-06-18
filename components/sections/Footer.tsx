import Image from 'next/image';
import { Suspense } from 'react';
import { urlForImage } from '@/sanity/lib/image';
import { CurrentYear } from '@/components/ui/CurrentYear';
import type { SiteConfig } from '@/lib/types';

interface FooterProps {
  siteConfig: SiteConfig;
}

const navLinks = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
];

export function Footer({ siteConfig }: FooterProps) {
  const { name, logo, whatsappNumber, whatsappMessage, instagram, city } = siteConfig;
  const logoUrl = logo ? urlForImage(logo).height(48).url() : null;
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage ?? '')}`;
  const igLink = instagram
    ? instagram.startsWith('http')
      ? instagram
      : `https://instagram.com/${instagram.replace('@', '')}`
    : null;

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            {logoUrl ? (
              <Image src={logoUrl} alt={name} height={40} width={120} className="mb-4 h-10 w-auto object-contain" />
            ) : (
              <p className="mb-4 font-serif text-xl tracking-widest text-foreground">{name}</p>
            )}
            <p className="font-serif text-sm leading-relaxed text-muted">
              Móveis sob medida de alto padrão com entrega rigorosamente no prazo.
              {city && ` Atendemos ${city} e região.`}
            </p>
          </div>

          <nav aria-label="Links de navegação do rodapé">
            <p className="mb-4 font-serif text-xs uppercase tracking-widest text-primary">
              Navegação
            </p>
            <ul className="space-y-2" role="list">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-serif text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-4 font-serif text-xs uppercase tracking-widest text-primary">
              Contato
            </p>
            <ul className="space-y-3" role="list">
              <li>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-serif text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm"
                >
                  <span className="text-primary">WhatsApp</span>
                </a>
              </li>
              {igLink && (
                <li>
                  <a
                    href={igLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-serif text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded-sm"
                  >
                    <span className="text-primary">Instagram</span>
                    {instagram && (
                      <span className="ml-2 text-muted">{instagram.startsWith('@') ? instagram : `@${instagram}`}</span>
                    )}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="font-serif text-xs text-muted">
            © <Suspense fallback="2025"><CurrentYear /></Suspense> {name}. Todos os direitos reservados.
          </p>
          <p className="font-serif text-xs text-muted">
            Desenvolvido com excelência.
          </p>
        </div>
      </div>
    </footer>
  );
}
