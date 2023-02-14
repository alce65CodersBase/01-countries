import { BaseCountry } from '../../models/country';
import {
  getBaseCountries,
  getContinents,
  getRegions,
} from './countries.api.repo';

describe('Given getContinents function', () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue('Euro'),
  });
  describe('When it is called', () => {
    let r: string[];
    // eslint-disable-next-line no-return-assign
    beforeEach(async () => (r = await getContinents()));
    test('Then fetch should be called', () => {
      expect(global.fetch).toHaveBeenCalled();
    });
    test('Then result should be []', () => {
      expect(r).toEqual([]);
    });
  });
});

describe('Given getRegions function', () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue([]),
  });
  const mockContinent = '';
  let r: string[];
  describe('When it is called with a continent', () => {
    // eslint-disable-next-line no-return-assign
    beforeEach(async () => (r = await getRegions(mockContinent)));
    test('Then fetch should be called', () => {
      expect(global.fetch).toHaveBeenCalled();
    });
    test('Then result should be []', () => {
      expect(r).toEqual([]);
    });
  });
});

describe('Given getBaseCountries function', () => {
  const mockContinent = '';
  const mockRegion = '';
  const mockCountry = {
    cca2: '',
    name: { common: '' },
    capital: [''],
    flags: { svg: '' },
  } as unknown as BaseCountry;
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue([mockCountry]),
  });

  describe('When it is called with a continent and region', () => {
    let r: BaseCountry[];
    beforeEach(
      // eslint-disable-next-line no-return-assign
      async () => (r = await getBaseCountries(mockContinent, mockRegion))
    );
    test('Then fetch should be called', () => {
      expect(global.fetch).toHaveBeenCalled();
    });
    test('Then result should be []', () => {
      expect(r).toEqual([
        {
          id: '',
          capital: '',
          flag: '',
          name: '',
        },
      ]);
    });
  });
});
