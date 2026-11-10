import type { HotspotSummary, IslandRegion } from './types';

/** Rough island-group bounding boxes [west, south, east, north]; checked in order. */
const REGION_BOXES: [IslandRegion, [number, number, number, number]][] = [
  ['java', [105, -9, 114.6, -5.8]],
  ['sumatra', [95, -6.2, 106.2, 6]],
  ['kalimantan', [108.5, -4.3, 119.3, 7.2]],
  ['sulawesi', [118.7, -6.5, 125.8, 2.2]],
  ['nusa-tenggara', [114.4, -11, 127.5, -7.8]],
  ['papua', [130.8, -9.2, 141.1, 0.5]],
  ['maluku', [124, -8, 135, 3]],
];

export function regionOf(lat: number, lon: number): IslandRegion | null {
  const hit = REGION_BOXES.find(([, [w, s, e, n]]) => lon >= w && lon <= e && lat >= s && lat <= n);
  return hit ? hit[0] : null;
}

/** Summarises a FIRMS VIIRS area CSV (header row + one detection per line). */
export function summarizeFirmsCsv(csv: string): HotspotSummary {
  const [header, ...rows] = csv.trim().split(/\r?\n/);
  const cols = header.split(',');
  const latIdx = cols.indexOf('latitude');
  const lonIdx = cols.indexOf('longitude');
  const confIdx = cols.indexOf('confidence');
  if (latIdx < 0 || lonIdx < 0) throw new Error('Unexpected FIRMS CSV header');

  const detections = rows
    .map((row) => row.split(','))
    .map((c) => ({ lat: Number(c[latIdx]), lon: Number(c[lonIdx]), conf: c[confIdx] ?? '' }))
    .filter((d) => Number.isFinite(d.lat) && Number.isFinite(d.lon));

  const counts = detections.reduce<Partial<Record<IslandRegion, number>>>((acc, d) => {
    const region = regionOf(d.lat, d.lon);
    return region ? { ...acc, [region]: (acc[region] ?? 0) + 1 } : acc;
  }, {});

  return {
    total: detections.length,
    highConfidence: detections.filter((d) => d.conf === 'h' || Number(d.conf) >= 80).length,
    byRegion: Object.entries(counts)
      .map(([region, count]) => ({ region: region as IslandRegion, count: count ?? 0 }))
      .sort((a, b) => b.count - a.count),
  };
}
