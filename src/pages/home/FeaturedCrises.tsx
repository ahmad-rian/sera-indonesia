import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { CoverImage } from '../../components/ui/CoverImage';
import { Pill } from '../../components/ui/Pill';
import { Reveal } from '../../components/ui/Reveal';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { CRISES, type Crisis } from '../../data/crises';
import { ROUTES } from '../../lib/constants';
import { useLocalized } from '../../lib/localized';
import { cn } from '../../lib/utils';

export function FeaturedCrises() {
  const { t } = useTranslation();
  const [lead, ...rest] = CRISES;

  return (
    <section aria-labelledby="crises-title" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <SectionHeader id="crises-title" eyebrow={t('home.crises.eyebrow')} title={t('home.crises.title')} />

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <Reveal>
          <CrisisCard crisis={lead} large />
        </Reveal>
        <div className="grid gap-4">
          {rest.map((c, i) => (
            <Reveal key={c.slug} delay={0.08 * (i + 1)}>
              <CrisisCard crisis={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CrisisCard({ crisis, large }: { crisis: Crisis; large?: boolean }) {
  const { t } = useTranslation();
  const { t: pick } = useLocalized();
  const title = pick(crisis.title);
  const summary = pick(crisis.summary);
  return (
    <Link
      to={`${ROUTES.crisis}#${crisis.slug}`}
      className={cn(
        'group flex h-full overflow-hidden rounded-panel bg-surface transition-colors hover:bg-surface-2',
        large ? 'flex-col' : 'flex-row',
      )}
    >
      <CoverImage
        src={crisis.image}
        width={600}
        height={400}
        className={cn(large ? 'aspect-[16/10] w-full' : 'w-32 shrink-0 sm:w-44')}
      />
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <Pill tone={crisis.severity === 'critical' ? 'danger' : crisis.severity === 'high' ? 'warn' : 'sage'}>
            {t(`severity.${crisis.severity}`)}
          </Pill>
          <ArrowUpRight aria-hidden className="size-5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
        <h3 className={cn('font-semibold tracking-tight', large ? 'text-2xl' : 'text-lg')}>{title}</h3>
        <p className={cn('text-sm text-muted', !large && 'line-clamp-2')}>{summary}</p>
        <p className="mt-auto flex items-center gap-1.5 text-xs font-medium text-muted">
          <MapPin aria-hidden className="size-3.5" /> {crisis.location}
        </p>
      </div>
    </Link>
  );
}
