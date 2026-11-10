import { useTranslation } from 'react-i18next';
import { FlaskConical } from 'lucide-react';
import { cn } from '../../lib/utils';

/** Marks placeholder numbers so they are never mistaken for real programme data. */
export function DemoBadge({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  const { t } = useTranslation();
  return (
    <span
      title={t('wasteBank.demoHint')}
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
        onDark ? 'bg-forest-ink/15 text-forest-ink' : 'bg-warn/10 text-warn',
        className,
      )}
    >
      <FlaskConical aria-hidden className="size-3" />
      {t('wasteBank.demo')}
    </span>
  );
}
