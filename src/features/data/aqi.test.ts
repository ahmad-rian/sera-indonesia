import { AQI_TONE, aqiLevel } from './aqi';

describe('aqiLevel', () => {
  it.each([
    [0, 'good'],
    [50, 'good'],
    [51, 'moderate'],
    [150, 'sensitive'],
    [151, 'unhealthy'],
    [300, 'veryUnhealthy'],
    [301, 'hazardous'],
  ])('AQI %i is %s', (aqi, level) => {
    expect(aqiLevel(aqi)).toBe(level);
    expect(AQI_TONE[aqiLevel(aqi)]).toBeTruthy();
  });
});
