import { OBSERVANCES, upcomingObservances } from './observances';

describe('upcomingObservances', () => {
  it('returns soonest first starting today', () => {
    const [first, second] = upcomingObservances(new Date(2026, 10, 9), 2);
    expect(first).toMatchObject({ month: 11, day: 28, daysAway: 19 });
    expect(second).toMatchObject({ month: 12, day: 11 });
  });

  it('counts an observance on the same day as 0 days away', () => {
    expect(upcomingObservances(new Date(2026, 3, 22), 1)[0]).toMatchObject({ month: 4, daysAway: 0 });
  });

  it('rolls passed dates into next year', () => {
    const all = upcomingObservances(new Date(2026, 11, 20));
    expect(all).toHaveLength(OBSERVANCES.length);
    expect(all[0].date.getFullYear()).toBe(2027);
    expect(all.every((o) => o.daysAway >= 0)).toBe(true);
  });
});
