import * as z from 'zod/mini';
import { fetchJson, withFallback } from './withFallback';
import { CITIES, cityCoords, multiCityParams } from './cities';
import rawCurrent from './fallback/airQuality.current.json';
import rawTrend from './fallback/airQuality.trend.json';
import type { AirQualitySnapshot, CityAirQuality, DataResult, DailyPoint } from './types';

export const AQ_SOURCE = 'Open-Meteo Air Quality (CAMS)';
export const AQ_BASE = 'https://air-quality-api.open-meteo.com/v1/air-quality';
export const AQ_CURRENT_FIELDS = 'us_aqi,pm2_5,pm10,nitrogen_dioxide,ozone,carbon_monoxide,sulphur_dioxide,uv_index';
export const TREND_DAYS = 7;

const num = z.nullable(z.number());

const currentSchema = z.object({
  current: z.object({
    time: z.string(),
    us_aqi: z.number(),
    pm2_5: z.number(),
    pm10: num,
    nitrogen_dioxide: num,
    ozone: num,
    carbon_monoxide: num,
    sulphur_dioxide: num,
    uv_index: num,
  }),
});
export const currentListSchema = z.array(currentSchema).check(z.minLength(1));

export const hourlySchema = z.object({
  hourly: z.object({ time: z.array(z.string()), us_aqi: z.array(num) }),
});

export function buildCurrentUrl(): string {
  const params = new URLSearchParams({ ...multiCityParams(), current: AQ_CURRENT_FIELDS, timezone: 'Asia/Jakarta' });
  return `${AQ_BASE}?${params}`;
}

export function buildTrendUrl(city: string): string {
  const { lat, lon } = cityCoords(city);
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    hourly: 'us_aqi',
    past_days: String(TREND_DAYS),
    forecast_days: '1',
    timezone: 'Asia/Jakarta',
  });
  return `${AQ_BASE}?${params}`;
}

/** Collapses hourly readings into one rounded mean per calendar day. */
export function toDailyMeans(time: string[], values: (number | null)[]): DailyPoint[] {
  const buckets = time.reduce<Record<string, number[]>>((acc, t, i) => {
    const v = values[i];
    if (v === null || v === undefined) return acc;
    const day = t.slice(0, 10);
    return { ...acc, [day]: [...(acc[day] ?? []), v] };
  }, {});
  return Object.entries(buckets)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, vs]) => ({ date, value: Math.round(vs.reduce((s, v) => s + v, 0) / vs.length) }));
}

export function mapCurrent(raw: unknown): CityAirQuality[] {
  return currentListSchema.parse(raw).map(({ current: c }, i) => ({
    city: CITIES[i]?.city ?? `#${i + 1}`,
    aqi: Math.round(c.us_aqi),
    pm25: c.pm2_5,
    pm10: c.pm10,
    no2: c.nitrogen_dioxide,
    o3: c.ozone,
    co: c.carbon_monoxide,
    so2: c.sulphur_dioxide,
    uv: c.uv_index,
  }));
}

export function mapTrend(raw: unknown): DailyPoint[] {
  const { hourly } = hourlySchema.parse(raw);
  return toDailyMeans(hourly.time, hourly.us_aqi);
}

const SNAPSHOT_AS_OF = (rawCurrent as { asOf: string }).asOf;

export const AIR_QUALITY_FALLBACK = {
  data: { cities: mapCurrent((rawCurrent as { data: unknown }).data) },
  asOf: SNAPSHOT_AS_OF,
  source: `${AQ_SOURCE} — snapshot`,
};

export async function loadAirQuality(): Promise<DataResult<AirQualitySnapshot>> {
  return withFallback(
    async () => ({ data: { cities: mapCurrent(await fetchJson(buildCurrentUrl())) }, asOf: new Date().toISOString(), source: AQ_SOURCE }),
    AIR_QUALITY_FALLBACK,
  );
}

/** Seven-day daily-mean AQI for one city. Fallback snapshot exists for Jakarta only. */
export async function loadCityTrend(city: string): Promise<DataResult<DailyPoint[]>> {
  const snapshot = (rawTrend as { asOf: string; city: string; data: unknown });
  return withFallback(
    async () => ({ data: mapTrend(await fetchJson(buildTrendUrl(city))), asOf: new Date().toISOString(), source: AQ_SOURCE }),
    {
      data: snapshot.city === city ? mapTrend(snapshot.data) : [],
      asOf: snapshot.asOf,
      source: `${AQ_SOURCE} — snapshot`,
    },
  );
}
