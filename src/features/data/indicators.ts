import * as z from 'zod/mini';
import { fetchJson, withFallback } from './withFallback';
import rawIndicators from './fallback/indicators.json';
import type { DataResult, Indicator, IndicatorKey } from './types';

export const WB_SOURCE = 'World Bank Open Data';
const BASE = 'https://api.worldbank.org/v2/country/IDN/indicator';
const SINCE_YEAR = 2000;

/** World Bank indicator codes. `goodWhen` tells the UI whether a rise is positive. */
export const INDICATORS: { key: IndicatorKey; code: string; unit: string; goodWhen: 'up' | 'down' }[] = [
  { key: 'forest', code: 'AG.LND.FRST.ZS', unit: '%', goodWhen: 'up' },
  { key: 'pm25', code: 'EN.ATM.PM25.MC.M3', unit: 'µg/m³', goodWhen: 'down' },
  { key: 'co2pc', code: 'EN.GHG.CO2.PC.CE.AR5', unit: 't', goodWhen: 'down' },
  { key: 'ghg', code: 'EN.GHG.ALL.MT.CE.AR5', unit: 'Mt', goodWhen: 'down' },
  { key: 'renewable', code: 'EG.FEC.RNEW.ZS', unit: '%', goodWhen: 'up' },
];

const wbSchema = z.tuple([
  z.object({ lastupdated: z.optional(z.string()) }),
  z.array(z.object({ date: z.string(), value: z.nullable(z.number()) })),
]);

export function buildIndicatorUrl(code: string): string {
  return `${BASE}/${code}?format=json&per_page=60&date=${SINCE_YEAR}:${new Date().getFullYear()}`;
}

/** Oldest-first series with nulls dropped. */
export function mapSeries(raw: unknown): { year: number; value: number }[] {
  const [, rows] = wbSchema.parse(raw);
  return rows
    .filter((r): r is { date: string; value: number } => r.value !== null)
    .map((r) => ({ year: Number(r.date), value: r.value }))
    .sort((a, b) => a.year - b.year);
}

function toIndicators(rawByKey: Record<string, unknown>): Indicator[] {
  return INDICATORS.map(({ key, unit, goodWhen }) => ({ key, unit, goodWhen, series: mapSeries(rawByKey[key]) })).filter(
    (i) => i.series.length > 0,
  );
}

export const INDICATORS_FALLBACK = {
  data: toIndicators((rawIndicators as { data: Record<string, unknown> }).data),
  asOf: (rawIndicators as { asOf: string }).asOf,
  source: `${WB_SOURCE} — snapshot`,
};

export async function loadIndicators(): Promise<DataResult<Indicator[]>> {
  return withFallback(async () => {
    const raws = await Promise.all(INDICATORS.map((i) => fetchJson(buildIndicatorUrl(i.code))));
    const byKey = Object.fromEntries(INDICATORS.map((i, idx) => [i.key, raws[idx]]));
    return { data: toIndicators(byKey), asOf: new Date().toISOString(), source: WB_SOURCE };
  }, INDICATORS_FALLBACK);
}
