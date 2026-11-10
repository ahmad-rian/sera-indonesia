import { useQuery } from '@tanstack/react-query';
import { loadAirQuality, loadCityTrend } from './airQuality';
import { loadEarthquakes } from './earthquake';
import { loadHotspots } from './hotspots';

const MINUTE_MS = 60_000;

export const useAirQuality = () =>
  useQuery({ queryKey: ['air-quality'], queryFn: loadAirQuality, staleTime: 15 * MINUTE_MS });

export const useCityTrend = (city: string) =>
  useQuery({ queryKey: ['air-trend', city], queryFn: () => loadCityTrend(city), staleTime: 30 * MINUTE_MS });

export const useEarthquakes = () =>
  useQuery({ queryKey: ['earthquakes'], queryFn: loadEarthquakes, staleTime: 5 * MINUTE_MS });

export const useHotspots = () =>
  useQuery({ queryKey: ['hotspots'], queryFn: loadHotspots, staleTime: 30 * MINUTE_MS });
