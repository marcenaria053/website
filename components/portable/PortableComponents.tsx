import type { PortableTextComponents } from '@portabletext/react';

export const portableComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 leading-relaxed text-foreground/80">{children}</p>,
    h2: ({ children }) => <h2 className="mb-3 mt-6 font-serif text-2xl text-foreground">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-2 mt-4 font-serif text-xl text-foreground">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-4 border-l-2 border-primary pl-4 italic text-muted">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-5">{children}</ul>,
    number: ({ children }) => <ol className="mb-4 list-decimal space-y-1 pl-5">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-foreground/80">{children}</li>,
    number: ({ children }) => <li className="text-foreground/80">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
  },
  unknownType: () => null,
  unknownMark: ({ children }) => <>{children}</>,
};
