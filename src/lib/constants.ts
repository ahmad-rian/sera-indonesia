export const SITE_CONFIG = {
  name: 'SERA Indonesia',
  description: 'Platform digital untuk memantau, melaporkan, dan mengambil aksi nyata dalam menjaga kelestarian lingkungan Indonesia',
  url: 'https://sera.id',
  ogImage: '/assets/images/og-image.png',
  links: {
    twitter: 'https://twitter.com/sera_indonesia',
    instagram: 'https://instagram.com/sera_indonesia',
    github: 'https://github.com/sera-indonesia',
  },
};

export const NAVIGATION_ITEMS = [
  { name: 'Beranda', href: '/' },
  { name: 'Krisis', href: '/crisis', badge: true },
  { name: 'Data', href: '/data' },
  { name: 'Aksi', href: '/action' },
  { name: 'Komunitas', href: '/community' },
  { name: 'Tentang', href: '/about' },
] as const;

export const FOOTER_LINKS = {
  platform: [
    { name: 'Beranda', href: '/' },
    { name: 'Krisis Terkini', href: '/crisis' },
    { name: 'Data Lingkungan', href: '/data' },
    { name: 'Aksi Nyata', href: '/action' },
  ],
  community: [
    { name: 'Komunitas', href: '/community' },
    { name: 'Volunteer', href: '/volunteer' },
    { name: 'Edukasi', href: '/education' },
    { name: 'Kampanye', href: '/campaigns' },
  ],
  support: [
    { name: 'Tentang Kami', href: '/about' },
    { name: 'Kontak', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Bantuan', href: '/help' },
  ],
  legal: [
    { name: 'Kebijakan Privasi', href: '/privacy' },
    { name: 'Syarat & Ketentuan', href: '/terms' },
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
} as const;