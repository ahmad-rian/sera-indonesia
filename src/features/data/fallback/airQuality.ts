import type { AirQualitySnapshot, DataResult } from '../types';

/** Snapshot taken from Open-Meteo on 2026-11-09 14:00 WIB. Refresh when editing. */
export const AIR_QUALITY_FALLBACK: Omit<DataResult<AirQualitySnapshot>, 'isFallback'> = {
  asOf: '2026-11-09T07:00:00Z',
  source: 'Open-Meteo Air Quality (CAMS) — snapshot',
  data: {
    cities: [
      { city: 'Jakarta', aqi: 178, pm25: 53 },
      { city: 'Surabaya', aqi: 116, pm25: 32.9 },
      { city: 'Medan', aqi: 73, pm25: 11.3 },
      { city: 'Pekanbaru', aqi: 54, pm25: 5.5 },
      { city: 'Palangka Raya', aqi: 153, pm25: 57.2 },
      { city: 'Makassar', aqi: 93, pm25: 15.9 },
    ],
    trend: [
      { date: '2026-11-03', aqi: 182 },
      { date: '2026-11-04', aqi: 177 },
      { date: '2026-11-05', aqi: 170 },
      { date: '2026-11-06', aqi: 172 },
      { date: '2026-11-07', aqi: 174 },
      { date: '2026-11-08', aqi: 184 },
      { date: '2026-11-09', aqi: 181 },
    ],
  },
};
