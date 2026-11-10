import { useTranslation } from 'react-i18next';
import { Marquee } from '../../components/ui/Marquee';
import { usePageTitle } from '../../lib/usePageTitle';
import { Hero } from './Hero';
import { HeroBento } from './HeroBento';
import { Mission } from './Mission';
import { WasteBankHighlight } from './WasteBankHighlight';
import { FeaturedCrises } from './FeaturedCrises';
import { LiveDataStrip } from './LiveDataStrip';
import { CtaBanner } from './CtaBanner';

export default function HomePage() {
  const { t } = useTranslation();
  usePageTitle();
  const ticker = t('home.marquee', { returnObjects: true }) as string[];

  return (
    <>
      {/* Hero fills exactly one screen below the 5rem navbar; marquee sits on the fold */}
      <div className="flex min-h-[calc(100svh-5rem)] flex-col gap-10 lg:gap-[clamp(1.5rem,4svh,3rem)]">
        <Hero />
        <div className="flex flex-1 items-center">
          <HeroBento />
        </div>
        <Marquee items={ticker} />
      </div>
      <Mission />
      <WasteBankHighlight />
      <LiveDataStrip />
      <FeaturedCrises />
      <CtaBanner />
    </>
  );
}
