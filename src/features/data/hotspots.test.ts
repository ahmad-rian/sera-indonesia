import { HOTSPOT_ENDPOINT, loadHotspots } from './hotspots';
import { regionOf, summarizeFirmsCsv } from './hotspotSummary';
import { mockFetchSequence } from '../../test/render';

afterEach(() => vi.unstubAllGlobals());

const CSV = [
  'latitude,longitude,bright_ti4,confidence,acq_date',
  '0.5,101.4,330,h,2026-11-09', // Sumatra (Riau)
  '-2.2,113.9,320,n,2026-11-09', // Kalimantan
  '-2.0,114.0,310,l,2026-11-09', // Kalimantan
  '-7.0,110.4,300,n,2026-11-09', // Java
  '20,20,300,h,2026-11-09', // outside any region
  'bad,row',
].join('\n');

describe('regionOf', () => {
  it('maps coordinates to island groups', () => {
    expect(regionOf(-2.2, 113.9)).toBe('kalimantan');
    expect(regionOf(-4, 138)).toBe('papua');
    expect(regionOf(-8.6, 116.3)).toBe('nusa-tenggara');
    expect(regionOf(48, 2)).toBeNull();
  });
});

describe('summarizeFirmsCsv', () => {
  it('counts detections, high confidence and regions sorted desc', () => {
    expect(summarizeFirmsCsv(CSV)).toEqual({
      total: 5,
      highConfidence: 2,
      byRegion: [
        { region: 'kalimantan', count: 2 },
        { region: 'sumatra', count: 1 },
        { region: 'java', count: 1 },
      ],
    });
  });

  it('treats numeric MODIS confidence >= 80 as high', () => {
    expect(summarizeFirmsCsv('latitude,longitude,confidence\n0.5,101.4,85\n0.5,101.4,40').highConfidence).toBe(1);
  });

  it('throws on unexpected header', () => {
    expect(() => summarizeFirmsCsv('foo,bar\n1,2')).toThrow('Unexpected FIRMS CSV header');
  });
});

describe('loadHotspots', () => {
  it('reads the proxy endpoint', async () => {
    const fetchMock = mockFetchSequence([
      { body: { data: { total: 3, highConfidence: 1, byRegion: [{ region: 'java', count: 3 }] }, asOf: 'now', source: 'FIRMS' } },
    ]);
    vi.stubGlobal('fetch', fetchMock);
    const res = await loadHotspots();
    expect(fetchMock).toHaveBeenCalledWith(HOTSPOT_ENDPOINT, expect.anything());
    expect(res).toMatchObject({ isFallback: false, data: { total: 3 } });
  });

  it('returns null data (no invented numbers) when the proxy fails', async () => {
    vi.stubGlobal('fetch', mockFetchSequence([{ ok: false, status: 503, body: {} }]));
    const res = await loadHotspots();
    expect(res).toMatchObject({ isFallback: true, data: null });
  });
});
