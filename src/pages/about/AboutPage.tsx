import { useTranslation } from 'react-i18next';
import { Database, ExternalLink, Eye, HandHeart, Github } from 'lucide-react';
import { BentoCard } from '../../components/ui/BentoCard';
import { Button } from '../../components/ui/Button';
import { IconBadge } from '../../components/ui/IconBadge';
import { PageHero } from '../../components/ui/PageHero';
import { Reveal } from '../../components/ui/Reveal';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { DATA_SOURCES } from '../../data/sources';
import { SITE_CONFIG } from '../../lib/constants';
import { useLocalized } from '../../lib/localized';
import { usePageTitle } from '../../lib/usePageTitle';

const PILLARS = [
  { key: 'monitor', icon: Eye, tone: 'surface' },
  { key: 'open', icon: Database, tone: 'sage' },
  { key: 'act', icon: HandHeart, tone: 'forest' },
] as const;

const METHOD_STEPS = ['fetch', 'validate', 'fallback', 'review'] as const;

export default function AboutPage() {
  const { t } = useTranslation();
  const { t: pick } = useLocalized();
  usePageTitle(t('nav.about'));

  return (
    <>
      <PageHero eyebrow={t('about.eyebrow')} before={t('about.titleBefore')} highlight={t('about.titleHighlight')} after={t('about.titleAfter')} intro={t('about.intro')} />

      <section aria-label={t('about.pillarsLabel')} className="mx-auto grid max-w-7xl gap-4 px-4 pb-24 sm:px-6 md:grid-cols-3">
        {PILLARS.map(({ key, icon, tone }, i) => (
          <Reveal key={key} delay={0.06 * i}>
            <BentoCard tone={tone} className="flex h-full min-h-64 flex-col justify-between gap-10 p-7">
              <IconBadge icon={icon} tone={tone === 'surface' ? 'sage' : 'surface'} />
              <div>
                <h2 className="text-2xl font-semibold">{t(`about.pillars.${key}.title`)}</h2>
                <p className="mt-2 text-sm opacity-80">{t(`about.pillars.${key}.body`)}</p>
              </div>
            </BentoCard>
          </Reveal>
        ))}
      </section>

      <section id="metodologi" aria-labelledby="method-title" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-24 sm:px-6">
        <SectionHeader id="method-title" eyebrow={t('about.method.eyebrow')} title={t('about.method.title')} />
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {METHOD_STEPS.map((step, i) => (
            <li key={step} className="rounded-card border border-line p-6">
              <span className="text-sm font-bold text-forest">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold">{t(`about.method.${step}.title`)}</h3>
              <p className="mt-2 text-sm text-muted">{t(`about.method.${step}.body`)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="sources-title" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <SectionHeader id="sources-title" eyebrow={t('about.sources.eyebrow')} title={t('about.sources.title')} />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DATA_SOURCES.map((s) => (
            <li key={s.name}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 rounded-card bg-surface p-5 transition-colors hover:bg-sage"
              >
                <span>
                  <span className="block font-semibold">{s.name}</span>
                  <span className="text-sm text-muted">{pick(s.provides)}</span>
                </span>
                <ExternalLink aria-hidden className="size-4 shrink-0 text-muted" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="flex flex-col gap-8 rounded-hero bg-surface p-8 sm:p-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t('about.contact.title')}</h2>
            <p className="mt-3 text-muted">{t('about.contact.body')}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={`mailto:${SITE_CONFIG.email}`} arrow>
              {SITE_CONFIG.email}
            </Button>
            <Button href={SITE_CONFIG.links.github} variant="outline">
              <Github aria-hidden className="size-4" /> GitHub
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
