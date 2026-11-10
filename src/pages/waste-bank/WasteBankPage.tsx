import { useTranslation } from 'react-i18next';
import { CalendarClock, ExternalLink, FileText, MapPin, Users } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { DemoBadge } from '../../components/ui/DemoBadge';
import { IconBadge } from '../../components/ui/IconBadge';
import { PageHero } from '../../components/ui/PageHero';
import { Reveal } from '../../components/ui/Reveal';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { WASTE_BANK_UNITS, WASTE_PRICES, type WasteGroup } from '../../data/wasteBank';
import { SITE_CONFIG } from '../../lib/constants';
import { useLocalized } from '../../lib/localized';
import { usePageTitle } from '../../lib/usePageTitle';
import { formatIdr, formatNumber } from '../../lib/utils';
import { WasteBankSteps } from './WasteBankSteps';
import { WasteBankStats } from './WasteBankStats';

const GROUP_ORDER: WasteGroup[] = ['plastic', 'paper', 'metal', 'glass', 'other'];
const SIPSN_URL = 'https://sipsn.menlhk.go.id/';
const REGULATION_URL = 'https://peraturan.bpk.go.id/Search?keywords=pengelolaan+sampah+pada+bank+sampah';

export default function WasteBankPage() {
  const { t } = useTranslation();
  usePageTitle(t('nav.wasteBank'));

  return (
    <>
      <PageHero eyebrow={t('wasteBank.eyebrow')} before={t('wasteBank.titleBefore')} highlight={t('wasteBank.titleHighlight')} intro={t('wasteBank.intro')} />

      <section aria-label={t('wasteBank.stats.label')} className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <WasteBankStats />
      </section>

      <section aria-labelledby="steps-title" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <SectionHeader id="steps-title" eyebrow={t('wasteBank.stepsEyebrow')} title={t('wasteBank.stepsTitle')} />
        <div className="mt-10">
          <WasteBankSteps />
        </div>
      </section>

      <PriceList />
      <Units />
      <StartYourOwn />
    </>
  );
}

function PriceList() {
  const { t, i18n } = useTranslation();
  const { t: pick } = useLocalized();
  return (
    <section id="harga" aria-labelledby="prices-title" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-24 sm:px-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <SectionHeader id="prices-title" eyebrow={t('wasteBank.prices.eyebrow')} title={t('wasteBank.prices.title')} intro={t('wasteBank.prices.intro')} />
        <DemoBadge className="self-start lg:self-end" />
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {GROUP_ORDER.map((group) => (
          <Reveal key={group} className="h-full">
            <div className="h-full rounded-panel bg-surface p-6">
              <h3 className="mb-4 inline-flex rounded-full bg-sage px-3 py-1 text-sm font-semibold text-forest">{t(`wasteBank.groups.${group}`)}</h3>
              <ul className="divide-y divide-line">
                {WASTE_PRICES.filter((w) => w.group === group).map((w) => (
                  <li key={w.name.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                    <span>{pick(w.name)}</span>
                    <span className="shrink-0 font-semibold tabular-nums">
                      {formatIdr(w.pricePerKg, i18n.language)}
                      <span className="font-normal text-muted">/kg</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Units() {
  const { t, i18n } = useTranslation();
  const { t: pick } = useLocalized();
  return (
    <section id="unit" aria-labelledby="units-title" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-24 sm:px-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <SectionHeader id="units-title" eyebrow={t('wasteBank.units.eyebrow')} title={t('wasteBank.units.title')} />
        <Button href={SIPSN_URL} variant="outline" arrow>
          {t('wasteBank.units.findMore')}
        </Button>
      </div>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {WASTE_BANK_UNITS.map((u) => (
          <li key={u.name} className="flex flex-col gap-4 rounded-panel bg-sage p-6">
            <h3 className="text-lg font-semibold">{u.name}</h3>
            <p className="flex items-center gap-2 text-sm">
              <MapPin aria-hidden className="size-4" /> {u.city}
            </p>
            <p className="flex items-center gap-2 text-sm">
              <CalendarClock aria-hidden className="size-4" /> {pick(u.schedule)}
            </p>
            <p className="mt-auto flex items-center gap-2 text-sm font-semibold">
              <Users aria-hidden className="size-4" />
              {t('wasteBank.units.members', { count: u.members, formatted: formatNumber(u.members, i18n.language) })}
            </p>
          </li>
        ))}
      </ul>
      <DemoBadge className="mt-6" />
    </section>
  );
}

function StartYourOwn() {
  const { t } = useTranslation();
  const steps = t('wasteBank.start.steps', { returnObjects: true }) as string[];
  return (
    <section aria-labelledby="start-title" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <div className="grid gap-10 rounded-hero bg-forest p-8 text-forest-ink sm:p-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-6">
          <IconBadge icon={FileText} tone="surface" />
          <h2 id="start-title" className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {t('wasteBank.start.title')}
          </h2>
          <p className="opacity-80">{t('wasteBank.start.body')}</p>
          <div className="flex flex-wrap gap-3">
            <Button href={`mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent('Bank Sampah SERA')}`} variant="sage" arrow>
              {t('wasteBank.start.cta')}
            </Button>
            <a
              href={REGULATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 self-center text-sm font-semibold underline-offset-4 hover:underline"
            >
              Permen LHK 14/2021 <ExternalLink aria-hidden className="size-3.5" />
            </a>
          </div>
        </div>
        <ol className="flex flex-col gap-3">
          {steps.map((s, i) => (
            <li key={s} className="flex gap-4 rounded-card bg-forest-ink/10 p-4">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sage text-sm font-bold text-ink">{i + 1}</span>
              <span className="self-center text-sm">{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
