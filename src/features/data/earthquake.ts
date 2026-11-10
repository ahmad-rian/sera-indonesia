import * as z from 'zod/mini';
import { fetchJson, withFallback } from './withFallback';
import { EARTHQUAKE_FALLBACK } from './fallback/earthquake';
import type { DataResult, Earthquake } from './types';

export const BMKG_SOURCE = 'BMKG';
const BASE = 'https://data.bmkg.go.id/DataMKG/TEWS';
export const RECENT_QUAKE_LIMIT = 6;

const quakeSchema = z.object({
  DateTime: z.string(),
  Coordinates: z.string(),
  Magnitude: z.string(),
  Kedalaman: z.string(),
  Wilayah: z.string(),
  Potensi: z.optional(z.string()),
  Dirasakan: z.optional(z.string()),
});

const latestSchema = z.object({ Infogempa: z.object({ gempa: quakeSchema }) });
const recentSchema = z.object({ Infogempa: z.object({ gempa: z.array(quakeSchema) }) });

export function parseQuake(raw: z.infer<typeof quakeSchema>): Earthquake {
  const [lat, lon] = raw.Coordinates.split(',').map(Number);
  const magnitude = Number(raw.Magnitude);
  const depthKm = Number.parseInt(raw.Kedalaman, 10);
  if ([lat, lon, magnitude, depthKm].some(Number.isNaN)) {
    throw new Error(`Malformed BMKG record: ${raw.DateTime}`);
  }
  return {
    datetime: raw.DateTime,
    magnitude,
    depthKm,
    region: raw.Wilayah,
    coordinates: [lat, lon],
    felt: raw.Dirasakan,
    potential: raw.Potensi,
  };
}

export interface QuakeFeed {
  latest: Earthquake;
  /** Recent M5.0+ events. */
  significant: Earthquake[];
}

export async function loadEarthquakes(): Promise<DataResult<QuakeFeed>> {
  return withFallback(async () => {
    const [latestRaw, recentRaw] = await Promise.all([
      fetchJson(`${BASE}/autogempa.json`),
      fetchJson(`${BASE}/gempaterkini.json`),
    ]);
    const latest = parseQuake(latestSchema.parse(latestRaw).Infogempa.gempa);
    const significant = recentSchema
      .parse(recentRaw)
      .Infogempa.gempa.slice(0, RECENT_QUAKE_LIMIT)
      .map(parseQuake);
    return { data: { latest, significant }, asOf: latest.datetime, source: BMKG_SOURCE };
  }, EARTHQUAKE_FALLBACK);
}
