import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { DataMeta } from '../../components/ui/DataMeta';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { Skeleton } from '../../components/ui/Skeleton';
import { useIndicators } from '../../features/data/climateHooks';
import type { Indicator } from '../../features/data/types';
import { cn, formatNumber } from '../../lib/utils';
import { Sparkline } from './lazyCharts';

export function IndicatorsSection() {
  const { t } = useTranslation();
  const { data: result } = useIndicators();

  return (
    <section aria-labelledby="trends-title" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <SectionHeader id="trends-title" eyebrow={t('crisis.trends.eyebrow')} title={t('crisis.trends.title')} intro={t('crisis.trends.intro')} />
      {!result ? (
        <Skeleton className="mt-10 h-64 w-full rounded-panel" />
      ) : (
        <>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {result.data.map((ind) => (
              <IndicatorCard key={ind.key} indicator={ind} />
            ))}
          </ul>
          <DataMeta className="mt-4" source={result.source} asOf={result.asOf} isFallback={result.isFallback} />
        </>
      )}
    </section>
  );
}

function IndicatorCard({ indicator }: { indicator: Indicator }) {
  const { t, i18n } = useTranslation();
  const first = indicator.series[0];
  const last = indicator.series[indicator.series.length - 1];
  const change = first.value === 0 ? 0 : ((last.value - first.value) / first.value) * 100;
  const improving = indicator.goodWhen === 'up' ? change >= 0 : change <= 0;
  const Trend = change >= 0 ? TrendingUp : TrendingDown;
  const digits = last.value >= 100 ? 0 : 1;

  return (
    <li className="flex flex-col gap-3 rounded-panel bg-surface p-5">
      <p className="text-sm font-semibold leading-snug">{t(`crisis.trends.items.${indicator.key}`)}</p>
      <p className="text-3xl font-semibold tracking-tight tabular-nums">
        {formatNumber(Number(last.value.toFixed(digits)), i18n.language)}
        <span className="ml-1 text-sm font-medium text-muted">{indicator.unit}</span>
      </p>
      <Suspense fallback={<Skeleton className="h-24 w-full rounded-xl" />}>
        <Sparkline data={indicator.series} id={indicator.key} />
      </Suspense>
      <p className="flex items-center justify-between gap-2 text-xs">
        <span className="text-muted">
          {first.year}–{last.year}
        </span>
        <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-bold', improving ? 'bg-sage text-forest' : 'bg-danger/10 text-danger')}>
          <Trend aria-hidden className="size-3.5" />
          {change >= 0 ? '+' : ''}
          {change.toFixed(1)}%
        </span>
      </p>
    </li>
  );
}
