import * as z from 'zod/mini';
import { fetchJson, withFallback } from './withFallback';
import { CITIES, multiCityParams } from './cities';
import rawWeather from './fallback/weather.json';
import type { CityWeather, DataResult } from './types';

export const WEATHER_SOURCE = 'Open-Meteo Forecast';
const BASE = 'https://api.open-meteo.com/v1/forecast';
export const FORECAST_DAYS = 7;

const num = z.nullable(z.number());
const weatherSchema = z.array(
  z.object({
    current: z.object({
      time: z.string(),
      temperature_2m: z.number(),
      apparent_temperature: num,
      relative_humidity_2m: num,
      precipitation: num,
      weather_code: num,
      wind_speed_10m: num,
    }),
    daily: z.object({
      time: z.array(z.string()),
      temperature_2m_max: z.array(num),
      temperature_2m_min: z.array(num),
      precipitation_sum: z.array(num),
      uv_index_max: z.array(num),
    }),
  }),
).check(z.minLength(1));

export function buildWeatherUrl(): string {
  const params = new URLSearchParams({
    ...multiCityParams(),
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m',
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,uv_index_max',
    forecast_days: String(FORECAST_DAYS),
    timezone: 'Asia/Jakarta',
  });
  return `${BASE}?${params}`;
}

export function mapWeather(raw: unknown): CityWeather[] {
  return weatherSchema.parse(raw).map(({ current: c, daily: d }, i) => ({
    city: CITIES[i]?.city ?? `#${i + 1}`,
    temp: c.temperature_2m,
    feelsLike: c.apparent_temperature,
    humidity: c.relative_humidity_2m,
    precipitation: c.precipitation,
    weatherCode: c.weather_code,
    wind: c.wind_speed_10m,
    daily: d.time.map((date, j) => ({
      date,
      max: d.temperature_2m_max[j],
      min: d.temperature_2m_min[j],
      rain: d.precipitation_sum[j],
      uv: d.uv_index_max[j],
    })),
  }));
}

export const WEATHER_FALLBACK = {
  data: mapWeather((rawWeather as { data: unknown }).data),
  asOf: (rawWeather as { asOf: string }).asOf,
  source: `${WEATHER_SOURCE} — snapshot`,
};

export async function loadWeather(): Promise<DataResult<CityWeather[]>> {
  return withFallback(
    async () => ({ data: mapWeather(await fetchJson(buildWeatherUrl())), asOf: new Date().toISOString(), source: WEATHER_SOURCE }),
    WEATHER_FALLBACK,
  );
}
