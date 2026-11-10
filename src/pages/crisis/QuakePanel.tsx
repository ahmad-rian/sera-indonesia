import { useTranslation } from 'react-i18next';
import { Waves } from 'lucide-react';
import { BentoCard } from '../../components/ui/BentoCard';
import { DataMeta } from '../../components/ui/DataMeta';
import { IconBadge } from '../../components/ui/IconBadge';
import { Skeleton } from '../../components/ui/Skeleton';
import { useEarthquakes } from '../../features/data/hooks';
import { formatDate } from '../../lib/utils';

export function QuakePanel() {
  const { t, i18n } = useTranslation();
  const { data: result } = useEarthquakes();

  return (
    <BentoCard className="flex flex-col gap-5 p-6 sm:p-8">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">{t('crisis.quake.title')}</h3>
          <p className="text-sm text-muted">{t('crisis.quake.subtitle')}</p>
        </div>
        <IconBadge icon={Waves} size="sm" />
      </header>

      {!result ? (
        <Skeleton className="h-32 w-full rounded-card" />
      ) : (
        <>
          <div className="rounded-card bg-surface-2 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">{t('crisis.quake.latest')}</p>
            <p className="mt-1 text-3xl font-semibold tabular-nums">M {result.data.latest.magnitude.toFixed(1)}</p>
            <p className="text-sm">{result.data.latest.region}</p>
            <p className="mt-1 text-xs text-muted">
              {formatDate(result.data.latest.datetime, i18n.language, true)} WIB · {result.data.latest.depthKm} km
            </p>
          </div>
          <ul className="divide-y divide-line text-sm">
            {result.data.significant.map((q) => (
              <li key={q.datetime} className="flex items-center justify-between gap-3 py-2.5">
                <span className="min-w-0">
                  <span className="block truncate font-medium">{q.region}</span>
                  <span className="text-xs text-muted">{formatDate(q.datetime, i18n.language, true)}</span>
                </span>
                <span className="shrink-0 rounded-full bg-sage px-2.5 py-1 text-xs font-bold tabular-nums text-forest">
                  M {q.magnitude.toFixed(1)}
                </span>
              </li>
            ))}
          </ul>
          <DataMeta source={result.source} asOf={result.asOf} isFallback={result.isFallback} />
        </>
      )}
    </BentoCard>
  );
}
