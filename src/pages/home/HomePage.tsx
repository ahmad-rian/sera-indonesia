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
      <Hero />
      <HeroBento />
      <div className="mt-14">
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
