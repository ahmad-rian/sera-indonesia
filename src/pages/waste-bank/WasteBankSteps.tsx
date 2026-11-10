import { useTranslation } from 'react-i18next';
import { Droplets, Filter, PackageCheck, PiggyBank, Scale, type LucideIcon } from 'lucide-react';
import { IconBadge } from '../../components/ui/IconBadge';
import { WASTE_BANK_STEPS } from '../../data/wasteBank';
import { cn } from '../../lib/utils';

const STEP_ICON: Record<(typeof WASTE_BANK_STEPS)[number], LucideIcon> = {
  sort: Filter,
  clean: Droplets,
  deposit: PackageCheck,
  weigh: Scale,
  save: PiggyBank,
};

const LAST = WASTE_BANK_STEPS.length - 1;

export function WasteBankSteps({ compact = false }: { compact?: boolean }) {
  const { t } = useTranslation();
  return (
    <ol className={cn('grid gap-4', compact ? 'grid-cols-2 sm:grid-cols-5' : 'sm:grid-cols-2 lg:grid-cols-5')}>
      {WASTE_BANK_STEPS.map((step, i) => (
        <li
          key={step}
          className={cn(
            'flex flex-col gap-4 rounded-card p-5',
            i === LAST ? 'bg-forest text-forest-ink' : 'bg-surface',
            compact && i === LAST && 'col-span-2 sm:col-span-1',
          )}
        >
          <div className="flex items-center justify-between">
            <IconBadge icon={STEP_ICON[step]} size="sm" tone={i === LAST ? 'surface' : 'sage'} />
            <span className="text-xs font-bold opacity-60">0{i + 1}</span>
          </div>
          <div>
            <h3 className="font-semibold">{t(`wasteBank.steps.${step}.title`)}</h3>
            {!compact && <p className="mt-1 text-sm opacity-75">{t(`wasteBank.steps.${step}.body`)}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
