import { useTranslation } from 'react-i18next';
import { ShieldCheck, Clock, MapPinned } from 'lucide-react';
import { IconBadge } from '../../components/ui/IconBadge';
import { PageHero } from '../../components/ui/PageHero';
import { usePageTitle } from '../../lib/usePageTitle';
import { ReportForm } from './ReportForm';

const TIPS = [
  { key: 'location', icon: MapPinned },
  { key: 'time', icon: Clock },
  { key: 'safety', icon: ShieldCheck },
] as const;

export default function ReportPage() {
  const { t } = useTranslation();
  usePageTitle(t('nav.report'));

  return (
    <>
      <PageHero eyebrow={t('report.eyebrow')} before={t('report.titleBefore')} highlight={t('report.titleHighlight')} intro={t('report.intro')} />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-24 sm:px-6 lg:grid-cols-[1.6fr_1fr]">
        <ReportForm />
        <aside aria-label={t('report.tipsLabel')} className="flex flex-col gap-4">
          {TIPS.map(({ key, icon }) => (
            <div key={key} className="flex gap-4 rounded-card bg-surface p-6">
              <IconBadge icon={icon} size="sm" />
              <div>
                <h2 className="font-semibold">{t(`report.tips.${key}.title`)}</h2>
                <p className="mt-1 text-sm text-muted">{t(`report.tips.${key}.body`)}</p>
              </div>
            </div>
          ))}
          <p className="rounded-card bg-sage p-6 text-sm">{t('report.emergency')}</p>
        </aside>
      </section>
    </>
  );
}
