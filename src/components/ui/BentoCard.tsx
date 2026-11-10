import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '../../lib/utils';

type Tone = 'surface' | 'sage' | 'forest' | 'muted';

const TONE: Record<Tone, string> = {
  surface: 'bg-surface',
  sage: 'bg-sage',
  forest: 'bg-forest text-forest-ink',
  muted: 'bg-surface-2',
};

export function BentoCard({
  tone = 'surface',
  className,
  ...rest
}: ComponentPropsWithoutRef<'div'> & { tone?: Tone }) {
  return <div {...rest} className={cn('relative overflow-hidden rounded-card p-6', TONE[tone], className)} />;
}
