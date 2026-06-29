import type { PortableTextBlock } from '@portabletext/types';

export type ProjectCategory = 'cozinha' | 'banheiro' | 'sala' | 'quarto' | 'escritorio' | 'outro';

export interface SanityImage {
  _type: 'image';
  asset: { _ref: string; _type: 'reference' };
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
  lqip?: string;
}

export interface Project {
  _id: string;
  title: string;
  category: ProjectCategory;
  cover: SanityImage;
  gallery: SanityImage[];
  order: number;
}

export interface Service {
  _id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
}

export interface Testimonial {
  _id: string;
  clientName: string;
  city?: string;
  quote: string;
  avatar?: SanityImage;
}

export interface TeamMember {
  name: string;
  role?: string;
  photo: SanityImage;
}

export interface About {
  photo?: SanityImage;
  body?: PortableTextBlock[];
  yearsOfExperience?: number;
  projectsDelivered?: number;
  highlights?: string[];
  team?: TeamMember[];
}

export interface SiteConfigDefault {
  name: string;
  whatsappNumber: string;
  whatsappMessage?: string;
  city?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface SiteConfig extends SiteConfigDefault {
  logo?: SanityImage;
  instagram?: string;
  ogImage?: SanityImage;
  hero?: HeroContent;
}

export interface HeroContent {
  eyebrow?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  /** Linha curta de apoio exibida no mobile (R7, ≤ 8 palavras). */
  supportLine?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
}

export interface HomeData {
  siteConfig: SiteConfig | null;
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  about: About | null;
}
