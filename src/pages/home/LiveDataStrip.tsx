import { useTranslation } from 'react-i18next';
import { Flame, Gauge, Waves } from 'lucide-react';
import { BentoCard } from '../../components/ui/BentoCard';
import { Button } from '../../components/ui/Button';
import { DataMeta } from '../../components/ui/DataMeta';
import { IconBadge } from '../../components/ui/IconBadge';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Skeleton } from '../../components/ui/Skeleton';
import { aqiLevel } from '../../features/data/aqi';
import { useAirQuality, useEarthquakes, useHotspots } from '../../features/data/hooks';
import type { DataResult } from '../../features/data/types';
import { ROUTES } from '../../lib/constants';
import { formatNumber } from '../../lib/utils';

function LiveStat({
  icon,
  label,
  value,
  caption,
  result,
  tone = 'surface',
}: {
  icon: typeof Gauge;
  label: string;
  value?: string;
  caption?: string;
  result?: DataResult<unknown>;
  tone?: 'surface' | 'sage' | 'forest';
}) {
  return (
    <BentoCard tone={tone} className="flex min-h-64 flex-col justify-between gap-8 p-7">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm font-semibold">{label}</p>
        <IconBadge icon={icon} tone={tone === 'forest' ? 'surface' : tone === 'sage' ? 'surface' : 'sage'} size="sm" />
      </div>
      <div>
        {value === undefined ? (
          <Skeleton className="h-12 w-32" />
        ) : (
          <p className="text-5xl font-semibold tracking-tight tabular-nums">{value}</p>
        )}
        {caption && <p className="mt-2 text-sm opacity-80">{caption}</p>}
        {result && (
          <DataMeta source={result.source} asOf={result.asOf} isFallback={result.isFallback} className="mt-4 [&_*]:text-current/70" />
        )}
      </div>
    </BentoCard>
  );
}

export function LiveDataStrip() {
  const { t, i18n } = useTranslation();
  const air = useAirQuality().data;
  const quakes = useEarthquakes().data;
  const fires = useHotspots().data;

  const worst = air?.data.cities.reduce((a, b) => (b.aqi > a.aqi ? b : a));
  const fireValue = fires ? (fires.data ? formatNumber(fires.data.total, i18n.language) : '—') : undefined;

  return (
    <section aria-labelledby="live-title" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeader id="live-title" eyebrow={t('home.live.eyebrow')} title={t('home.live.title')} />
        <Button to={`${ROUTES.crisis}#data`} variant="outline" arrow>
          {t('home.live.cta')}
        </Button>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <LiveStat
          icon={Gauge}
          label={t('home.live.worstAir')}
          value={worst ? String(worst.aqi) : undefined}
          caption={worst ? `${worst.city} · ${t(`aqi.${aqiLevel(worst.aqi)}`)}` : undefined}
          result={air}
        />
        <LiveStat
          icon={Flame}
          tone="sage"
          label={t('home.live.hotspots')}
          value={fireValue}
          caption={fires && !fires.data ? t('data.unavailable') : t('home.live.hotspotsCaption')}
          result={fires}
        />
        <LiveStat
          icon={Waves}
          tone="forest"
          label={t('home.live.quakes')}
          value={quakes ? String(quakes.data.significant.length) : undefined}
          caption={quakes ? t('home.live.quakesCaption', { max: Math.max(...quakes.data.significant.map((q) => q.magnitude)).toFixed(1) }) : undefined}
          result={quakes}
        />
      </div>
    </section>
  );
}
