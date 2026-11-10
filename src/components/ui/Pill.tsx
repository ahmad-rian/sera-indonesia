import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type Tone = 'outline' | 'sage' | 'surface' | 'danger' | 'warn';

const TONE: Record<Tone, string> = {
  outline: 'border border-ink/20 text-ink',
  sage: 'bg-sage text-forest',
  surface: 'bg-surface text-ink',
  danger: 'bg-danger/10 text-danger',
  warn: 'bg-warn/10 text-warn',
};

export function Pill({ tone = 'outline', className, children }: { tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold', TONE[tone], className)}
    >
      {children}
    </span>
  );
}
