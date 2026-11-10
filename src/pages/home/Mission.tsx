import { useTranslation } from 'react-i18next';
import { Button } from '../../components/ui/Button';
import { Reveal } from '../../components/ui/Reveal';
import { ROUTES } from '../../lib/constants';

export function Mission() {
  const { t } = useTranslation();
  return (
    <section aria-labelledby="mission-title" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
      <Reveal className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <p className="max-w-sm text-base text-muted">{t('home.mission.lead')}</p>
        <div>
          <h2 id="mission-title" className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {t('home.mission.title')}
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button to={ROUTES.about} variant="sage">
              {t('home.mission.about')}
            </Button>
            <Button to={ROUTES.action} variant="ghost" arrow>
              {t('home.mission.action')}
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
