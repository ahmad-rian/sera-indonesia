import type { Localized } from '../lib/localized';

export interface DataSource {
  name: string;
  url: string;
  provides: Localized;
}

export const DATA_SOURCES: DataSource[] = [
  { name: 'BMKG', url: 'https://data.bmkg.go.id/', provides: { id: 'Gempa bumi terkini', en: 'Latest earthquakes' } },
  {
    name: 'Open-Meteo · CAMS',
    url: 'https://open-meteo.com/en/docs/air-quality-api',
    provides: { id: 'Kualitas udara per jam', en: 'Hourly air quality' },
  },
  {
    name: 'NASA FIRMS',
    url: 'https://firms.modaps.eosdis.nasa.gov/',
    provides: { id: 'Titik panas satelit', en: 'Satellite fire hotspots' },
  },
  {
    name: 'Global Forest Watch',
    url: 'https://www.globalforestwatch.org/',
    provides: { id: 'Tutupan & kehilangan hutan', en: 'Tree cover & loss' },
  },
  {
    name: 'SiPongi KLHK',
    url: 'https://sipongi.menlhk.go.id/',
    provides: { id: 'Karhutla nasional', en: 'National fire reports' },
  },
];
