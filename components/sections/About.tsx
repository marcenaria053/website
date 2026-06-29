import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { portableComponents } from '@/components/portable/PortableComponents';
import { TeamCarousel } from '@/components/sections/TeamCarousel';
import { urlForImage, hasImageAsset } from '@/sanity/lib/image';
import type { About as AboutType } from '@/lib/types';
import { CheckCircle } from 'lucide-react';

interface AboutProps {
  about: AboutType | null;
}

export function About({ about }: AboutProps) {
  if (!about) return null;

  const { photo, body, highlights, team } = about;
  const photoUrl = photo && hasImageAsset(photo) ? urlForImage(photo).width(800).url() : null;
  const hasTeam = (team?.length ?? 0) > 0;

  return (
    <section id="sobre" className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-3 font-serif text-xs uppercase tracking-[0.3em] text-primary">
              Nossa História
            </p>
            <h2 className="mb-8 font-serif text-3xl text-foreground md:text-4xl">
              A Essência 053
            </h2>

            {body && body.length > 0 && (
              <div className="mb-8">
                <PortableText value={body} components={portableComponents} />
              </div>
            )}

            {highlights && highlights.length > 0 && (
              <ul className="space-y-3" role="list">
                {highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="font-serif text-sm text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {hasTeam ? (
            <TeamCarousel team={team!} />
          ) : (
            photoUrl && (
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                <Image
                  src={photoUrl}
                  alt={photo?.alt ?? 'Sobre a 053 Móveis'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  blurDataURL={photo?.lqip}
                  placeholder={photo?.lqip ? 'blur' : 'empty'}
                />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
