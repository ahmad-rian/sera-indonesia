import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Recycle } from 'lucide-react';
import { BentoCard } from '../../components/ui/BentoCard';
import { Pill } from '../../components/ui/Pill';
import { ROUTES } from '../../lib/constants';
import { AirQualityTile, QuakeTile } from './LiveTiles';
import { ObservanceTile } from './ObservanceTile';

/**
 * Staggered bento row. On desktop the row height follows the viewport height so the
 * whole hero (headline + bento + marquee) fits one screen; card heights are fractions of it.
 */
export function HeroBento() {
  const { t } = useTranslation();
  return (
    <section aria-label={t('home.bento.label')} className="mx-auto w-full max-w-7xl px-4 sm:px-6">
      <div className="grid grid-cols-2 gap-4 lg:h-[clamp(17rem,42svh,27rem)] lg:grid-cols-[1fr_1.15fr_1.3fr_1.15fr_1fr] lg:items-center">
        {/* Decorative texture card */}
        <BentoCard tone="sage" className="hidden lg:grid lg:h-[58%] lg:place-items-center">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--c-surface)_0,transparent_55%)] opacity-60" />
          <img src="/icons/sera-mark.svg" alt="" width={72} height={72} className="relative size-18 drop-shadow-lg" />
        </BentoCard>

        <div className="col-span-2 grid grid-cols-2 gap-4 lg:col-span-1 lg:h-[88%] lg:grid-cols-1 lg:grid-rows-2">
          <AirQualityTile />
          <QuakeTile />
        </div>

        <Link
          to={ROUTES.report}
          className="group relative col-span-2 block aspect-[4/5] overflow-hidden rounded-hero sm:aspect-[16/10] lg:col-span-1 lg:aspect-auto lg:h-full"
        >
          <img
            src="/assets/images/raja_ampat.webp"
            alt={t('home.bento.imageAlt')}
            width={750}
            height={500}
            fetchPriority="high"
            className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-card bg-surface/95 px-5 py-4 text-base font-semibold backdrop-blur">
            {t('home.bento.share')}
            <ArrowUpRight aria-hidden className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </Link>

        <Link
          to={ROUTES.wasteBank}
          className="group relative block aspect-[4/5] overflow-hidden rounded-panel bg-sage-strong lg:aspect-auto lg:h-[80%]"
        >
          <div aria-hidden className="absolute inset-0 grid place-items-center">
            {[95, 70, 45].map((pct) => (
              <span key={pct} className="absolute aspect-square rounded-full border border-forest/20" style={{ width: `${pct}%` }} />
            ))}
            <Recycle className="relative size-14 text-forest transition-transform duration-700 group-hover:rotate-180" strokeWidth={1.5} />
          </div>
          <div className="absolute left-4 top-4 flex gap-1.5">
            <Pill tone="outline" className="border-ink/30 bg-transparent">
              {t('home.bento.tagWaste')}
            </Pill>
            <Pill tone="outline" className="hidden border-ink/30 bg-transparent xl:inline-flex">
              {t('home.bento.tagSave')}
            </Pill>
          </div>
          <span className="absolute inset-x-3 bottom-3 rounded-card bg-surface/95 px-4 py-3 text-sm font-semibold leading-snug sm:text-base">
            {t('home.bento.wasteBank')}
          </span>
        </Link>

        <ObservanceTile />
      </div>
    </section>
  );
}
