import { validateReport } from './schema';
import { buildMailto, submitReport } from './submitReport';
import { mockFetchSequence } from '../../test/render';

afterEach(() => vi.unstubAllGlobals());

const valid = {
  title: 'Limbah dibuang ke sungai',
  category: 'water',
  location: 'Bekasi, Jawa Barat',
  date: '2026-11-01',
  description: 'Air sungai berubah hitam dan berbau sejak tiga hari terakhir.',
  email: '',
  website: '',
};

describe('validateReport', () => {
  it('accepts a complete report', () => {
    const res = validateReport(valid);
    expect(res.ok).toBe(true);
  });

  it('returns the first i18n error key per field', () => {
    const res = validateReport({ ...valid, title: 'short', category: 'nope', description: 'tiny', email: 'x@' });
    expect(res.ok).toBe(false);
    if (res.ok) return;
    expect(res.errors).toMatchObject({
      title: 'report.errors.titleShort',
      category: 'report.errors.category',
      description: 'report.errors.descriptionShort',
      email: 'report.errors.email',
    });
  });

  it('rejects future dates', () => {
    const res = validateReport({ ...valid, date: '2999-01-01' });
    expect(res.ok ? null : res.errors.date).toBe('report.errors.dateFuture');
  });
});

describe('submitReport', () => {
  const report = { ...valid, category: 'water' as const };

  it('falls back to a prefilled mailto when no endpoint is configured', async () => {
    const res = await submitReport(report, '');
    expect(res.channel).toBe('mailto');
    if (res.channel !== 'mailto') return;
    expect(res.href).toContain('subject=%5BLaporan%20SERA%5D');
    expect(decodeURIComponent(res.href)).toContain('Lokasi / Location: Bekasi');
  });

  it('omits empty optional lines in the mail body', () => {
    const body = decodeURIComponent(buildMailto({ ...report, date: '', email: '' }, 'a@b.c'));
    expect(body).not.toContain('Tanggal');
    expect(body).not.toContain('Kontak');
    expect(body.startsWith('mailto:a@b.c')).toBe(true);
  });

  it('POSTs JSON without the honeypot to the endpoint', async () => {
    const fetchMock = mockFetchSequence([{ body: { ok: true } }]);
    vi.stubGlobal('fetch', fetchMock);
    await expect(submitReport(report, 'https://forms.test/x')).resolves.toEqual({ channel: 'endpoint' });
    const [, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(JSON.parse(String(init.body))).not.toHaveProperty('website');
  });

  it('throws an i18n key on server error', async () => {
    vi.stubGlobal('fetch', mockFetchSequence([{ ok: false, status: 500, body: {} }]));
    await expect(submitReport(report, 'https://forms.test/x')).rejects.toThrow('report.errors.server');
  });

  it('refuses honeypot submissions', async () => {
    await expect(submitReport({ ...report, website: 'spam' }, '')).rejects.toThrow('report.errors.spam');
  });
});
