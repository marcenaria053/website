"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { Menu } from "lucide-react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { MobileNav } from "@/components/sections/MobileNav";
import { urlForImage } from "@/sanity/lib/image";
import type { SiteConfig } from "@/lib/types";

interface NavbarProps {
  siteConfig: SiteConfig;
}

const navLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

export function Navbar({ siteConfig }: NavbarProps) {
  const { name, logo, whatsappNumber, whatsappMessage } = siteConfig;
  const logoUrl = logo ? urlForImage(logo).height(48).url() : null;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          scrolled
            ? "border-b border-border/40 bg-background/90 opacity-100 backdrop-blur-sm"
            : "border-b border-transparent bg-background/0 backdrop-blur-none",
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4"
          aria-label="Navegação principal"
        >
          <a
            href="#"
            className="flex shrink-0 items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
          >
            {logoUrl && (
              <Image
                src={logoUrl}
                alt={name}
                height={36}
                width={36}
                className="h-9 w-9 shrink-0 object-contain"
              />
            )}
            <div className="flex flex-col leading-tight whitespace-nowrap">
              <span className="font-serif text-xs font-bold tracking-widest text-foreground uppercase">
                053
              </span>
              <span className="font-serif text-[10px] tracking-widest text-primary uppercase">
                Móveis Sob Medida
              </span>
            </div>
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

          {/* "Orçamento": porta rápida de conversão no header — desktop (R11). */}
          <div className="hidden md:block">
            <WhatsAppButton
              number={whatsappNumber}
              message={whatsappMessage ?? "Olá! Gostaria de solicitar um orçamento."}
              label="Orçamento"
            />
          </div>

          <button
            type="button"
            aria-label="Abrir menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(true)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </nav>
      </header>

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
        whatsappNumber={whatsappNumber}
        whatsappMessage={
          whatsappMessage ?? "Olá! Gostaria de solicitar um orçamento."
        }
      />
    </>
  );
}
