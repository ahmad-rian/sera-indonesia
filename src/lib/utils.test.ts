import { cn, formatDate, formatNumber, formatRelative, normalizeLocale, toIntlLocale } from './utils';
import { pickLocalized } from './localized';

describe('normalizeLocale', () => {
  it('maps any English variant to en and everything else to id', () => {
    expect(normalizeLocale('en-US')).toBe('en');
    expect(normalizeLocale('EN')).toBe('en');
    expect(normalizeLocale('id-ID')).toBe('id');
    expect(normalizeLocale(undefined)).toBe('id');
    expect(toIntlLocale('en')).toBe('en-GB');
  });
});

describe('formatters', () => {
  it('formats numbers with locale grouping', () => {
    expect(formatNumber(12345, 'id')).toBe('12.345');
    expect(formatNumber(12345, 'en')).toBe('12,345');
  });

  it('returns raw input for invalid dates', () => {
    expect(formatDate('not-a-date', 'id')).toBe('not-a-date');
    expect(formatRelative('nope', 'id')).toBe('nope');
  });

  it('formats a date in each locale', () => {
    expect(formatDate('2026-11-09', 'en')).toMatch(/9 Nov 2026/);
    expect(formatDate('2026-11-09T07:00:00Z', 'id', true)).toMatch(/14\.00|14:00/);
  });

  it('picks minute, hour or day granularity for relative time', () => {
    const now = new Date('2026-11-09T12:00:00Z');
    expect(formatRelative('2026-11-09T11:50:00Z', 'en', now)).toBe('10 minutes ago');
    expect(formatRelative('2026-11-09T09:00:00Z', 'en', now)).toBe('3 hours ago');
    expect(formatRelative('2026-11-07T12:00:00Z', 'en', now)).toBe('2 days ago');
  });
});

describe('cn / pickLocalized', () => {
  it('merges conflicting tailwind classes', () => {
    const hidden = false;
    expect(cn('p-2', hidden && 'hidden', 'p-4')).toBe('p-4');
  });

  it('picks the localized string', () => {
    expect(pickLocalized({ id: 'Halo', en: 'Hello' }, 'en-GB')).toBe('Hello');
    expect(pickLocalized({ id: 'Halo', en: 'Hello' }, 'id')).toBe('Halo');
  });
});
