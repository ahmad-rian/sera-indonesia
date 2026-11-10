import type { Localized } from '../lib/localized';

export interface Observance {
  /** Recurring month (1-12) and day. */
  month: number;
  day: number;
  name: Localized;
}

export const OBSERVANCES: Observance[] = [
  { month: 2, day: 2, name: { id: 'Hari Lahan Basah Sedunia', en: 'World Wetlands Day' } },
  { month: 2, day: 21, name: { id: 'Hari Peduli Sampah Nasional', en: 'National Waste Awareness Day' } },
  { month: 3, day: 21, name: { id: 'Hari Hutan Internasional', en: 'International Day of Forests' } },
  { month: 3, day: 22, name: { id: 'Hari Air Sedunia', en: 'World Water Day' } },
  { month: 4, day: 22, name: { id: 'Hari Bumi', en: 'Earth Day' } },
  { month: 5, day: 22, name: { id: 'Hari Keanekaragaman Hayati', en: 'Biodiversity Day' } },
  { month: 6, day: 5, name: { id: 'Hari Lingkungan Hidup Sedunia', en: 'World Environment Day' } },
  { month: 6, day: 8, name: { id: 'Hari Laut Sedunia', en: 'World Oceans Day' } },
  { month: 7, day: 26, name: { id: 'Hari Mangrove Sedunia', en: 'International Mangrove Day' } },
  { month: 11, day: 5, name: { id: 'Hari Cinta Puspa & Satwa Nasional', en: 'National Flora & Fauna Day' } },
  { month: 11, day: 28, name: { id: 'Hari Menanam Pohon Indonesia', en: 'Indonesian Tree Planting Day' } },
  { month: 12, day: 11, name: { id: 'Hari Gunung Internasional', en: 'International Mountain Day' } },
];

export interface UpcomingObservance extends Observance {
  date: Date;
  daysAway: number;
}

const DAY_MS = 86_400_000;

/** Next occurrences from `today`, soonest first. Rolls over to next year when passed. */
export function upcomingObservances(today: Date, count = OBSERVANCES.length): UpcomingObservance[] {
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return OBSERVANCES.map((o) => {
    const thisYear = new Date(start.getFullYear(), o.month - 1, o.day);
    const date = thisYear < start ? new Date(start.getFullYear() + 1, o.month - 1, o.day) : thisYear;
    return { ...o, date, daysAway: Math.round((date.getTime() - start.getTime()) / DAY_MS) };
  })
    .sort((a, b) => a.daysAway - b.daysAway)
    .slice(0, count);
}
