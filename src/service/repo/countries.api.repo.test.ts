import { BaseCountry } from '../../models/country';
import {
  getLanguages,
  getContinents,
  getRegions,
  getCountryById,
  queryCountry,
  searchCountries,
  queryContinents,
  queryRegions,
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
    beforeEach(async () => {
      r = await getLanguages();
    });
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
    beforeEach(async () => {
      r = await getContinents();
    });
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
    beforeEach(async () => {
      r = await getRegions(mockContinent);
    });
    test('Then fetch should be called', () => {
      expect(global.fetch).toHaveBeenCalled();
    });
    test('Then result should be []', () => {
      expect(r).toEqual(['South-Europe']);
    });
  });
});

describe(`Given searchCountries function,
    that use getBaseCountriesBy... functions`, () => {
  const mockContinent = 'test continent';
  const mockRegion = 'test region';
  const mockLanguage = 'test language';
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

  describe('When in is called without arguments', () => {
    test('Then it should return []', async () => {
      const result = await searchCountries('', '', '');
      expect(result).toEqual([]);
    });
  });

  describe('When is called only with a language', () => {
    let r: BaseCountry[];
    beforeEach(async () => {
      r = await searchCountries(mockLanguage, '', '');
    });
    test('Then fetch should be called', () => {
      expect(global.fetch).toHaveBeenCalled();
    });
    test('Then result should be []', () => {
      expect(r).toEqual(mockFinalCountries);
    });
  });

  describe('When it is called with language, continent and NO region', () => {
    let r: BaseCountry[];
    beforeEach(async () => {
      r = await searchCountries(mockLanguage, mockContinent, '');
    });
    test('Then fetch should be called', () => {
      expect(global.fetch).toHaveBeenCalled();
    });
    test('Then result should be []', () => {
      expect(r).toEqual([]);
    });
  });
  describe('When it is called with continent and NO region and NO language, ', () => {
    let r: BaseCountry[];
    beforeEach(async () => {
      r = await searchCountries('', mockContinent, '');
    });
    test('Then fetch should be called', () => {
      expect(global.fetch).toHaveBeenCalled();
    });
    test('Then result should be []', () => {
      expect(r).toEqual(mockFinalCountries);
    });
  });

  describe('When it is called with language, continent and region', () => {
    let r: BaseCountry[];
    beforeEach(async () => {
      r = await searchCountries(mockLanguage, mockContinent, mockRegion);
    });
    test('Then fetch should be called', () => {
      expect(global.fetch).toHaveBeenCalled();
    });
    test('Then result should be []', () => {
      expect(r).toEqual([]);
    });
  });

  describe('When it is called with a continent and region and  NO language', () => {
    let r: BaseCountry[];
    beforeEach(async () => {
      r = await searchCountries('', mockContinent, mockRegion);
    });
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
  describe('When it is called with an id', () => {
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

describe('Given queryContinents function', () => {
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
    beforeEach(async () => {
      r = await queryContinents({ queryKey: [''] });
    });
    test('Then fetch should be called', () => {
      expect(global.fetch).toHaveBeenCalled();
    });
    test(`Then result should be ['Europe']`, () => {
      expect(r).toEqual(['Europe']);
    });
  });
});

describe('Given queryRegions function', () => {
  const mockContinent = 'Continent';
  let r: string[];
  describe('When it is called with a continent', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue([{ subregion: 'South-Europe' }]),
      });
    });

    beforeEach(async () => {
      r = await queryRegions({ queryKey: ['', mockContinent] });
    });
    test('Then fetch should be called', () => {
      expect(global.fetch).toHaveBeenCalled();
    });
    test('Then result should be region []', () => {
      expect(r).toEqual(['South-Europe']);
    });
  });
  describe('When it is called without a continent', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue([]),
      });
    });
    beforeEach(async () => {
      r = await queryRegions({ queryKey: ['', ''] });
    });
    test('Then result should be region []', () => {
      expect(r).toEqual([]);
    });
  });
});
