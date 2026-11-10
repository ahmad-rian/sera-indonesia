import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Waves } from 'lucide-react';
import { BentoCard } from '../../components/ui/BentoCard';
import { DataMeta } from '../../components/ui/DataMeta';
import { IconBadge } from '../../components/ui/IconBadge';
import { Skeleton } from '../../components/ui/Skeleton';
import { useEarthquakes } from '../../features/data/hooks';
import type { Earthquake } from '../../features/data/types';
import { cn, formatDate } from '../../lib/utils';

/** BMKG classes events shallower than this as shallow (most damaging). */
const SHALLOW_KM = 70;
type Tab = 'significant' | 'felt';

export function QuakePanel() {
  const { t, i18n } = useTranslation();
  const { data: result } = useEarthquakes();
  const [tab, setTab] = useState<Tab>('significant');

  if (!result) return <Skeleton className="h-[32rem] w-full rounded-panel" />;

  const { latest, significant, feltReports } = result.data;
  const list = tab === 'significant' ? significant : feltReports;
  const strongest = significant.reduce<Earthquake | null>((a, b) => (!a || b.magnitude > a.magnitude ? b : a), null);
  const shallow = significant.filter((q) => q.depthKm < SHALLOW_KM).length;

  return (
    <BentoCard className="flex flex-col gap-5 p-6 sm:p-8">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">{t('crisis.quake.title')}</h3>
          <p className="text-sm text-muted">{t('crisis.quake.subtitle')}</p>
        </div>
        <IconBadge icon={Waves} size="sm" />
      </header>

      <div className="rounded-card bg-forest p-5 text-forest-ink">
        <p className="text-xs font-semibold uppercase tracking-wide opacity-75">{t('crisis.quake.latest')}</p>
        <p className="mt-1 text-4xl font-semibold tabular-nums">M {latest.magnitude.toFixed(1)}</p>
        <p className="text-sm">{latest.region}</p>
        <p className="mt-2 text-xs opacity-75">
          {formatDate(latest.datetime, i18n.language, true)} WIB · {t('crisis.quake.depth', { km: latest.depthKm })}
          {latest.felt ? ` · ${t('crisis.quake.feltIn', { where: latest.felt })}` : ''}
        </p>
      </div>

      <dl className="grid grid-cols-3 gap-3 text-center">
        <Stat label={t('crisis.quake.statCount')} value={String(significant.length)} />
        <Stat label={t('crisis.quake.statMax')} value={strongest ? `M ${strongest.magnitude.toFixed(1)}` : '—'} />
        <Stat label={t('crisis.quake.statShallow')} value={String(shallow)} />
      </dl>

      <div role="tablist" aria-label={t('crisis.quake.title')} className="flex gap-1 rounded-full bg-surface-2 p-1">
        {(['significant', 'felt'] as const).map((k) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={tab === k}
            onClick={() => setTab(k)}
            className={cn('h-9 flex-1 rounded-full text-sm font-semibold transition-colors', tab === k ? 'bg-ink text-bg' : 'text-muted hover:text-ink')}
          >
            {t(`crisis.quake.tabs.${k}`)}
          </button>
        ))}
      </div>

      <ul role="tabpanel" className="max-h-96 divide-y divide-line overflow-y-auto pr-1 text-sm">
        {list.map((q) => (
          <li key={`${q.datetime}-${q.region}`} className="flex items-center justify-between gap-3 py-2.5">
            <span className="min-w-0">
              <span className="block truncate font-medium">{q.region}</span>
              <span className="text-xs text-muted">
                {formatDate(q.datetime, i18n.language, true)} · {t('crisis.quake.depth', { km: q.depthKm })}
                {tab === 'felt' && q.felt ? ` · ${q.felt}` : ''}
              </span>
            </span>
            <span
              className={cn(
                'shrink-0 rounded-full px-2.5 py-1 text-xs font-bold tabular-nums',
                q.magnitude >= 6 ? 'bg-danger/15 text-danger' : 'bg-sage text-forest',
              )}
            >
              M {q.magnitude.toFixed(1)}
            </span>
          </li>
        ))}
      </ul>
      <DataMeta source={result.source} asOf={result.asOf} isFallback={result.isFallback} />
    </BentoCard>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface-2 px-2 py-3">
      <dt className="text-[11px] text-muted">{label}</dt>
      <dd className="text-lg font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
