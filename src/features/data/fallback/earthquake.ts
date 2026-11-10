import type { DataResult } from '../types';
import type { QuakeFeed } from '../earthquake';

/** Snapshot of BMKG feeds on 2026-11-09. */
export const EARTHQUAKE_FALLBACK: Omit<DataResult<QuakeFeed>, 'isFallback'> = {
  asOf: '2026-11-09T00:44:58Z',
  source: 'BMKG — snapshot',
  data: {
    latest: {
      datetime: '2026-11-09T00:44:58+00:00',
      magnitude: 2.5,
      depthKm: 10,
      region: 'Pusat gempa berada di laut 1 km timur Jailolo',
      coordinates: [1.06, 127.47],
      felt: 'II Kab. Halmahera Barat',
    },
    significant: [
      {
        datetime: '2026-11-02T08:13:10+00:00',
        magnitude: 5.3,
        depthKm: 148,
        region: '1 km BaratDaya TOMOHON-SULUT',
        coordinates: [1.31, 124.83],
        potential: 'Tidak berpotensi tsunami',
      },
      {
        datetime: '2026-11-02T00:53:11+00:00',
        magnitude: 5.5,
        depthKm: 130,
        region: '169 km BaratLaut TANIMBAR',
        coordinates: [-7.08, 130.07],
        potential: 'Tidak berpotensi tsunami',
      },
    ],
  },
};
