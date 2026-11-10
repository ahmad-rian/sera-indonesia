import { useTranslation } from 'react-i18next';
import { ArrowDownLeft, Leaf, Lightbulb, Satellite } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { HighlightWord } from '../../components/ui/HighlightWord';
import { IconBadge } from '../../components/ui/IconBadge';
import { ROUTES } from '../../lib/constants';

export function Hero() {
  const { t } = useTranslation();
  return (
    <section aria-labelledby="hero-title" className="relative mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:pt-16">
      {/* Decorative orbit chips, desktop only */}
      <div aria-hidden className="pointer-events-none absolute inset-x-6 top-10 hidden lg:block">
        <IconBadge icon={Leaf} className="absolute left-0 top-0" />
        <IconBadge icon={Satellite} tone="forest" size="lg" className="absolute left-16 top-16" />
        <IconBadge icon={Lightbulb} className="absolute right-0 top-0" />
        <IconBadge icon={ArrowDownLeft} tone="outline" size="lg" className="absolute right-20 top-16" />
      </div>

      <h1
        id="hero-title"
        className="relative mx-auto max-w-4xl text-center text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl"
      >
        {t('home.hero.before')} <HighlightWord>{t('home.hero.highlight')}</HighlightWord> {t('home.hero.after')}
      </h1>

      <div className="mt-8 flex flex-col items-center gap-6 lg:mt-4 lg:flex-row lg:items-end lg:justify-between">
        <p className="max-w-xs text-center text-sm font-medium text-muted lg:text-left">{t('home.hero.intro')}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button to={ROUTES.crisis} variant="sage" arrow>
            {t('home.hero.ctaPrimary')}
          </Button>
          <Button to={ROUTES.report} variant="outline">
            {t('home.hero.ctaSecondary')}
          </Button>
        </div>
      </div>
    </section>
  );
}
