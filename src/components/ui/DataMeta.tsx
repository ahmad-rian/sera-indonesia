import { useTranslation } from 'react-i18next';
import { CloudOff } from 'lucide-react';
import { formatDate, formatRelative } from '../../lib/utils';
import { cn } from '../../lib/utils';

/** Source + freshness line shown under every live number. */
export function DataMeta({
  source,
  asOf,
  isFallback,
  className,
}: {
  source: string;
  asOf: string;
  isFallback: boolean;
  className?: string;
}) {
  const { t, i18n } = useTranslation();
  return (
    <p className={cn('flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted', className)}>
      {isFallback ? (
        <span className="inline-flex items-center gap-1 rounded-full bg-warn/10 px-2 py-0.5 font-semibold text-warn">
          <CloudOff aria-hidden className="size-3" />
          {t('data.fallback', { date: formatDate(asOf, i18n.language) })}
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 font-semibold text-forest">
          <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-current" />
          {t('data.live')} · {formatRelative(asOf, i18n.language)}
        </span>
      )}
      <span>
        {t('data.source')}: {source}
      </span>
    </p>
  );
}
