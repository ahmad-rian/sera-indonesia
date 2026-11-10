#!/usr/bin/env node
/**
 * Refreshes the static fallback snapshots in src/features/data/fallback/*.json
 * with real responses from the live public APIs. Run: npm run data:snapshot
 * Responses are trimmed to the fields the app parses; shapes stay identical.
 */
import { writeFile } from 'node:fs/promises';

const OUT = new URL('../src/features/data/fallback/', import.meta.url);
const CITIES = [
  [-6.21, 106.85], [-6.92, 107.61], [-6.97, 110.42], [-7.25, 112.75], [-8.65, 115.22], [3.59, 98.67], [0.51, 101.45],
  [-2.98, 104.76], [-0.03, 109.33], [-2.21, 113.92], [-0.5, 117.15], [-5.15, 119.43], [1.47, 124.84], [-2.53, 140.72],
];
const lat = CITIES.map((c) => c[0]).join(',');
const lon = CITIES.map((c) => c[1]).join(',');
const WB = { forest: 'AG.LND.FRST.ZS', pm25: 'EN.ATM.PM25.MC.M3', co2pc: 'EN.GHG.CO2.PC.CE.AR5', ghg: 'EN.GHG.ALL.MT.CE.AR5', renewable: 'EG.FEC.RNEW.ZS' };

async function get(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return res.json();
}
const pick = (o, keys) => Object.fromEntries(keys.map((k) => [k, o[k]]));
async function save(name, data) {
  await writeFile(new URL(name, OUT), JSON.stringify({ asOf: new Date().toISOString(), ...data }, null, 1) + '\n');
  console.log('wrote', name);
}

const aq = await get(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi,pm2_5,pm10,nitrogen_dioxide,ozone,carbon_monoxide,sulphur_dioxide,uv_index&timezone=Asia%2FJakarta`);
await save('airQuality.current.json', { data: aq.map((x) => ({ current: x.current })) });

const trend = await get('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=-6.21&longitude=106.85&hourly=us_aqi&past_days=7&forecast_days=1&timezone=Asia%2FJakarta');
await save('airQuality.trend.json', { city: 'Jakarta', data: { hourly: trend.hourly } });

const wx = await get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,uv_index_max&forecast_days=7&timezone=Asia%2FJakarta`);
await save('weather.json', { data: wx.map((x) => ({ current: x.current, daily: x.daily })) });

const QUAKE_KEYS = ['DateTime', 'Coordinates', 'Magnitude', 'Kedalaman', 'Wilayah', 'Potensi', 'Dirasakan'];
const bmkg = (f) => get(`https://data.bmkg.go.id/DataMKG/TEWS/${f}`);
const [latest, significant, felt] = await Promise.all(['autogempa.json', 'gempaterkini.json', 'gempadirasakan.json'].map(bmkg));
await save('earthquake.json', {
  data: {
    latest: { Infogempa: { gempa: pick(latest.Infogempa.gempa, QUAKE_KEYS) } },
    significant: { Infogempa: { gempa: significant.Infogempa.gempa.map((g) => pick(g, QUAKE_KEYS)) } },
    felt: { Infogempa: { gempa: felt.Infogempa.gempa.map((g) => pick(g, QUAKE_KEYS)) } },
  },
});

const wb = {};
for (const [key, code] of Object.entries(WB)) {
  const [meta, rows] = await get(`https://api.worldbank.org/v2/country/IDN/indicator/${code}?format=json&per_page=60&date=2000:${new Date().getFullYear()}`);
  wb[key] = [pick(meta, ['lastupdated']), rows.map((r) => pick(r, ['date', 'value']))];
}
await save('indicators.json', { data: wb });
