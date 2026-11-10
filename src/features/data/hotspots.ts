import * as z from 'zod/mini';
import { fetchJson, withFallback } from './withFallback';
import { HOTSPOT_FALLBACK } from './fallback/hotspots';
import type { DataResult, HotspotSummary } from './types';

export const HOTSPOT_ENDPOINT = '/api/hotspots';

const regionSchema = z.enum(['sumatra', 'kalimantan', 'java', 'sulawesi', 'nusa-tenggara', 'maluku', 'papua']);

const responseSchema = z.object({
  data: z.object({
    total: z.int().check(z.nonnegative()),
    highConfidence: z.int().check(z.nonnegative()),
    byRegion: z.array(z.object({ region: regionSchema, count: z.int().check(z.nonnegative()) })),
  }),
  asOf: z.string(),
  source: z.string(),
});

export async function loadHotspots(): Promise<DataResult<HotspotSummary | null>> {
  return withFallback(async () => responseSchema.parse(await fetchJson(HOTSPOT_ENDPOINT)), HOTSPOT_FALLBACK);
}
