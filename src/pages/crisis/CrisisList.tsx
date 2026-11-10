import { useTranslation } from 'react-i18next';
import { ExternalLink, MapPin } from 'lucide-react';
import { CoverImage } from '../../components/ui/CoverImage';
import { Pill } from '../../components/ui/Pill';
import { Reveal } from '../../components/ui/Reveal';
import { SectionHeader } from '../../components/ui/SectionHeader';
import { CRISES } from '../../data/crises';
import { useLocalized } from '../../lib/localized';
import { cn, formatDate } from '../../lib/utils';

const SEVERITY_TONE = { critical: 'danger', high: 'warn', watch: 'sage' } as const;

export function CrisisList() {
  const { t, i18n } = useTranslation();
  const { t: pick } = useLocalized();

  return (
    <section aria-labelledby="list-title" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <SectionHeader id="list-title" eyebrow={t('crisis.list.eyebrow')} title={t('crisis.list.title')} />
      <div className="mt-10 flex flex-col gap-4">
        {CRISES.map((c, i) => (
          <Reveal key={c.slug}>
            <article
              id={c.slug}
              className={cn(
                'grid scroll-mt-24 overflow-hidden rounded-panel bg-surface md:grid-cols-[1fr_1.4fr]',
                i % 2 === 1 && 'md:grid-cols-[1.4fr_1fr]',
              )}
            >
              <CoverImage
                src={c.image}
                className={cn('aspect-[16/10] size-full md:aspect-auto md:min-h-72', i % 2 === 1 && 'md:order-2')}
              />
              <div className="flex flex-col gap-4 p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <Pill tone={SEVERITY_TONE[c.severity]}>{t(`severity.${c.severity}`)}</Pill>
                  <Pill tone="outline">
                    <MapPin aria-hidden className="size-3" /> {c.location}
                  </Pill>
                </div>
                <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{pick(c.title)}</h3>
                <p className="text-muted">{pick(c.summary)}</p>
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 text-sm">
                  {c.sources.map((s) => (
                    <a
                      key={s.url}
                      href={s.url}
                      {...(s.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="inline-flex items-center gap-1 font-semibold text-forest underline-offset-4 hover:underline"
                    >
                      {s.label} <ExternalLink aria-hidden className="size-3.5" />
                    </a>
                  ))}
                  <span className="text-xs text-muted">
                    {t('crisis.list.reviewed', { date: formatDate(c.reviewedAt, i18n.language) })}
                  </span>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
