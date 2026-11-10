import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight } from 'lucide-react';
import { ROUTES, SITE_CONFIG } from '../../lib/constants';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { LangToggle } from '../ui/LangToggle';
import { ThemeToggle } from '../ui/ThemeToggle';
import { NAV_ITEMS } from './nav';

/**
 * Full-height overlay sheet under the sticky header. It floats over the page instead of
 * pushing content down, and locks background scroll while open.
 */
export function MobileMenu({ open }: { open: boolean }) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div
      id="mobile-menu"
      aria-hidden={!open}
      inert={!open}
      className={cn(
        'fixed inset-x-0 bottom-0 top-20 z-40 flex flex-col overflow-y-auto bg-bg px-4 pb-8 pt-2 lg:hidden',
        'transition-[opacity,translate] duration-300 ease-(--ease-out-expo)',
        open ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0',
      )}
    >
      <ul className="flex flex-col">
        {NAV_ITEMS.map(({ to, labelKey, icon: Icon }, i) => (
          <li
            key={to}
            className="border-b border-line transition-[opacity,translate] duration-500 ease-(--ease-out-expo)"
            style={{ transitionDelay: open ? `${60 + i * 40}ms` : '0ms', opacity: open ? 1 : 0, translate: open ? '0 0' : '0 12px' }}
          >
            <NavLink
              to={to}
              end={to === ROUTES.home}
              className={({ isActive }) =>
                cn('group flex items-center gap-4 py-5 text-2xl font-semibold tracking-tight', isActive ? 'text-forest' : 'text-ink')
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    aria-hidden
                    className={cn(
                      'grid size-11 shrink-0 place-items-center rounded-full transition-colors',
                      isActive ? 'bg-forest text-forest-ink' : 'bg-sage text-forest',
                    )}
                  >
                    <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="flex-1">{t(labelKey)}</span>
                  <span aria-hidden className="text-xs font-semibold text-muted tabular-nums">0{i + 1}</span>
                  <ArrowUpRight aria-hidden className="size-5 text-muted transition-transform group-active:translate-x-0.5" />
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-4 pt-8">
        <Button to={ROUTES.report} size="lg" className="w-full" arrow>
          {t('nav.report')}
        </Button>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
          </div>
          <a href={`mailto:${SITE_CONFIG.email}`} className="text-sm font-medium text-muted">
            {SITE_CONFIG.email}
          </a>
        </div>
      </div>
    </div>
  );
}
