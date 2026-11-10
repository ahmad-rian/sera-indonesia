import type { DataResult, HotspotSummary } from '../types';

/**
 * No numbers are invented for hotspots: when the FIRMS proxy is unreachable
 * (e.g. local dev without FIRMS_MAP_KEY) the UI shows an "unavailable" state.
 */
export const HOTSPOT_FALLBACK: Omit<DataResult<HotspotSummary | null>, 'isFallback'> = {
  asOf: '2026-11-09T00:00:00Z',
  source: 'NASA FIRMS',
  data: null,
};
