export interface DataResult<T> {
  data: T;
  /** True when live fetch failed and a static snapshot is shown instead. */
  isFallback: boolean;
  /** ISO timestamp the data describes. */
  asOf: string;
  source: string;
  error?: string;
}

export interface CityAirQuality {
  city: string;
  aqi: number;
  pm25: number;
}

export interface AirQualitySnapshot {
  cities: CityAirQuality[];
  /** Daily mean AQI for Jakarta, oldest first. */
  trend: { date: string; aqi: number }[];
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
