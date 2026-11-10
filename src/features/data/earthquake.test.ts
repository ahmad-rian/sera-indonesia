import { loadEarthquakes, parseQuake, RECENT_QUAKE_LIMIT } from './earthquake';
import { mockFetchSequence } from '../../test/render';

afterEach(() => vi.unstubAllGlobals());

const raw = {
  DateTime: '2026-11-09T00:44:58+00:00',
  Coordinates: '1.06,127.47',
  Magnitude: '2.5',
  Kedalaman: '10 km',
  Wilayah: 'Laut Jailolo',
  Dirasakan: 'II Halmahera Barat',
};

describe('parseQuake', () => {
  it('converts BMKG strings into numbers', () => {
    expect(parseQuake(raw)).toEqual({
      datetime: raw.DateTime,
      magnitude: 2.5,
      depthKm: 10,
      region: 'Laut Jailolo',
      coordinates: [1.06, 127.47],
      felt: 'II Halmahera Barat',
      potential: undefined,
    });
  });

  it('rejects malformed numeric fields', () => {
    expect(() => parseQuake({ ...raw, Magnitude: 'n/a' })).toThrow('Malformed BMKG record');
  });
});

describe('loadEarthquakes', () => {
  it('returns latest + capped significant and felt lists', async () => {
    const list = Array.from({ length: 20 }, (_, i) => ({ ...raw, DateTime: `2026-11-0${(i % 9) + 1}T00:00:00Z`, Magnitude: '5.1' }));
    vi.stubGlobal(
      'fetch',
      mockFetchSequence([
        { body: { Infogempa: { gempa: raw } } },
        { body: { Infogempa: { gempa: list } } },
        { body: { Infogempa: { gempa: list.slice(0, 3) } } },
      ]),
    );
    const res = await loadEarthquakes();
    expect(res.isFallback).toBe(false);
    expect(res.data.latest.magnitude).toBe(2.5);
    expect(res.data.significant).toHaveLength(RECENT_QUAKE_LIMIT);
    expect(res.data.feltReports).toHaveLength(3);
    expect(res.asOf).toBe(raw.DateTime);
  });

  it('falls back on upstream error', async () => {
    vi.stubGlobal('fetch', mockFetchSequence([{ ok: false, status: 500, body: {} }, { body: {} }, { body: {} }]));
    const res = await loadEarthquakes();
    expect(res.isFallback).toBe(true);
    expect(res.data.latest).toBeDefined();
    expect(res.data.feltReports.length).toBeGreaterThan(0);
  });
});
