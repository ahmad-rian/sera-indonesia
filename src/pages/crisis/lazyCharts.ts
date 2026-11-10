import { lazy } from 'react';

/** recharts lives in its own chunk, loaded only when a chart scrolls into the Krisis page. */
export const AqiTrendChart = lazy(() => import('./charts').then((m) => ({ default: m.AqiTrendChart })));
export const ForecastChart = lazy(() => import('./charts').then((m) => ({ default: m.ForecastChart })));
export const Sparkline = lazy(() => import('./charts').then((m) => ({ default: m.Sparkline })));
