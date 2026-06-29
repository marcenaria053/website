import Image from 'next/image';
import { hasImageAsset, urlForImage } from '@/sanity/lib/image';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { title, cover, category } = project;
  const coverUrl = hasImageAsset(cover) ? urlForImage(cover).width(600).url() : null;

  return (
    <button
      onClick={() => onClick(project)}
      className="group relative block w-full overflow-hidden rounded-sm bg-card text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      aria-label={`Ver galeria de ${title}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={cover.alt ?? title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            blurDataURL={cover.lqip}
            placeholder={cover.lqip ? 'blur' : 'empty'}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-card"
            aria-hidden="true"
          >
            <span className="font-serif text-xs uppercase tracking-widest text-muted">
              Sem imagem
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-card/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-sm border border-primary px-4 py-2 font-serif text-xs uppercase tracking-widest text-primary">
            Ver Projeto
          </span>
        </div>
      </div>
      <div className="p-4">
        <p className="font-serif text-base capitalize text-foreground">{title}</p>
        <p className="mt-1 font-serif text-xs uppercase tracking-widest text-muted">
          {category}
        </p>
      </div>
    </button>
  );
}
