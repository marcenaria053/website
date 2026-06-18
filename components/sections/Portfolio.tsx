'use client';

import { useMemo, useState } from 'react';
import { FilterBar } from '@/components/ui/FilterBar';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Lightbox } from '@/components/ui/Lightbox';
import type { Project, ProjectCategory, SanityImage } from '@/lib/types';

type FilterCategory = ProjectCategory | 'todos';

interface PortfolioProps {
  projects: Project[];
}

export function Portfolio({ projects }: PortfolioProps) {
  const [active, setActive] = useState<FilterCategory>('todos');
  const [lightbox, setLightbox] = useState<{ project: Project; index: number } | null>(null);

  const categories = useMemo<FilterCategory[]>(() => {
    const found = Array.from(new Set(projects.map((p) => p.category)));
    return ['todos', ...found] as FilterCategory[];
  }, [projects]);

  const filtered = useMemo(
    () => (active === 'todos' ? projects : projects.filter((p) => p.category === active)),
    [projects, active]
  );

  const handleOpen = (project: Project) => setLightbox({ project, index: 0 });
  const handleClose = () => setLightbox(null);

  return (
    <section id="portfolio" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 font-serif text-xs uppercase tracking-[0.3em] text-primary">
            Acervo Exclusivo
          </p>
          <h2 className="mb-8 font-serif text-3xl text-foreground md:text-4xl">
            Portfólio
          </h2>
          <div className="flex justify-center">
            <FilterBar active={active} categories={categories} onChange={setActive} />
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {filtered.map((project) => (
              <div key={project._id} className="mb-4 break-inside-avoid">
                <ProjectCard project={project} onClick={handleOpen} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center font-serif text-sm text-muted">
            Nenhum projeto nessa categoria ainda.
          </p>
        )}
      </div>

      {lightbox && (
        <Lightbox
          images={
            lightbox.project.gallery.length > 0
              ? [lightbox.project.cover, ...lightbox.project.gallery] as SanityImage[]
              : [lightbox.project.cover] as SanityImage[]
          }
          title={lightbox.project.title}
          initialIndex={lightbox.index}
          open={true}
          onClose={handleClose}
        />
      )}
    </section>
  );
}
