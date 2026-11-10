export type AqiLevel = 'good' | 'moderate' | 'sensitive' | 'unhealthy' | 'veryUnhealthy' | 'hazardous';

/** US EPA AQI breakpoints (upper bound inclusive). */
const AQI_BREAKPOINTS: [number, AqiLevel][] = [
  [50, 'good'],
  [100, 'moderate'],
  [150, 'sensitive'],
  [200, 'unhealthy'],
  [300, 'veryUnhealthy'],
];

export function aqiLevel(aqi: number): AqiLevel {
  return AQI_BREAKPOINTS.find(([max]) => aqi <= max)?.[1] ?? 'hazardous';
}

export const AQI_TONE: Record<AqiLevel, string> = {
  good: 'bg-sage text-forest',
  moderate: 'bg-yellow-100 text-yellow-900 dark:bg-yellow-500/15 dark:text-yellow-200',
  sensitive: 'bg-orange-100 text-orange-900 dark:bg-orange-500/15 dark:text-orange-200',
  unhealthy: 'bg-red-100 text-red-900 dark:bg-red-500/15 dark:text-red-200',
  veryUnhealthy: 'bg-purple-100 text-purple-900 dark:bg-purple-500/15 dark:text-purple-200',
  hazardous: 'bg-rose-200 text-rose-950 dark:bg-rose-500/25 dark:text-rose-100',
};
