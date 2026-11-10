import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { Pill } from './Pill';

export function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
  className,
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn('flex flex-col gap-5', className)}>
      <Pill className="self-start">{eyebrow}</Pill>
      <h2 id={id} className="max-w-4xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {intro && <p className="max-w-2xl text-base text-muted sm:text-lg">{intro}</p>}
    </header>
  );
}
