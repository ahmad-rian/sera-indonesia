import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSun, Sun, type LucideIcon } from 'lucide-react';

export type WeatherKind = 'clear' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'storm';

/** Groups WMO weather codes into a handful of display kinds. */
export function weatherKind(code: number | null): WeatherKind {
  if (code === null || code <= 1) return 'clear';
  if (code <= 3) return 'cloudy';
  if (code <= 48) return 'fog';
  if (code <= 57) return 'drizzle';
  if (code >= 95) return 'storm';
  return 'rain';
}

export const WEATHER_ICON: Record<WeatherKind, LucideIcon> = {
  clear: Sun,
  cloudy: CloudSun,
  fog: CloudFog,
  drizzle: CloudDrizzle,
  rain: CloudRain,
  storm: CloudLightning,
};

export const FallbackWeatherIcon = Cloud;
