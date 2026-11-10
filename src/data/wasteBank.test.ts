import { WASTE_BANK_STATS, WASTE_BANK_UNITS, WASTE_PRICES } from './wasteBank';
import { formatIdr } from '../lib/utils';

describe('waste bank demo data', () => {
  it('derives member and unit totals from the unit list', () => {
    expect(WASTE_BANK_STATS.units).toBe(WASTE_BANK_UNITS.length);
    expect(WASTE_BANK_STATS.members).toBe(WASTE_BANK_UNITS.reduce((s, u) => s + u.members, 0));
  });

  it('has positive prices and unique item names', () => {
    expect(WASTE_PRICES.every((w) => w.pricePerKg > 0)).toBe(true);
    expect(new Set(WASTE_PRICES.map((w) => w.name.id)).size).toBe(WASTE_PRICES.length);
  });
});

describe('formatIdr', () => {
  it('uses full notation below one million', () => {
    expect(formatIdr(4000, 'id')).toMatch(/^Rp\s?4\.000$/);
  });

  it('uses compact notation from one million', () => {
    expect(formatIdr(41_250_000, 'id')).toMatch(/41,3\s?jt/);
    expect(formatIdr(41_250_000, 'en')).toMatch(/41\.3m/i);
  });
});
