'use client';

import { categoryLabels } from '@/lib/utils';
import type { ProjectCategory } from '@/lib/types';

type FilterCategory = ProjectCategory | 'todos';

interface FilterBarProps {
  active: FilterCategory;
  categories: FilterCategory[];
  onChange: (category: FilterCategory) => void;
}

export function FilterBar({ active, categories, onChange }: FilterBarProps) {
  return (
    <div role="group" aria-label="Filtrar projetos por categoria" className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          aria-pressed={active === cat}
          className={`rounded-sm px-4 py-2 font-serif text-xs uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
            active === cat
              ? 'bg-primary text-primary-foreground'
              : 'border border-border text-muted hover:border-primary hover:text-foreground'
          }`}
        >
          {categoryLabels[cat]}
        </button>
      ))}
    </div>
  );
}
