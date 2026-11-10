import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/Button';
import { HighlightWord } from '../components/ui/HighlightWord';
import { ROUTES } from '../lib/constants';
import { usePageTitle } from '../lib/usePageTitle';

export default function NotFound() {
  const { t } = useTranslation();
  usePageTitle('404');
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-32 text-center">
      <p className="text-8xl font-semibold tracking-tighter sm:text-9xl">
        4<HighlightWord>0</HighlightWord>4
      </p>
      <h1 className="mt-8 text-2xl font-semibold sm:text-3xl">{t('notFound.title')}</h1>
      <p className="mt-3 text-muted">{t('notFound.body')}</p>
      <Button to={ROUTES.home} className="mt-8" arrow>
        {t('notFound.cta')}
      </Button>
    </section>
  );
}
