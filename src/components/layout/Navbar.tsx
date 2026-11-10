import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { ROUTES } from '../../lib/constants';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { LangToggle } from '../ui/LangToggle';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { NAV_ITEMS } from './nav';

export function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
    <header className={cn('sticky top-0 z-50 transition-colors', open ? 'bg-bg' : 'bg-bg/80 backdrop-blur-md')}>
      <nav aria-label={t('nav.main')} className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <ul className="hidden items-center gap-2 lg:flex">
          {NAV_ITEMS.map(({ to, labelKey, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === ROUTES.home}
                className={({ isActive }) =>
                  cn(
                    'flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors',
                    isActive ? 'bg-sage text-forest' : 'bg-surface text-ink hover:bg-surface-2',
                  )
                }
              >
                <Icon aria-hidden className="size-4" strokeWidth={1.75} />
                {t(labelKey)}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            <LangToggle />
            <ThemeToggle />
          </div>
          <Button to={ROUTES.report} className="hidden sm:inline-flex">
            {t('nav.report')}
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t(open ? 'nav.close' : 'nav.open')}
            className="relative grid size-10 place-items-center rounded-full bg-ink text-bg lg:hidden"
          >
            <Menu aria-hidden className={cn('absolute size-5 transition-[opacity,rotate] duration-300', open ? 'rotate-90 opacity-0' : 'opacity-100')} />
            <X aria-hidden className={cn('absolute size-5 transition-[opacity,rotate] duration-300', open ? 'opacity-100' : '-rotate-90 opacity-0')} />
          </button>
        </div>
      </nav>

    </header>
    <MobileMenu open={open} />
    </>
  );
}
