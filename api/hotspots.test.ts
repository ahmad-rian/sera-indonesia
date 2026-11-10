import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GET } from './hotspots';

const CSV = 'latitude,longitude,confidence\n0.5,101.4,h\n-2.2,113.9,n';

function stubFetch(impl: () => Promise<Partial<Response>>) {
  const fn = vi.fn(impl);
  vi.stubGlobal('fetch', fn);
  return fn;
}

describe('GET /api/hotspots', () => {
  beforeEach(() => vi.spyOn(console, 'error').mockImplementation(() => {}));
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('returns 503 when the API key is missing', async () => {
    vi.stubEnv('FIRMS_MAP_KEY', '');
    const res = await GET();
    expect(res.status).toBe(503);
    expect(res.headers.get('cache-control')).toBe('no-store');
  });

  it('summarises the upstream CSV and sets CDN cache headers', async () => {
    vi.stubEnv('FIRMS_MAP_KEY', 'k3y');
    const fetchMock = stubFetch(async () => ({ ok: true, status: 200, text: async () => CSV }));
    const res = await GET();
    const body = (await res.json()) as { data: unknown };
    expect(res.status).toBe(200);
    expect(String(fetchMock.mock.calls[0])).toContain('/k3y/VIIRS_SNPP_NRT/');
    expect(body.data).toMatchObject({ total: 2, highConfidence: 1 });
    expect(res.headers.get('cache-control')).toContain('s-maxage=1800');
  });

  it('returns 502 without leaking upstream text on bad key', async () => {
    vi.stubEnv('FIRMS_MAP_KEY', 'bad');
    stubFetch(async () => ({ ok: true, status: 200, text: async () => 'Invalid MAP_KEY.' }));
    const res = await GET();
    expect(res.status).toBe(502);
    expect(await res.text()).not.toContain('MAP_KEY');
  });

  it('returns 502 when the upstream request throws', async () => {
    vi.stubEnv('FIRMS_MAP_KEY', 'k3y');
    stubFetch(async () => {
      throw new Error('timeout');
    });
    expect((await GET()).status).toBe(502);
  });
});
