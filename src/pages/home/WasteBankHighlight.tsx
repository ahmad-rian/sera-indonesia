import { useTranslation } from 'react-i18next';
import { Recycle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { IconBadge } from '../../components/ui/IconBadge';
import { Reveal } from '../../components/ui/Reveal';
import { ROUTES } from '../../lib/constants';
import { WasteBankStats } from '../waste-bank/WasteBankStats';
import { WasteBankSteps } from '../waste-bank/WasteBankSteps';

export function WasteBankHighlight() {
  const { t } = useTranslation();
  return (
    <section aria-labelledby="wastebank-title" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <Reveal>
        <div className="rounded-hero bg-forest p-6 text-forest-ink sm:p-12">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <div className="mb-6 flex items-center gap-3">
                <IconBadge icon={Recycle} tone="surface" />
                <span className="rounded-full border border-current/30 px-3 py-1 text-xs font-semibold">{t('home.wasteBank.eyebrow')}</span>
              </div>
              <h2 id="wastebank-title" className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
                {t('home.wasteBank.title')}
              </h2>
              <p className="mt-4 max-w-xl opacity-80">{t('home.wasteBank.body')}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to={ROUTES.wasteBank} variant="sage" size="lg" arrow>
                {t('home.wasteBank.cta')}
              </Button>
              <Button to={`${ROUTES.wasteBank}#harga`} variant="outline" size="lg" className="border-current/30 text-current hover:bg-forest-ink/10">
                {t('home.wasteBank.prices')}
              </Button>
            </div>
          </div>
          <div className="mt-12">
            <WasteBankStats tone="forest" />
          </div>
          <div className="mt-10 text-ink">
            <WasteBankSteps compact />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
