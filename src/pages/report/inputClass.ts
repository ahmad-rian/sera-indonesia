import { cn } from '../../lib/utils';

export function inputClass(invalid: boolean, extra?: string) {
  return cn(
    'h-12 w-full rounded-2xl border bg-bg px-4 text-sm text-ink placeholder:text-muted/70 transition-colors',
    'focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20',
    invalid ? 'border-danger' : 'border-line',
    extra,
  );
}
