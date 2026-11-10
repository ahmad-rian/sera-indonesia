import { useTranslation } from 'react-i18next';
import { Megaphone } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { IconBadge } from '../../components/ui/IconBadge';
import { ROUTES } from '../../lib/constants';

export function CtaBanner() {
  const { t } = useTranslation();
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <div className="relative overflow-hidden rounded-hero bg-forest px-6 py-14 text-forest-ink sm:px-12 lg:py-20">
        <div aria-hidden className="absolute -right-24 -top-24 size-80 rounded-full border border-current opacity-15" />
        <div aria-hidden className="absolute -right-8 -top-8 size-48 rounded-full border border-current opacity-15" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <IconBadge icon={Megaphone} tone="surface" className="mb-6" />
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">{t('home.cta.title')}</h2>
            <p className="mt-4 max-w-lg opacity-80">{t('home.cta.body')}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to={ROUTES.report} variant="sage" size="lg" arrow>
              {t('home.cta.report')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
