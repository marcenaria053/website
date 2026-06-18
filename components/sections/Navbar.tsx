import Image from 'next/image';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { urlForImage } from '@/sanity/lib/image';
import type { SiteConfig } from '@/lib/types';

interface NavbarProps {
  siteConfig: SiteConfig;
}

const navLinks = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
];

export function Navbar({ siteConfig }: NavbarProps) {
  const { name, logo, whatsappNumber, whatsappMessage } = siteConfig;
  const logoUrl = logo ? urlForImage(logo).height(48).url() : null;

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/40 bg-background/90 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label="Navegação principal"
      >
        <a href="#" className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">
          {logoUrl ? (
            <Image src={logoUrl} alt={name} height={40} width={120} className="h-10 w-auto object-contain" />
          ) : (
            <span className="font-serif text-xl tracking-widest text-foreground">{name}</span>
          )}
        </a>

        <ul className="hidden items-center gap-8 md:flex" role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="font-serif text-xs uppercase tracking-widest text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <WhatsAppButton
          number={whatsappNumber}
          message={whatsappMessage ?? 'Olá! Gostaria de solicitar um orçamento.'}
          label="Orçamento"
          className="hidden md:inline-flex"
        />

        <MobileMenu siteConfig={siteConfig} />
      </nav>
    </header>
  );
}

function MobileMenu({ siteConfig }: { siteConfig: SiteConfig }) {
  return (
    <div className="flex items-center gap-3 md:hidden">
      <WhatsAppButton
        number={siteConfig.whatsappNumber}
        message={siteConfig.whatsappMessage ?? 'Olá! Gostaria de solicitar um orçamento.'}
        label="WhatsApp"
        className="text-xs px-4 py-2"
      />
    </div>
  );
}
