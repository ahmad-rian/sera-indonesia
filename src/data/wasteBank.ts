import type { Localized } from '../lib/localized';

/**
 * DEMO DATA. Every number and unit below is placeholder content for the SERA
 * waste-bank programme and is rendered with a "sample data" badge.
 * Replace with real programme data before launch.
 */
export const WASTE_BANK_IS_DEMO = true;

export type WasteGroup = 'plastic' | 'paper' | 'metal' | 'glass' | 'other';

export interface WasteItem {
  group: WasteGroup;
  name: Localized;
  /** Buying price in IDR per kg (per litre for oil). */
  pricePerKg: number;
}

export const WASTE_PRICES: WasteItem[] = [
  { group: 'plastic', name: { id: 'Botol PET bening', en: 'Clear PET bottles' }, pricePerKg: 4000 },
  { group: 'plastic', name: { id: 'Gelas plastik (PP)', en: 'Plastic cups (PP)' }, pricePerKg: 3500 },
  { group: 'plastic', name: { id: 'Plastik keras (HDPE)', en: 'Hard plastic (HDPE)' }, pricePerKg: 3000 },
  { group: 'paper', name: { id: 'Kardus', en: 'Cardboard' }, pricePerKg: 2000 },
  { group: 'paper', name: { id: 'Kertas HVS / arsip', en: 'Office paper' }, pricePerKg: 2500 },
  { group: 'paper', name: { id: 'Koran & majalah', en: 'Newspapers & magazines' }, pricePerKg: 1500 },
  { group: 'metal', name: { id: 'Kaleng aluminium', en: 'Aluminium cans' }, pricePerKg: 12000 },
  { group: 'metal', name: { id: 'Besi', en: 'Iron scrap' }, pricePerKg: 3500 },
  { group: 'glass', name: { id: 'Botol kaca utuh', en: 'Whole glass bottles' }, pricePerKg: 500 },
  { group: 'other', name: { id: 'Minyak jelantah (per liter)', en: 'Used cooking oil (per litre)' }, pricePerKg: 5000 },
];

export interface WasteBankUnit {
  name: string;
  city: string;
  schedule: Localized;
  members: number;
}

export const WASTE_BANK_UNITS: WasteBankUnit[] = [
  { name: 'SERA Unit Melati', city: 'Purwokerto', schedule: { id: 'Sabtu 08.00–11.00', en: 'Sat 08:00–11:00' }, members: 214 },
  { name: 'SERA Unit Kenanga', city: 'Bandung', schedule: { id: 'Minggu 07.00–10.00', en: 'Sun 07:00–10:00' }, members: 178 },
  { name: 'SERA Unit Bakau', city: 'Surabaya', schedule: { id: 'Rabu & Sabtu 15.00–17.00', en: 'Wed & Sat 15:00–17:00' }, members: 302 },
  { name: 'SERA Unit Cemara', city: 'Yogyakarta', schedule: { id: 'Jumat 16.00–18.00', en: 'Fri 16:00–18:00' }, members: 126 },
];

export const WASTE_BANK_STATS = {
  members: WASTE_BANK_UNITS.reduce((sum, u) => sum + u.members, 0),
  units: WASTE_BANK_UNITS.length,
  kgCollected: 18_450,
  savingsIdr: 41_250_000,
} as const;

export const WASTE_BANK_STEPS = ['sort', 'clean', 'deposit', 'weigh', 'save'] as const;
