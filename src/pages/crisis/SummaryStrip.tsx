import { useTranslation } from 'react-i18next';
import { Flame, Gauge, Thermometer, Waves, type LucideIcon } from 'lucide-react';
import { IconBadge } from '../../components/ui/IconBadge';
import { Skeleton } from '../../components/ui/Skeleton';
import { aqiLevel } from '../../features/data/aqi';
import { useWeather } from '../../features/data/climateHooks';
import { useAirQuality, useEarthquakes, useHotspots } from '../../features/data/hooks';
import { formatNumber } from '../../lib/utils';

/** Four headline numbers at the top of the dashboard. */
export function SummaryStrip() {
  const { t, i18n } = useTranslation();
  const air = useAirQuality().data;
  const weather = useWeather().data;
  const quakes = useEarthquakes().data;
  const fires = useHotspots().data;

  const worst = air?.data.cities.reduce((a, b) => (b.aqi > a.aqi ? b : a));
  const hottest = weather?.data.reduce((a, b) => ((b.feelsLike ?? b.temp) > (a.feelsLike ?? a.temp) ? b : a));

  const items: { icon: LucideIcon; label: string; value?: string; caption?: string }[] = [
    { icon: Gauge, label: t('crisis.summary.air'), value: worst && `AQI ${worst.aqi}`, caption: worst && `${worst.city} · ${t(`aqi.${aqiLevel(worst.aqi)}`)}` },
    {
      icon: Thermometer,
      label: t('crisis.summary.heat'),
      value: hottest && `${Math.round(hottest.feelsLike ?? hottest.temp)}°C`,
      caption: hottest && `${hottest.city} · ${t('crisis.summary.feelsLike')}`,
    },
    { icon: Waves, label: t('crisis.summary.quake'), value: quakes && `M ${quakes.data.latest.magnitude.toFixed(1)}`, caption: quakes?.data.latest.region },
    {
      icon: Flame,
      label: t('crisis.summary.fire'),
      value: fires ? (fires.data ? formatNumber(fires.data.total, i18n.language) : '—') : undefined,
      caption: fires && (fires.data ? t('crisis.fire.subtitle') : t('data.unavailable')),
    },
  ];

  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map(({ icon, label, value, caption }) => (
        <li key={label} className="flex flex-col gap-3 rounded-card bg-surface p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-muted">{label}</span>
            <IconBadge icon={icon} size="sm" />
          </div>
          {value === undefined ? <Skeleton className="h-8 w-24" /> : <p className="text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">{value}</p>}
          {caption && <p className="line-clamp-2 text-xs text-muted">{caption}</p>}
        </li>
      ))}
    </ul>
  );
}
