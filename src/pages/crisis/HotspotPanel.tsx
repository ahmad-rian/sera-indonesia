import { useTranslation } from 'react-i18next';
import { ExternalLink, Flame } from 'lucide-react';
import { BentoCard } from '../../components/ui/BentoCard';
import { DataMeta } from '../../components/ui/DataMeta';
import { IconBadge } from '../../components/ui/IconBadge';
import { Skeleton } from '../../components/ui/Skeleton';
import { useHotspots } from '../../features/data/hooks';
import { formatNumber } from '../../lib/utils';

const FIRE_MAPS = [
  { key: 'firms', name: 'NASA FIRMS Fire Map', url: 'https://firms.modaps.eosdis.nasa.gov/map/#d:24hrs;@117.0,-2.5,5.0z' },
  { key: 'sipongi', name: 'SiPongi KLHK', url: 'https://sipongi.menlhk.go.id/' },
  { key: 'gfw', name: 'Global Forest Watch', url: 'https://www.globalforestwatch.org/map/country/IDN/' },
] as const;

export function HotspotPanel() {
  const { t, i18n } = useTranslation();
  const { data: result } = useHotspots();
  const summary = result?.data;
  const peak = summary?.byRegion[0]?.count ?? 1;

  return (
    <BentoCard tone="sage" className="flex flex-col gap-5 p-6 sm:p-8">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">{t('crisis.fire.title')}</h3>
          <p className="text-sm text-ink/70">{t('crisis.fire.subtitle')}</p>
        </div>
        <IconBadge icon={Flame} tone="surface" size="sm" />
      </header>

      {!result ? (
        <Skeleton className="h-24 w-full rounded-card" />
      ) : !summary ? (
        <p className="rounded-card bg-surface/70 p-4 text-sm">{t('crisis.fire.unavailable')}</p>
      ) : (
        <>
          <p className="text-5xl font-semibold tabular-nums">
            {formatNumber(summary.total, i18n.language)}
            <span className="ml-2 text-sm font-medium text-ink/70">
              {t('crisis.fire.high', { count: summary.highConfidence })}
            </span>
          </p>
          <ul className="flex flex-col gap-2 text-sm">
            {summary.byRegion.slice(0, 5).map((r) => (
              <li key={r.region} className="grid grid-cols-[7rem_1fr_3rem] items-center gap-3">
                <span>{t(`region.${r.region}`)}</span>
                <span className="h-2 overflow-hidden rounded-full bg-surface/70">
                  <span className="block h-full rounded-full bg-forest" style={{ width: `${(r.count / peak) * 100}%` }} />
                </span>
                <span className="text-right tabular-nums">{r.count}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-ink/60">{t('crisis.fire.approx')}</p>
        </>
      )}

      <div className="mt-auto flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink/60">{t('crisis.fire.liveMaps')}</p>
        {FIRE_MAPS.map((m) => (
          <a
            key={m.url}
            href={m.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 rounded-2xl bg-surface/70 px-4 py-3 text-sm font-semibold transition-colors hover:bg-surface"
          >
            <span>
              {m.name}
              <span className="block text-xs font-normal text-ink/60">{t(`crisis.fire.maps.${m.key}`)}</span>
            </span>
            <ExternalLink aria-hidden className="size-4 shrink-0" />
          </a>
        ))}
      </div>

      {result && <DataMeta source={result.source} asOf={result.asOf} isFallback={result.isFallback} />}
    </BentoCard>
  );
}
