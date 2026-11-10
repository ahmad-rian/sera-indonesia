import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { BentoCard } from '../../components/ui/BentoCard';
import { DataMeta } from '../../components/ui/DataMeta';
import { Skeleton } from '../../components/ui/Skeleton';
import { AQI_TONE, aqiLevel } from '../../features/data/aqi';
import { useAirQuality } from '../../features/data/hooks';
import { cn } from '../../lib/utils';

const AqiTrendChart = lazy(() => import('./AqiTrendChart'));

/** AQI scale shown in the bars tops out at "very unhealthy". */
const AQI_BAR_MAX = 300;

export function AirQualityPanel() {
  const { t } = useTranslation();
  const { data: result, isPending } = useAirQuality();

  return (
    <BentoCard className="flex flex-col gap-8 p-6 sm:p-8">
      <header className="flex flex-col gap-1">
        <h3 className="text-xl font-semibold">{t('crisis.air.title')}</h3>
        <p className="text-sm text-muted">{t('crisis.air.subtitle')}</p>
      </header>

      {isPending || !result ? (
        <div className="flex flex-col gap-3" aria-busy="true">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <>
          <ul className="flex flex-col gap-2.5">
            {[...result.data.cities]
              .sort((a, b) => b.aqi - a.aqi)
              .map((c) => {
                const level = aqiLevel(c.aqi);
                return (
                  <li key={c.city} className="grid grid-cols-[7rem_1fr_auto] items-center gap-3 text-sm sm:grid-cols-[9rem_1fr_auto]">
                    <span className="font-medium">{c.city}</span>
                    <span className="h-2.5 overflow-hidden rounded-full bg-surface-2">
                      <span
                        className="block h-full rounded-full bg-forest"
                        style={{ width: `${Math.min(100, (c.aqi / AQI_BAR_MAX) * 100)}%` }}
                      />
                    </span>
                    <span className={cn('min-w-28 rounded-full px-2.5 py-1 text-center text-xs font-semibold tabular-nums', AQI_TONE[level])}>
                      {c.aqi} · {t(`aqi.${level}`)}
                    </span>
                  </li>
                );
              })}
          </ul>

          <div>
            <h4 className="mb-3 text-sm font-semibold">{t('crisis.air.trend')}</h4>
            <Suspense fallback={<Skeleton className="h-56 w-full rounded-card" />}>
              <AqiTrendChart data={result.data.trend} />
            </Suspense>
          </div>

          <DataMeta source={result.source} asOf={result.asOf} isFallback={result.isFallback} />
        </>
      )}
    </BentoCard>
  );
}
