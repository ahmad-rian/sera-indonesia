/** WHO Air Quality Guidelines 2021, 24-hour levels (O3: 8-hour), in µg/m³. */
export const WHO_24H = {
  pm25: 15,
  pm10: 45,
  no2: 25,
  o3: 100,
  so2: 40,
  co: 4000,
} as const;

export type PollutantKey = keyof typeof WHO_24H;

export const POLLUTANTS: { key: PollutantKey; label: string }[] = [
  { key: 'pm25', label: 'PM2.5' },
  { key: 'pm10', label: 'PM10' },
  { key: 'no2', label: 'NO₂' },
  { key: 'o3', label: 'O₃' },
  { key: 'so2', label: 'SO₂' },
  { key: 'co', label: 'CO' },
];
