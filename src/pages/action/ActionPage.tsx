import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Megaphone, PencilLine, Recycle, TreePine, Users, Wind, type LucideIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { IconBadge } from '../../components/ui/IconBadge';
import { PageHero } from '../../components/ui/PageHero';
import { Reveal } from '../../components/ui/Reveal';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { WAYS_TO_ACT, type ActionIcon, type WayToAct } from '../../data/actions';
import { upcomingObservances } from '../../data/observances';
import { SITE_CONFIG } from '../../lib/constants';
import { useLocalized } from '../../lib/localized';
import { usePageTitle } from '../../lib/usePageTitle';
import { cn, formatDate } from '../../lib/utils';

const ICONS: Record<ActionIcon, LucideIcon> = {
  report: PencilLine,
  tree: TreePine,
  recycle: Recycle,
  wind: Wind,
  users: Users,
  megaphone: Megaphone,
};

const UPCOMING_COUNT = 6;

export default function ActionPage() {
  const { t } = useTranslation();
  usePageTitle(t('nav.action'));

  return (
    <>
      <PageHero eyebrow={t('action.eyebrow')} before={t('action.titleBefore')} highlight={t('action.titleHighlight')} intro={t('action.intro')} />

      <section aria-label={t('action.waysLabel')} className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WAYS_TO_ACT.map((w, i) => (
            <Reveal key={w.title.id} delay={0.05 * i} className={cn(i === 0 && 'sm:col-span-2 lg:col-span-1 lg:row-span-2')}>
              <ActionCard way={w} featured={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>

      <Agenda />

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid gap-8 rounded-hero bg-sage p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <IconBadge icon={Users} tone="surface" className="mb-6" />
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{t('action.community.title')}</h2>
            <p className="mt-4 max-w-xl text-ink/75">{t('action.community.body')}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button href={SITE_CONFIG.links.instagram} arrow>
              Instagram
            </Button>
            <Button href={SITE_CONFIG.links.github} variant="outline" arrow>
              GitHub
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function ActionCard({ way, featured }: { way: WayToAct; featured: boolean }) {
  const { t } = useLocalized();
  const className = cn(
    'group flex h-full flex-col gap-6 rounded-panel p-7 transition-colors',
    featured ? 'bg-forest text-forest-ink min-h-72' : 'bg-surface hover:bg-surface-2',
  );
  const content = (
    <>
      <div className="flex items-start justify-between">
        <IconBadge icon={ICONS[way.icon]} tone={featured ? 'surface' : 'sage'} />
        <ArrowUpRight aria-hidden className="size-5 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <div className="mt-auto">
        <h3 className={cn('font-semibold tracking-tight', featured ? 'text-3xl' : 'text-xl')}>{t(way.title)}</h3>
        <p className={cn('mt-2 text-sm', featured ? 'opacity-80' : 'text-muted')}>{t(way.body)}</p>
      </div>
    </>
  );
  return way.external ? (
    <a href={way.href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <Link to={way.href} className={className}>
      {content}
    </Link>
  );
}

function Agenda() {
  const { t, i18n } = useTranslation();
  const { t: pick } = useLocalized();
  const upcoming = useMemo(() => upcomingObservances(new Date(), UPCOMING_COUNT), []);

  return (
    <section id="agenda" aria-labelledby="agenda-title" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-24 sm:px-6">
      <SectionHeader id="agenda-title" eyebrow={t('action.agenda.eyebrow')} title={t('action.agenda.title')} intro={t('action.agenda.intro')} />
      <ol className="mt-10 divide-y divide-line overflow-hidden rounded-panel bg-surface">
        {upcoming.map((o) => (
          <li key={`${o.month}-${o.day}`} className="flex items-center gap-5 px-6 py-5 sm:px-8">
            <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-sage text-center leading-none text-forest">
              <span>
                <span className="block text-2xl font-bold">{o.day}</span>
                <span className="text-[11px] font-semibold uppercase">
                  {new Intl.DateTimeFormat(i18n.language, { month: 'short' }).format(o.date)}
                </span>
              </span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold sm:text-lg">{pick(o.name)}</span>
              <span className="text-sm text-muted">{formatDate(o.date.toISOString(), i18n.language)}</span>
            </span>
            <span className="hidden shrink-0 rounded-full border border-line px-3 py-1 text-xs font-semibold sm:inline">
              {o.daysAway === 0 ? t('home.bento.today') : t('home.bento.daysAway', { count: o.daysAway })}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
