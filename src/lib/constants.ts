export const SITE_CONFIG = {
  name: 'SERA Indonesia',
  url: 'https://sera-indonesia.vercel.app',
  email: 'halo@sera.id',
  links: {
    instagram: 'https://instagram.com/sera_indonesia',
    x: 'https://x.com/sera_indonesia',
    github: 'https://github.com/ahmad-rian/sera-indonesia',
  },
} as const;

export const ROUTES = {
  home: '/',
  wasteBank: '/bank-sampah',
  crisis: '/krisis',
  action: '/aksi',
  report: '/lapor',
  about: '/tentang',
} as const;

/** Old routes kept alive as redirects so shared links do not break. */
export const LEGACY_REDIRECTS: Record<string, string> = {
  '/crisis': ROUTES.crisis,
  '/data': `${ROUTES.crisis}#data`,
  '/action': ROUTES.action,
  '/community': ROUTES.action,
  '/report': ROUTES.report,
  '/about': ROUTES.about,
};
