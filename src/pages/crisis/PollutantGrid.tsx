import { useTranslation } from 'react-i18next';
import type { CityAirQuality } from '../../features/data/types';
import { cn, formatNumber } from '../../lib/utils';
import { POLLUTANTS, WHO_24H } from './who';

/** Each pollutant vs its WHO 24h guideline; the bar is capped at 4× the guideline. */
const BAR_CAP_MULTIPLE = 4;

export function PollutantGrid({ reading }: { reading: CityAirQuality }) {
  const { t, i18n } = useTranslation();
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {POLLUTANTS.map(({ key, label }) => {
        const value = reading[key];
        const ratio = value === null ? null : value / WHO_24H[key];
        const over = ratio !== null && ratio > 1;
        return (
          <li key={key} className="rounded-2xl bg-surface-2 p-4">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-semibold">{label}</span>
              {ratio !== null && (
                <span className={cn('text-xs font-bold tabular-nums', over ? 'text-danger' : 'text-forest')}>
                  {ratio.toFixed(1)}× WHO
                </span>
              )}
            </div>
            <p className="mt-2 text-xl font-semibold tabular-nums">
              {value === null ? '—' : formatNumber(Math.round(value * 10) / 10, i18n.language)}
              <span className="ml-1 text-xs font-normal text-muted">µg/m³</span>
            </p>
            <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-ink/10">
              <span
                className={cn('block h-full rounded-full', over ? 'bg-danger' : 'bg-forest')}
                style={{ width: `${Math.min(100, ((ratio ?? 0) / BAR_CAP_MULTIPLE) * 100)}%` }}
              />
            </span>
            <span className="mt-1.5 block text-[11px] text-muted">
              {t('crisis.air.guideline', { value: formatNumber(WHO_24H[key], i18n.language) })}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
