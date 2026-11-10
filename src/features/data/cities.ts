/** Provincial capitals spread across the main island groups. Order = display order. */
export const CITIES = [
  { city: 'Jakarta', lat: -6.21, lon: 106.85 },
  { city: 'Bandung', lat: -6.92, lon: 107.61 },
  { city: 'Semarang', lat: -6.97, lon: 110.42 },
  { city: 'Surabaya', lat: -7.25, lon: 112.75 },
  { city: 'Denpasar', lat: -8.65, lon: 115.22 },
  { city: 'Medan', lat: 3.59, lon: 98.67 },
  { city: 'Pekanbaru', lat: 0.51, lon: 101.45 },
  { city: 'Palembang', lat: -2.98, lon: 104.76 },
  { city: 'Pontianak', lat: -0.03, lon: 109.33 },
  { city: 'Palangka Raya', lat: -2.21, lon: 113.92 },
  { city: 'Samarinda', lat: -0.5, lon: 117.15 },
  { city: 'Makassar', lat: -5.15, lon: 119.43 },
  { city: 'Manado', lat: 1.47, lon: 124.84 },
  { city: 'Jayapura', lat: -2.53, lon: 140.72 },
] as const;

export type CityName = (typeof CITIES)[number]['city'];

export function cityCoords(name: string) {
  const c = CITIES.find((x) => x.city === name);
  if (!c) throw new Error(`Unknown city: ${name}`);
  return c;
}

export function multiCityParams(): Record<'latitude' | 'longitude', string> {
  return { latitude: CITIES.map((c) => c.lat).join(','), longitude: CITIES.map((c) => c.lon).join(',') };
}
