import { AQ_CITIES, buildCurrentUrl, buildTrendUrl, loadAirQuality, toDailyMeans } from './airQuality';
import { mockFetchSequence } from '../../test/render';

afterEach(() => vi.unstubAllGlobals());

const current = AQ_CITIES.map((_, i) => ({ current: { time: '2026-11-09T14:00', us_aqi: 100 + i, pm2_5: 10.5 } }));
const trend = {
  hourly: {
    time: ['2026-11-08T00:00', '2026-11-08T01:00', '2026-11-09T00:00', '2026-11-09T01:00'],
    us_aqi: [100, 200, null, 90],
  },
};

describe('toDailyMeans', () => {
  it('averages per day, skips nulls and sorts ascending', () => {
    expect(toDailyMeans(trend.hourly.time, trend.hourly.us_aqi)).toEqual([
      { date: '2026-11-08', aqi: 150 },
      { date: '2026-11-09', aqi: 90 },
    ]);
  });
});

describe('URL builders', () => {
  it('requests every city in one call', () => {
    const url = new URL(buildCurrentUrl());
    expect(url.searchParams.get('latitude')?.split(',')).toHaveLength(AQ_CITIES.length);
    expect(url.searchParams.get('current')).toBe('us_aqi,pm2_5');
  });

  it('requests a week of hourly AQI for Jakarta', () => {
    const url = new URL(buildTrendUrl());
    expect(url.searchParams.get('past_days')).toBe('7');
    expect(url.searchParams.get('latitude')).toBe(String(AQ_CITIES[0].lat));
  });
});

describe('loadAirQuality', () => {
  it('maps live responses to city readings and trend', async () => {
    vi.stubGlobal('fetch', mockFetchSequence([{ body: current }, { body: trend }]));
    const res = await loadAirQuality();
    expect(res.isFallback).toBe(false);
    expect(res.data.cities[0]).toEqual({ city: 'Jakarta', aqi: 100, pm25: 10.5 });
    expect(res.data.trend).toHaveLength(2);
  });

  it('falls back when the payload fails validation', async () => {
    vi.stubGlobal('fetch', mockFetchSequence([{ body: [{ current: { us_aqi: 'bad' } }] }, { body: trend }]));
    const res = await loadAirQuality();
    expect(res.isFallback).toBe(true);
    expect(res.data.cities.length).toBeGreaterThan(0);
  });

  it('falls back when the network fails', async () => {
    vi.stubGlobal('fetch', mockFetchSequence([new TypeError('offline'), new TypeError('offline')]));
    const res = await loadAirQuality();
    expect(res).toMatchObject({ isFallback: true, error: 'offline' });
  });
});
