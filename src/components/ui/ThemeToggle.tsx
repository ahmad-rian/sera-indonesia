import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const Icon = theme === 'dark' ? Sun : Moon;
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t(theme === 'dark' ? 'nav.lightMode' : 'nav.darkMode')}
      className="grid size-10 place-items-center rounded-full bg-surface text-ink transition-colors hover:bg-sage"
    >
      <Icon aria-hidden className="size-4.5" strokeWidth={1.75} />
    </button>
  );
}
