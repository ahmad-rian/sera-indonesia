import { useQuery } from '@tanstack/react-query';
import { loadIndicators } from './indicators';
import { loadWeather } from './weather';

const MINUTE_MS = 60_000;
const DAY_MS = 24 * 60 * MINUTE_MS;

/** Krisis-page-only hooks, kept apart so their snapshots stay out of the home bundle. */
export const useWeather = () => useQuery({ queryKey: ['weather'], queryFn: loadWeather, staleTime: 30 * MINUTE_MS });

export const useIndicators = () => useQuery({ queryKey: ['indicators'], queryFn: loadIndicators, staleTime: DAY_MS });
