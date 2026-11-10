import type { Localized } from '../lib/localized';

export type Severity = 'critical' | 'high' | 'watch';

export interface Crisis {
  slug: string;
  title: Localized;
  location: string;
  severity: Severity;
  summary: Localized;
  /** Optional cover photo; cards render an illustrated placeholder when absent. */
  image?: string;
  /** ISO date this entry was last reviewed by the editors. */
  reviewedAt: string;
  sources: { label: string; url: string }[];
}

export const CRISES: Crisis[] = [
  {
    slug: 'jakarta-air',
    title: { id: 'Polusi udara Jabodetabek', en: 'Greater Jakarta air pollution' },
    location: 'DKI Jakarta',
    severity: 'critical',
    summary: {
      id: 'PM2.5 Jakarta rutin melampaui pedoman WHO. Emisi kendaraan, industri, dan PLTU di sekitar kota jadi kontributor utama. Pantau angka harian di dasbor kami.',
      en: 'Jakarta PM2.5 routinely exceeds WHO guidelines. Traffic, industry and nearby coal plants are major contributors. Track the daily numbers on our dashboard.',
    },
    image: '/assets/images/polusi_udara.webp',
    reviewedAt: '2026-11-09',
    sources: [
      { label: 'Open-Meteo / CAMS', url: 'https://open-meteo.com/en/docs/air-quality-api' },
      { label: 'WHO Air Quality Guidelines', url: 'https://www.who.int/publications/i/item/9789240034228' },
    ],
  },
  {
    slug: 'waste',
    title: { id: 'Darurat sampah & plastik', en: 'Waste and plastic emergency' },
    location: 'Nasional',
    severity: 'critical',
    summary: {
      id: 'Sebagian besar sampah rumah tangga masih berakhir di TPA terbuka, dibakar, atau bocor ke sungai dan laut. Pemilahan dari rumah dan bank sampah adalah cara paling cepat mengurangi beban TPA.',
      en: 'Most household waste still ends up in open landfills, burned, or leaking into rivers and the sea. Sorting at home and waste banks are the fastest way to cut landfill load.',
    },
    reviewedAt: '2026-11-10',
    sources: [
      { label: 'SIPSN KLHK', url: 'https://sipsn.menlhk.go.id/' },
      { label: 'Bank Sampah SERA', url: '/bank-sampah' },
    ],
  },
  {
    slug: 'forest-fires',
    title: { id: 'Kebakaran hutan & lahan', en: 'Forest and land fires' },
    location: 'Sumatra & Kalimantan',
    severity: 'high',
    summary: {
      id: 'Gambut yang dikeringkan mudah terbakar tiap musim kemarau dan memicu kabut asap lintas negara. Titik panas satelit diperbarui setiap hari.',
      en: 'Drained peatland burns easily every dry season and triggers cross-border haze. Satellite hotspots are refreshed daily.',
    },
    image: '/assets/images/kebakaran_riau.webp',
    reviewedAt: '2026-11-09',
    sources: [
      { label: 'NASA FIRMS', url: 'https://firms.modaps.eosdis.nasa.gov/' },
      { label: 'SiPongi KLHK', url: 'https://sipongi.menlhk.go.id/' },
    ],
  },
  {
    slug: 'deforestation',
    title: { id: 'Deforestasi Kalimantan', en: 'Deforestation in Kalimantan' },
    location: 'Kalimantan',
    severity: 'high',
    summary: {
      id: 'Hutan primer terus hilang akibat perkebunan, tambang, dan proyek skala besar. Data tutupan pohon tahunan tersedia terbuka di Global Forest Watch.',
      en: 'Primary forest keeps disappearing to plantations, mining and large-scale projects. Annual tree-cover data is openly available on Global Forest Watch.',
    },
    image: '/assets/images/deforasi_kalimantan.webp',
    reviewedAt: '2026-11-09',
    sources: [{ label: 'Global Forest Watch', url: 'https://www.globalforestwatch.org/dashboards/country/IDN/' }],
  },
  {
    slug: 'raja-ampat',
    title: { id: 'Tambang nikel di Raja Ampat', en: 'Nickel mining in Raja Ampat' },
    location: 'Papua Barat Daya',
    severity: 'watch',
    summary: {
      id: 'Pada Juni 2025 pemerintah mencabut sebagian izin tambang nikel di kawasan Raja Ampat setelah protes publik. Pemulihan dan pengawasan lanjutan tetap perlu dikawal.',
      en: 'In June 2025 the government revoked several nickel mining permits around Raja Ampat after public protest. Recovery and continued oversight still need watching.',
    },
    image: '/assets/images/raja_ampat.webp',
    reviewedAt: '2026-11-09',
    sources: [{ label: 'Greenpeace Indonesia', url: 'https://www.greenpeace.org/indonesia/' }],
  },
];
