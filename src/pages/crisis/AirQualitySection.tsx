import { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sun } from 'lucide-react';
import { BentoCard } from '../../components/ui/BentoCard';
import { DataMeta } from '../../components/ui/DataMeta';
import { Skeleton } from '../../components/ui/Skeleton';
import { AQI_BAR, AQI_TONE, aqiLevel } from '../../features/data/aqi';
import { useAirQuality, useCityTrend } from '../../features/data/hooks';
import type { CityAirQuality } from '../../features/data/types';
import { cn } from '../../lib/utils';
import { AqiTrendChart } from './lazyCharts';
import { PollutantGrid } from './PollutantGrid';

/** AQI scale shown in the bars tops out at "very unhealthy". */
const AQI_BAR_MAX = 300;
const DEFAULT_CITY = 'Jakarta';

export function AirQualitySection() {
  const { t } = useTranslation();
  const { data: result } = useAirQuality();
  const [selected, setSelected] = useState(DEFAULT_CITY);

  if (!result) return <Skeleton className="h-[40rem] w-full rounded-panel" />;

  const ranked = [...result.data.cities].sort((a, b) => b.aqi - a.aqi);
  const reading = result.data.cities.find((c) => c.city === selected) ?? ranked[0];
  const unhealthy = ranked.filter((c) => c.aqi > 100).length;

  return (
    <BentoCard className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.15fr]">
      <div className="flex flex-col gap-5">
        <header>
          <h3 className="text-xl font-semibold">{t('crisis.air.title')}</h3>
          <p className="text-sm text-muted">{t('crisis.air.subtitle', { count: ranked.length, unhealthy })}</p>
        </header>
        <ul className="flex flex-col gap-1" aria-label={t('crisis.air.ranking')}>
          {ranked.map((c) => (
            <CityRow key={c.city} reading={c} active={c.city === reading.city} onSelect={() => setSelected(c.city)} />
          ))}
        </ul>
        <DataMeta source={result.source} asOf={result.asOf} isFallback={result.isFallback} />
      </div>
      <CityDetail reading={reading} />
    </BentoCard>
  );
}

function CityRow({ reading, active, onSelect }: { reading: CityAirQuality; active: boolean; onSelect: () => void }) {
  const { t } = useTranslation();
  const level = aqiLevel(reading.aqi);
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={active}
        className={cn(
          'grid w-full grid-cols-[7.5rem_1fr_3rem] items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors sm:grid-cols-[8.5rem_1fr_3rem]',
          active ? 'bg-sage' : 'hover:bg-surface-2',
        )}
      >
        <span className="truncate font-medium">{reading.city}</span>
        <span className="h-2 overflow-hidden rounded-full bg-ink/10" title={t(`aqi.${level}`)}>
          <span
            className={cn('block h-full rounded-full', AQI_BAR[level])}
            style={{ width: `${Math.min(100, (reading.aqi / AQI_BAR_MAX) * 100)}%` }}
          />
        </span>
        <span className={cn('rounded-full px-2 py-0.5 text-center text-xs font-bold tabular-nums', AQI_TONE[level])}>{reading.aqi}</span>
      </button>
    </li>
  );
}

function CityDetail({ reading }: { reading: CityAirQuality }) {
  const { t } = useTranslation();
  const { data: trend } = useCityTrend(reading.city);
  const level = aqiLevel(reading.aqi);

  return (
    <div className="flex flex-col gap-6 rounded-panel bg-bg p-5 sm:p-6" aria-live="polite">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-muted">{reading.city}</p>
          <p className="text-6xl font-semibold tracking-tight tabular-nums">{reading.aqi}</p>
          <span className={cn('mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold', AQI_TONE[level])}>{t(`aqi.${level}`)}</span>
        </div>
        {reading.uv !== null && (
          <p className="flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-sm font-semibold">
            <Sun aria-hidden className="size-4 text-warn" /> UV {reading.uv.toFixed(1)}
          </p>
        )}
      </div>
      <p className="text-sm text-muted">{t(`crisis.air.advice.${level}`)}</p>
      <PollutantGrid reading={reading} />
      <div>
        <h4 className="mb-3 text-sm font-semibold">{t('crisis.air.trend', { city: reading.city })}</h4>
        {!trend ? (
          <Skeleton className="h-56 w-full rounded-card" />
        ) : trend.data.length === 0 ? (
          <p className="rounded-card bg-surface p-4 text-sm text-muted">{t('data.unavailable')}</p>
        ) : (
          <Suspense fallback={<Skeleton className="h-56 w-full rounded-card" />}>
            <AqiTrendChart data={trend.data} />
          </Suspense>
        )}
      </div>
    </div>
  );
}
