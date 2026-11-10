export interface DataResult<T> {
  data: T;
  /** True when live fetch failed and a static snapshot is shown instead. */
  isFallback: boolean;
  /** ISO timestamp the data describes. */
  asOf: string;
  source: string;
  error?: string;
}

export interface DailyPoint {
  date: string;
  value: number;
}

/** Pollutant concentrations in µg/m³ (CO included); null when the model has no value. */
export interface CityAirQuality {
  city: string;
  aqi: number;
  pm25: number;
  pm10: number | null;
  no2: number | null;
  o3: number | null;
  co: number | null;
  so2: number | null;
  uv: number | null;
}

export interface AirQualitySnapshot {
  cities: CityAirQuality[];
}

export interface CityWeather {
  city: string;
  temp: number;
  feelsLike: number | null;
  humidity: number | null;
  precipitation: number | null;
  weatherCode: number | null;
  wind: number | null;
  daily: { date: string; max: number | null; min: number | null; rain: number | null; uv: number | null }[];
}

export type IndicatorKey = 'forest' | 'pm25' | 'co2pc' | 'ghg' | 'renewable';

export interface Indicator {
  key: IndicatorKey;
  unit: string;
  goodWhen: 'up' | 'down';
  series: { year: number; value: number }[];
}

export interface Earthquake {
  datetime: string;
  magnitude: number;
  depthKm: number;
  region: string;
  coordinates: [number, number];
  felt?: string;
  potential?: string;
}

export type IslandRegion =
  | 'sumatra'
  | 'kalimantan'
  | 'java'
  | 'sulawesi'
  | 'nusa-tenggara'
  | 'maluku'
  | 'papua';

export interface HotspotSummary {
  total: number;
  highConfidence: number;
  byRegion: { region: IslandRegion; count: number }[];
}
