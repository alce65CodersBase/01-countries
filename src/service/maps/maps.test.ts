import { createURLGoogle, createURLOpen } from './maps';

describe('Given createURLOpen function', () => {
  describe('When area is 200.000', () => {
    const latLng: number[] = [105, 46];
    const area = 200_000;
    test('Then it should return a map url', () => {
      const result = createURLOpen(latLng, area);
      expect(result).toContain('openstreetmap');
    });
  });
  describe('When area is 120.000.000', () => {
    const latLng: number[] = [105, 46];
    const area = 120_000_000;
    test('Then it should return a map url', () => {
      const result = createURLOpen(latLng, area);
      expect(result).toContain('openstreetmap');
    });
  });
});

describe('Given createURLGoogle function', () => {
  const country = 'any small';
  const area = 200_000;
  describe('When area is 200.000', () => {
    test('Then it should return a map url', () => {
      const result = createURLGoogle(country, area);
      expect(result).toContain('google');
    });
  });

  describe('When area is 120.000.000', () => {
    const country = 'any big';
    const area = 120_000_000;
    test('Then it should return a map url', () => {
      const result = createURLGoogle(country, area);
      expect(result).toContain('google');
    });
  });
});
