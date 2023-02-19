import { BaseCountry } from '../../models/country';
import {
  getBaseCountriesByContinent,
  getBaseCountriesByRegion,
  getLanguages,
  getBaseCountriesByLanguage,
  getContinents,
  getRegions,
  getCountryById,
  queryCountry,
} from './countries.api.repo';

describe('Given getLanguages function', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        {
          languages: {
            any: 'any language',
            other: undefined,
          },
        },
      ]),
    });
  });

  describe('When it is called', () => {
    let r: string[];
    // eslint-disable-next-line no-return-assign
    beforeEach(async () => (r = await getLanguages()));
    test('Then fetch should be called', () => {
      expect(global.fetch).toHaveBeenCalled();
    });
    test(`Then result should be ['any language']`, () => {
      expect(r).toEqual(['any language']);
    });
  });
});

describe('Given getContinents function', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        {
          region: 'Europe',
        },
      ]),
    });
  });

  describe('When it is called', () => {
    let r: string[];
    // eslint-disable-next-line no-return-assign
    beforeEach(async () => (r = await getContinents()));
    test('Then fetch should be called', () => {
      expect(global.fetch).toHaveBeenCalled();
    });
    test(`Then result should be ['Europe']`, () => {
      expect(r).toEqual(['Europe']);
    });
  });
});

describe('Given getRegions function', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([{ subregion: 'South-Europe' }]),
    });
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
      expect(r).toEqual(['South-Europe']);
    });
  });
});

describe('Given getBaseCountriesBy... functions', () => {
  const mockContinent = '';
  const mockRegion = '';
  const mockLanguage = '';
  const mockCountry = {
    cca2: '',
    name: { common: '' },
    capital: [''],
    flags: { svg: '' },
  } as unknown as BaseCountry;
  const mockFinalCountries = [
    {
      id: '',
      capital: '',
      flag: '',
      name: '',
    },
  ];
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([mockCountry]),
    });
  });

  describe('When getBaseCountriesByLanguage is called without a language', () => {
    let r: BaseCountry[];
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({ status: 'Error' }),
      });
    });
    beforeEach(
      // eslint-disable-next-line no-return-assign
      async () => (r = await getBaseCountriesByLanguage(''))
    );
    test('Then fetch should be called', () => {
      expect(global.fetch).toHaveBeenCalled();
    });
    test('Then result should be []', () => {
      expect(r).toEqual([]);
    });
  });

  describe('When getBaseCountriesByLanguage is called with a language', () => {
    let r: BaseCountry[];
    beforeEach(
      // eslint-disable-next-line no-return-assign
      async () => (r = await getBaseCountriesByLanguage(mockLanguage))
    );
    test('Then fetch should be called', () => {
      expect(global.fetch).toHaveBeenCalled();
    });
    test('Then result should be []', () => {
      expect(r).toEqual(mockFinalCountries);
    });
  });
  describe('When getBaseCountriesByContinent is called with a continent and region', () => {
    let r: BaseCountry[];
    beforeEach(
      // eslint-disable-next-line no-return-assign
      async () => (r = await getBaseCountriesByContinent(mockContinent))
    );
    test('Then fetch should be called', () => {
      expect(global.fetch).toHaveBeenCalled();
    });
    test('Then result should be []', () => {
      expect(r).toEqual(mockFinalCountries);
    });
  });

  describe('When getBaseCountriesByRegion is called with a continent and region', () => {
    let r: BaseCountry[];
    beforeEach(
      // eslint-disable-next-line no-return-assign
      async () => (r = await getBaseCountriesByRegion(mockRegion))
    );
    test('Then fetch should be called', () => {
      expect(global.fetch).toHaveBeenCalled();
    });
    test('Then result should be []', () => {
      expect(r).toEqual(mockFinalCountries);
    });
  });
});

describe('Given getCountryById', () => {
  const mockCountry = {
    cca2: 'AA',
    name: { common: '' },
    capital: [''],
    flags: { svg: '' },
  } as unknown as BaseCountry;
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([mockCountry]),
    });
  });
  describe('When it is callled with an id', () => {
    const mockID = 'AA';
    test('Then it should return the country', async () => {
      const r = await getCountryById(mockID);
      expect(r).toEqual(mockCountry);
    });
  });
});

describe('Given queryCountry', () => {
  const mockCountry = {
    cca2: '',
    name: { common: '' },
    capital: [''],
    flags: { svg: '' },
  } as unknown as BaseCountry;
  const mockQueryId = {
    queryKey: ['query name', 'AA'],
  };
  describe('When it is called a valid query id', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockCountry),
        ok: true,
      });
    });
    test('Then it should return the country', async () => {
      const r = await queryCountry(mockQueryId);
      expect(r).toEqual(mockCountry);
    });
  });
  describe('When it is called a NOT valid query id', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockCountry),
        ok: false,
      });
    });
    test('Then it should return the country', async () => {
      expect(() => queryCountry(mockQueryId)).rejects.toThrow();
    });
  });
});
