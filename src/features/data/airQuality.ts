import * as z from 'zod/mini';
import { fetchJson, withFallback } from './withFallback';
import { AIR_QUALITY_FALLBACK } from './fallback/airQuality';
import type { AirQualitySnapshot, DataResult } from './types';

export const AQ_SOURCE = 'Open-Meteo Air Quality (CAMS)';

export const AQ_CITIES = [
  { city: 'Jakarta', lat: -6.21, lon: 106.85 },
  { city: 'Surabaya', lat: -7.25, lon: 112.75 },
  { city: 'Medan', lat: 3.59, lon: 98.67 },
  { city: 'Pekanbaru', lat: 0.51, lon: 101.45 },
  { city: 'Palangka Raya', lat: -2.21, lon: 113.92 },
  { city: 'Makassar', lat: -5.15, lon: 119.43 },
] as const;

const TREND_DAYS = 7;
const BASE = 'https://air-quality-api.open-meteo.com/v1/air-quality';

const currentSchema = z.object({
  current: z.object({ time: z.string(), us_aqi: z.number(), pm2_5: z.number() }),
});
const currentListSchema = z.array(currentSchema).check(z.minLength(1));

const hourlySchema = z.object({
  hourly: z.object({ time: z.array(z.string()), us_aqi: z.array(z.nullable(z.number())) }),
});

export function buildCurrentUrl(): string {
  const params = new URLSearchParams({
    latitude: AQ_CITIES.map((c) => c.lat).join(','),
    longitude: AQ_CITIES.map((c) => c.lon).join(','),
    current: 'us_aqi,pm2_5',
    timezone: 'Asia/Jakarta',
  });
  return `${BASE}?${params}`;
}

export function buildTrendUrl(): string {
  const { lat, lon } = AQ_CITIES[0];
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    hourly: 'us_aqi',
    past_days: String(TREND_DAYS),
    forecast_days: '1',
    timezone: 'Asia/Jakarta',
  });
  return `${BASE}?${params}`;
}

/** Collapses hourly readings into one rounded mean per calendar day. */
export function toDailyMeans(time: string[], values: (number | null)[]): { date: string; aqi: number }[] {
  const buckets = time.reduce<Record<string, number[]>>((acc, t, i) => {
    const v = values[i];
    if (v === null || v === undefined) return acc;
    const day = t.slice(0, 10);
    return { ...acc, [day]: [...(acc[day] ?? []), v] };
  }, {});
  return Object.entries(buckets)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, vs]) => ({ date, aqi: Math.round(vs.reduce((s, v) => s + v, 0) / vs.length) }));
}

export async function loadAirQuality(): Promise<DataResult<AirQualitySnapshot>> {
  return withFallback(async () => {
    const [currentRaw, trendRaw] = await Promise.all([fetchJson(buildCurrentUrl()), fetchJson(buildTrendUrl())]);
    const current = currentListSchema.parse(currentRaw);
    const hourly = hourlySchema.parse(trendRaw).hourly;
    const cities = current.map((entry, i) => ({
      city: AQ_CITIES[i]?.city ?? `#${i + 1}`,
      aqi: Math.round(entry.current.us_aqi),
      pm25: entry.current.pm2_5,
    }));
    return {
      data: { cities, trend: toDailyMeans(hourly.time, hourly.us_aqi) },
      asOf: new Date().toISOString(),
      source: AQ_SOURCE,
    };
  }, AIR_QUALITY_FALLBACK);
}
