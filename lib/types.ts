import type { PortableTextBlock } from '@portabletext/types';

export type ProjectCategory = 'cozinha' | 'banheiro' | 'sala' | 'escritorio' | 'outro';

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
  slug: string;
  category: ProjectCategory;
  cover: SanityImage;
  gallery: SanityImage[];
  description?: string;
  featured: boolean;
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

export interface About {
  photo?: SanityImage;
  body?: PortableTextBlock[];
  yearsOfExperience?: number;
  projectsDelivered?: number;
  highlights?: string[];
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
}

export interface HomeData {
  siteConfig: SiteConfig | null;
  featuredProject: Project | null;
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  about: About | null;
}
