import type { Localized } from '../lib/localized';

export type ActionIcon = 'report' | 'tree' | 'recycle' | 'wind' | 'users' | 'megaphone';

export interface WayToAct {
  icon: ActionIcon;
  title: Localized;
  body: Localized;
  href: string;
  external?: boolean;
}

export const WAYS_TO_ACT: WayToAct[] = [
  {
    icon: 'recycle',
    title: { id: 'Setor ke bank sampah', en: 'Use a waste bank' },
    body: {
      id: 'Pilah sampah di rumah, setor ke unit bank sampah, dan ubah sampah jadi tabungan.',
      en: 'Sort waste at home, drop it at a waste bank unit and turn it into savings.',
    },
    href: '/bank-sampah',
  },
  {
    icon: 'report',
    title: { id: 'Laporkan pelanggaran', en: 'Report a violation' },
    body: {
      id: 'Lihat pembuangan limbah, pembalakan, atau pembakaran lahan? Kirim laporan beserta lokasi dan foto.',
      en: 'Seen waste dumping, illegal logging or land burning? Send a report with location and photos.',
    },
    href: '/lapor',
  },
  {
    icon: 'wind',
    title: { id: 'Cek udara sebelum keluar', en: 'Check the air before going out' },
    body: {
      id: 'Gunakan dasbor kualitas udara kami. Saat AQI di atas 150, kurangi aktivitas luar dan pakai masker N95.',
      en: 'Use our air quality dashboard. When AQI is above 150, limit outdoor activity and wear an N95 mask.',
    },
    href: '/krisis#data',
  },
  {
    icon: 'tree',
    title: { id: 'Tanam & adopsi pohon', en: 'Plant and adopt trees' },
    body: {
      id: 'Ikut gerakan Hari Menanam Pohon Indonesia setiap 28 November bersama komunitas di kotamu.',
      en: 'Join Indonesian Tree Planting Day every 28 November with communities in your city.',
    },
    href: '#agenda',
  },
  {
    icon: 'megaphone',
    title: { id: 'Sebarkan data, bukan hoaks', en: 'Share data, not hoaxes' },
    body: {
      id: 'Bagikan angka dari sumber resmi. Setiap kartu data di SERA mencantumkan sumber dan waktu pembaruan.',
      en: 'Share figures from official sources. Every data card on SERA lists its source and update time.',
    },
    href: '/tentang#metodologi',
  },
  {
    icon: 'users',
    title: { id: 'Bergabung sebagai relawan', en: 'Join as a volunteer' },
    body: {
      id: 'Bantu verifikasi laporan, menerjemahkan konten, atau mengembangkan platform open-source ini.',
      en: 'Help verify reports, translate content or build this open-source platform.',
    },
    href: 'https://github.com/ahmad-rian/sera-indonesia',
    external: true,
  },
];
