import { fetchJson, withFallback } from './withFallback';
import { mockFetchSequence } from '../../test/render';

const fallback = { data: 1, asOf: '2026-01-01', source: 'snap' };

describe('withFallback', () => {
  it('returns live data flagged as not fallback', async () => {
    const res = await withFallback(async () => ({ data: 2, asOf: 'now', source: 'live' }), fallback);
    expect(res).toEqual({ data: 2, asOf: 'now', source: 'live', isFallback: false });
  });

  it('returns snapshot and keeps the error message when the loader throws', async () => {
    const res = await withFallback(async () => {
      throw new Error('boom');
    }, fallback);
    expect(res).toMatchObject({ data: 1, isFallback: true, error: 'boom' });
  });

  it('stringifies non-Error rejections', async () => {
    const res = await withFallback(() => Promise.reject('nope'), fallback);
    expect(res.error).toBe('nope');
  });
});

describe('fetchJson', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('throws on non-2xx responses', async () => {
    vi.stubGlobal('fetch', mockFetchSequence([{ ok: false, status: 503, body: {} }]));
    await expect(fetchJson('https://x.test')).rejects.toThrow('HTTP 503');
  });

  it('parses JSON on success', async () => {
    vi.stubGlobal('fetch', mockFetchSequence([{ body: { a: 1 } }]));
    await expect(fetchJson('https://x.test')).resolves.toEqual({ a: 1 });
  });
});
