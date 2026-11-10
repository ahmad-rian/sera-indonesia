import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

type Tone = 'sage' | 'forest' | 'outline' | 'surface';

const TONE: Record<Tone, string> = {
  sage: 'bg-sage text-forest',
  forest: 'bg-forest text-forest-ink',
  outline: 'border border-ink/25 text-ink',
  surface: 'bg-surface text-ink shadow-sm',
};

export function IconBadge({
  icon: Icon,
  tone = 'sage',
  size = 'md',
  className,
}: {
  icon: LucideIcon;
  tone?: Tone;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const dims = { sm: 'size-9 [&>svg]:size-4', md: 'size-12 [&>svg]:size-5', lg: 'size-14 [&>svg]:size-6' }[size];
  return (
    <span aria-hidden className={cn('inline-grid shrink-0 place-items-center rounded-full', TONE[tone], dims, className)}>
      <Icon strokeWidth={1.75} />
    </span>
  );
}
