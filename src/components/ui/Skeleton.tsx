import { cn } from '../../lib/utils';

export function Skeleton({ className }: { className?: string }) {
  return <span aria-hidden className={cn('block animate-pulse rounded-full bg-ink/10', className)} />;
}
