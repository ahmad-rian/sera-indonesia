import { useTranslation } from 'react-i18next';
import { PageHero } from '../../components/ui/PageHero';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { usePageTitle } from '../../lib/usePageTitle';
import { AirQualitySection } from './AirQualitySection';
import { CrisisList } from './CrisisList';
import { HotspotPanel } from './HotspotPanel';
import { IndicatorsSection } from './IndicatorsSection';
import { QuakePanel } from './QuakePanel';
import { SummaryStrip } from './SummaryStrip';
import { WeatherSection } from './WeatherSection';

export default function CrisisPage() {
  const { t } = useTranslation();
  usePageTitle(t('nav.crisis'));

  return (
    <>
      <PageHero eyebrow={t('crisis.eyebrow')} before={t('crisis.titleBefore')} highlight={t('crisis.titleHighlight')} intro={t('crisis.intro')} />

      <section id="data" aria-labelledby="data-title" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-24 sm:px-6">
        <SectionHeader id="data-title" eyebrow={t('crisis.data.eyebrow')} title={t('crisis.data.title')} intro={t('crisis.data.intro')} />
        <div className="mt-10 flex flex-col gap-4">
          <SummaryStrip />
          <AirQualitySection />
          <WeatherSection />
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            <QuakePanel />
            <HotspotPanel />
          </div>
        </div>
      </section>

      <IndicatorsSection />
      <CrisisList />
    </>
  );
}
