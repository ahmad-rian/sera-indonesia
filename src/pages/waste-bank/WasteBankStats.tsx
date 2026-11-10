import { useTranslation } from 'react-i18next';
import { DemoBadge } from '../../components/ui/DemoBadge';
import { WASTE_BANK_IS_DEMO, WASTE_BANK_STATS } from '../../data/wasteBank';
import { cn, formatIdr, formatNumber } from '../../lib/utils';

/** Four headline programme numbers. `tone` adapts colours to the surface it sits on. */
export function WasteBankStats({ tone = 'light' }: { tone?: 'light' | 'forest' }) {
  const { t, i18n } = useTranslation();
  const lng = i18n.language;
  const items = [
    { label: t('wasteBank.stats.kg'), value: `${formatNumber(WASTE_BANK_STATS.kgCollected, lng)} kg` },
    { label: t('wasteBank.stats.savings'), value: formatIdr(WASTE_BANK_STATS.savingsIdr, lng) },
    { label: t('wasteBank.stats.members'), value: formatNumber(WASTE_BANK_STATS.members, lng) },
    { label: t('wasteBank.stats.units'), value: formatNumber(WASTE_BANK_STATS.units, lng) },
  ];

  return (
    <div>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
        {items.map((s) => (
          <div key={s.label} className={cn('border-t pt-4', tone === 'forest' ? 'border-forest-ink/20' : 'border-line')}>
            <dt className={cn('text-sm', tone === 'forest' ? 'opacity-75' : 'text-muted')}>{s.label}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">{s.value}</dd>
          </div>
        ))}
      </dl>
      {WASTE_BANK_IS_DEMO && <DemoBadge className="mt-6" onDark={tone === 'forest'} />}
    </div>
  );
}
