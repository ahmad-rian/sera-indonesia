import { AIR_QUALITY_FALLBACK, buildCurrentUrl, buildTrendUrl, loadAirQuality, loadCityTrend, toDailyMeans } from './airQuality';
import { CITIES, cityCoords } from './cities';
import { mockFetchSequence } from '../../test/render';

afterEach(() => vi.unstubAllGlobals());

const reading = (aqi: number) => ({
  current: { time: 't', us_aqi: aqi, pm2_5: 10.5, pm10: 20, nitrogen_dioxide: 5, ozone: 60, carbon_monoxide: 300, sulphur_dioxide: null, uv_index: 4 },
});
const current = CITIES.map((_, i) => reading(100 + i));
const trend = {
  hourly: {
    time: ['2026-11-08T00:00', '2026-11-08T01:00', '2026-11-09T00:00', '2026-11-09T01:00'],
    us_aqi: [100, 200, null, 90],
  },
};

describe('toDailyMeans', () => {
  it('averages per day, skips nulls and sorts ascending', () => {
    expect(toDailyMeans(trend.hourly.time, trend.hourly.us_aqi)).toEqual([
      { date: '2026-11-08', value: 150 },
      { date: '2026-11-09', value: 90 },
    ]);
  });
});

describe('URL builders', () => {
  it('requests every city and all pollutants in one call', () => {
    const url = new URL(buildCurrentUrl());
    expect(url.searchParams.get('latitude')?.split(',')).toHaveLength(CITIES.length);
    expect(url.searchParams.get('current')).toContain('nitrogen_dioxide');
  });

  it('requests a week of hourly AQI for the chosen city', () => {
    const url = new URL(buildTrendUrl('Medan'));
    expect(url.searchParams.get('past_days')).toBe('7');
    expect(url.searchParams.get('latitude')).toBe(String(cityCoords('Medan').lat));
  });

  it('rejects unknown cities', () => {
    expect(() => buildTrendUrl('Atlantis')).toThrow('Unknown city');
  });
});

describe('loadAirQuality', () => {
  it('maps every city with pollutant breakdown', async () => {
    vi.stubGlobal('fetch', mockFetchSequence([{ body: current }]));
    const res = await loadAirQuality();
    expect(res.isFallback).toBe(false);
    expect(res.data.cities).toHaveLength(CITIES.length);
    expect(res.data.cities[0]).toMatchObject({ city: 'Jakarta', aqi: 100, pm25: 10.5, no2: 5, so2: null, uv: 4 });
  });

  it('falls back to the real snapshot when validation fails', async () => {
    vi.stubGlobal('fetch', mockFetchSequence([{ body: [{ current: { us_aqi: 'bad' } }] }]));
    const res = await loadAirQuality();
    expect(res.isFallback).toBe(true);
    expect(res.data.cities).toEqual(AIR_QUALITY_FALLBACK.data.cities);
    expect(res.data.cities).toHaveLength(CITIES.length);
  });
});

describe('loadCityTrend', () => {
  it('returns daily means for a city', async () => {
    vi.stubGlobal('fetch', mockFetchSequence([{ body: trend }]));
    const res = await loadCityTrend('Jakarta');
    expect(res.data).toHaveLength(2);
  });

  it('uses the Jakarta snapshot offline and an empty series for other cities', async () => {
    vi.stubGlobal('fetch', mockFetchSequence([new TypeError('offline'), new TypeError('offline')]));
    expect((await loadCityTrend('Jakarta')).data.length).toBeGreaterThan(0);
    expect((await loadCityTrend('Medan')).data).toEqual([]);
  });
});
