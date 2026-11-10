import { summarizeFirmsCsv } from '../src/features/data/hotspotSummary.js';

/** Indonesia bounding box: west,south,east,north */
const INDONESIA_BBOX = '94.5,-11.5,141.5,6.5';
const FIRMS_SOURCE = 'VIIRS_SNPP_NRT';
const DAY_RANGE = 1;
const CACHE_SECONDS = 1800;
const UPSTREAM_TIMEOUT_MS = 10_000;

function json(body: unknown, status: number, cache = false): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': cache
        ? `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS * 2}`
        : 'no-store',
    },
  });
}

export async function GET(): Promise<Response> {
  const key = process.env.FIRMS_MAP_KEY;
  if (!key) return json({ error: 'FIRMS_MAP_KEY is not configured' }, 503);

  const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${encodeURIComponent(key)}/${FIRMS_SOURCE}/${INDONESIA_BBOX}/${DAY_RANGE}`;
  try {
    const upstream = await fetch(url, { signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS) });
    const text = await upstream.text();
    if (!upstream.ok || !text.startsWith('latitude')) {
      console.error('[hotspots] FIRMS upstream error', upstream.status, text.slice(0, 120));
      return json({ error: 'Upstream FIRMS request failed' }, 502);
    }
    return json(
      { data: summarizeFirmsCsv(text), asOf: new Date().toISOString(), source: `NASA FIRMS ${FIRMS_SOURCE}` },
      200,
      true,
    );
  } catch (err) {
    console.error('[hotspots] FIRMS fetch threw', err);
    return json({ error: 'Upstream FIRMS request failed' }, 502);
  }
}
