import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DATA_SOURCES } from '../../data/sources';
import { ROUTES, SITE_CONFIG } from '../../lib/constants';
import { Logo } from './Logo';
import { NAV_ITEMS } from './nav';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
      <div className="grid gap-10 rounded-hero bg-surface p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted">{t('footer.tagline')}</p>
          <a href={`mailto:${SITE_CONFIG.email}`} className="text-sm font-semibold underline-offset-4 hover:underline">
            {SITE_CONFIG.email}
          </a>
        </div>

        <FooterColumn title={t('footer.explore')}>
          {[...NAV_ITEMS.map((n) => ({ to: n.to, label: t(n.labelKey) })), { to: ROUTES.report, label: t('nav.report') }].map(
            (l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ),
          )}
        </FooterColumn>

        <FooterColumn title={t('footer.sources')}>
          {DATA_SOURCES.map((s) => (
            <li key={s.name}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                {s.name}
              </a>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title={t('footer.follow')}>
          {Object.entries(SITE_CONFIG.links).map(([name, url]) => (
            <li key={name}>
              <a href={url} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-ink">
                {name === 'x' ? 'X / Twitter' : name}
              </a>
            </li>
          ))}
        </FooterColumn>
      </div>

      <p className="mt-6 flex flex-col justify-between gap-2 px-2 text-xs text-muted sm:flex-row">
        <span>
          © {year} SERA Indonesia · {t('footer.rights')}
        </span>
        <span>{t('footer.disclaimer')}</span>
      </p>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted">{title}</h2>
      <ul className="flex flex-col gap-2.5 text-sm text-muted">{children}</ul>
    </div>
  );
}
