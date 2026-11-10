import { useTranslation } from 'react-i18next';
import { normalizeLocale } from '../../lib/utils';
import { cn } from '../../lib/utils';

const LANGS = ['id', 'en'] as const;

export function LangToggle() {
  const { i18n, t } = useTranslation();
  const active = normalizeLocale(i18n.language);
  return (
    <div role="group" aria-label={t('nav.language')} className="flex h-10 items-center rounded-full bg-surface p-1">
      {LANGS.map((lng) => (
        <button
          key={lng}
          type="button"
          aria-pressed={active === lng}
          onClick={() => void i18n.changeLanguage(lng)}
          className={cn(
            'h-8 rounded-full px-3 text-xs font-bold uppercase transition-colors',
            active === lng ? 'bg-ink text-bg' : 'text-muted hover:text-ink',
          )}
        >
          {lng}
        </button>
      ))}
    </div>
  );
}
