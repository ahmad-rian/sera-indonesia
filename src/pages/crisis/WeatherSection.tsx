import { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CloudRain, Thermometer } from 'lucide-react';
import { BentoCard } from '../../components/ui/BentoCard';
import { DataMeta } from '../../components/ui/DataMeta';
import { IconBadge } from '../../components/ui/IconBadge';
import { Skeleton } from '../../components/ui/Skeleton';
import { useWeather } from '../../features/data/climateHooks';
import type { CityWeather } from '../../features/data/types';
import { cn } from '../../lib/utils';
import { ForecastChart } from './lazyCharts';
import { WEATHER_ICON, weatherKind } from './weatherCode';

const sum = (xs: (number | null)[]) => xs.reduce<number>((s, x) => s + (x ?? 0), 0);
const round1 = (n: number) => Math.round(n * 10) / 10;

export function WeatherSection() {
  const { t } = useTranslation();
  const { data: result } = useWeather();
  const [selected, setSelected] = useState('Jakarta');

  if (!result) return <Skeleton className="h-[34rem] w-full rounded-panel" />;

  const cities = result.data;
  const hottest = cities.reduce((a, b) => ((b.feelsLike ?? b.temp) > (a.feelsLike ?? a.temp) ? b : a));
  const wettest = cities.reduce((a, b) => (sum(b.daily.map((d) => d.rain)) > sum(a.daily.map((d) => d.rain)) ? b : a));
  const city = cities.find((c) => c.city === selected) ?? cities[0];

  return (
    <BentoCard className="flex flex-col gap-8 p-6 sm:p-8">
      <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h3 className="text-xl font-semibold">{t('crisis.weather.title')}</h3>
          <p className="text-sm text-muted">{t('crisis.weather.subtitle')}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Callout icon={Thermometer} label={t('crisis.weather.hottest')} value={`${hottest.city} · ${round1(hottest.feelsLike ?? hottest.temp)}°C`} />
          <Callout icon={CloudRain} label={t('crisis.weather.wettest')} value={`${wettest.city} · ${round1(sum(wettest.daily.map((d) => d.rain)))} mm`} />
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
        <div className="-mx-2">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-muted">
              <tr>
                <th scope="col" className="px-2 py-2 font-semibold">{t('crisis.weather.cols.city')}</th>
                <th scope="col" className="px-2 py-2 font-semibold">{t('crisis.weather.cols.now')}</th>
                <th scope="col" className="px-2 py-2 text-right font-semibold">{t('crisis.weather.cols.feels')}</th>
                <th scope="col" className="hidden px-2 py-2 text-right font-semibold sm:table-cell">{t('crisis.weather.cols.humidity')}</th>
                <th scope="col" className="hidden px-2 py-2 text-right font-semibold sm:table-cell">{t('crisis.weather.cols.rain7')}</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((c) => (
                <WeatherRow key={c.city} city={c} active={c.city === city.city} onSelect={() => setSelected(c.city)} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-4 rounded-panel bg-bg p-5">
          <h4 className="text-sm font-semibold">{t('crisis.weather.forecast', { city: city.city })}</h4>
          <Suspense fallback={<Skeleton className="h-60 w-full rounded-card" />}>
            <ForecastChart daily={city.daily} />
          </Suspense>
          <p className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-4 bg-danger" />{t('crisis.weather.series.max')}</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-0.5 w-4 bg-forest" />{t('crisis.weather.series.min')}</span>
            <span className="inline-flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-sage-strong" />{t('crisis.weather.series.rain')}</span>
          </p>
        </div>
      </div>
      <DataMeta source={result.source} asOf={result.asOf} isFallback={result.isFallback} />
    </BentoCard>
  );
}

function WeatherRow({ city, active, onSelect }: { city: CityWeather; active: boolean; onSelect: () => void }) {
  const { t } = useTranslation();
  const kind = weatherKind(city.weatherCode);
  const Icon = WEATHER_ICON[kind];
  return (
    <tr className={cn('border-t border-line transition-colors', active ? 'bg-sage' : 'hover:bg-surface-2')}>
      <th scope="row" className="px-2 py-2.5 font-medium">
        <button type="button" onClick={onSelect} aria-pressed={active} className="text-left underline-offset-4 hover:underline">
          {city.city}
        </button>
      </th>
      <td className="px-2 py-2.5">
        <span className="inline-flex items-center gap-2 tabular-nums">
          <Icon aria-hidden className="size-4 text-forest" />
          {round1(city.temp)}°C
          <span className="sr-only">{t(`crisis.weather.kind.${kind}`)}</span>
        </span>
      </td>
      <td className="px-2 py-2.5 text-right tabular-nums">{city.feelsLike === null ? '—' : `${round1(city.feelsLike)}°`}</td>
      <td className="hidden px-2 py-2.5 text-right tabular-nums sm:table-cell">{city.humidity === null ? '—' : `${city.humidity}%`}</td>
      <td className="hidden px-2 py-2.5 text-right tabular-nums sm:table-cell">{round1(sum(city.daily.map((d) => d.rain)))} mm</td>
    </tr>
  );
}

function Callout({ icon, label, value }: { icon: typeof Thermometer; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-surface-2 px-4 py-3">
      <IconBadge icon={icon} size="sm" />
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}
