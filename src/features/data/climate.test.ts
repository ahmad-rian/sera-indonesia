import { CITIES } from './cities';
import { INDICATORS, INDICATORS_FALLBACK, buildIndicatorUrl, loadIndicators, mapSeries } from './indicators';
import { WEATHER_FALLBACK, buildWeatherUrl, loadWeather } from './weather';
import { mockFetchSequence } from '../../test/render';

afterEach(() => vi.unstubAllGlobals());

const day = { time: ['2026-11-10', '2026-11-11'], temperature_2m_max: [33, 34], temperature_2m_min: [25, null], precipitation_sum: [4.2, 0], uv_index_max: [9, 10] };
const wx = CITIES.map((_, i) => ({
  current: { time: 't', temperature_2m: 30 + i, apparent_temperature: 35, relative_humidity_2m: 70, precipitation: 0, weather_code: 3, wind_speed_10m: 8 },
  daily: day,
}));

describe('weather', () => {
  it('builds one multi-city request with a 7-day forecast', () => {
    const url = new URL(buildWeatherUrl());
    expect(url.searchParams.get('forecast_days')).toBe('7');
    expect(url.searchParams.get('longitude')?.split(',')).toHaveLength(CITIES.length);
  });

  it('maps current conditions and daily series per city', async () => {
    vi.stubGlobal('fetch', mockFetchSequence([{ body: wx }]));
    const res = await loadWeather();
    expect(res.data[0]).toMatchObject({ city: 'Jakarta', temp: 30, feelsLike: 35, humidity: 70 });
    expect(res.data[0].daily[1]).toEqual({ date: '2026-11-11', max: 34, min: null, rain: 0, uv: 10 });
  });

  it('falls back to the real snapshot', async () => {
    vi.stubGlobal('fetch', mockFetchSequence([{ ok: false, status: 500, body: {} }]));
    const res = await loadWeather();
    expect(res.isFallback).toBe(true);
    expect(res.data).toEqual(WEATHER_FALLBACK.data);
  });
});

describe('indicators', () => {
  const wb = (rows: { date: string; value: number | null }[]) => [{ lastupdated: '2026-07-01' }, rows];

  it('sorts oldest first and drops nulls', () => {
    expect(mapSeries(wb([{ date: '2024', value: 50 }, { date: '2023', value: null }, { date: '2000', value: 60 }]))).toEqual([
      { year: 2000, value: 60 },
      { year: 2024, value: 50 },
    ]);
  });

  it('requests data since 2000', () => {
    expect(buildIndicatorUrl('AG.LND.FRST.ZS')).toMatch(/date=2000:\d{4}/);
  });

  it('loads every indicator and skips empty series', async () => {
    const bodies = INDICATORS.map((_, i) => ({ body: wb(i === 4 ? [] : [{ date: '2000', value: 1 }, { date: '2024', value: 2 }]) }));
    vi.stubGlobal('fetch', mockFetchSequence(bodies));
    const res = await loadIndicators();
    expect(res.isFallback).toBe(false);
    expect(res.data.map((d) => d.key)).toEqual(['forest', 'pm25', 'co2pc', 'ghg']);
  });

  it('ships a non-empty real snapshot for every indicator', () => {
    expect(INDICATORS_FALLBACK.data).toHaveLength(INDICATORS.length);
    expect(INDICATORS_FALLBACK.data.every((d) => d.series.length > 10)).toBe(true);
  });
});
