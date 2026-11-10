import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarHeart } from 'lucide-react';
import { upcomingObservances } from '../../data/observances';
import { useLocalized } from '../../lib/localized';
import { formatDate } from '../../lib/utils';

export function ObservanceTile() {
  const { t, i18n } = useTranslation();
  const { t: pick } = useLocalized();
  const [next] = useMemo(() => upcomingObservances(new Date(), 1), []);

  return (
    <div className="relative flex aspect-[4/5] flex-col items-center justify-center overflow-hidden rounded-panel bg-sage p-5 text-center lg:aspect-auto lg:h-[58%]">
      <div aria-hidden className="absolute inset-0 grid place-items-center">
        {[90, 70, 50].map((pct) => (
          <span key={pct} className="absolute rounded-full border border-forest/15" style={{ width: `${pct}%`, aspectRatio: '1' }} />
        ))}
      </div>
      <CalendarHeart aria-hidden className="relative mb-2 size-5 text-forest" strokeWidth={1.75} />
      <p className="relative text-sm font-semibold leading-snug">{pick(next.name)}</p>
      <p className="relative mt-1 text-xs text-ink/60">
        {formatDate(next.date.toISOString(), i18n.language)} ·{' '}
        {next.daysAway === 0 ? t('home.bento.today') : t('home.bento.daysAway', { count: next.daysAway })}
      </p>
    </div>
  );
}
