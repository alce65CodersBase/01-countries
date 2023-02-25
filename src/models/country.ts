export type BaseCountry = {
  id: string;
  name: string;
  flag: string;
  capital: string;
  continent: string;
  region: string;
};

export type BasicResponseCountry = {
  cca2: string;
  flags: { [key: string]: string };
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
};

export type FullCountry = {
  name: CountryName;
  altSpellings: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  fifa: string;
  tld: string[];
  idd: Idd;
  capital: string[];
  capitalInfo: CapitalInfo;
  region: string;
  continents: string[];
  subregion: string;
  borders: string[];
  latlng: number[];
  flag: string;
  flags: Flags;
  coatOfArms: CoatOfArms;
  maps: Maps;
  currencies: CountryCurrencies;
  languages: { [key: string]: string };
  area: number;
  population: number;
  timezones: string[];
  demonyms: Demonyms;
  status: string;
  independent: boolean;
  unMember: boolean;
  landlocked: boolean;
  startOfWeek: string;
  car: Car;
  translations: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
  gini: Gini;
  postalCode: PostalCode;
};

export interface CountryName {
  common: string;
  official: string;
  nativeName: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
}

interface Idd {
  root: string;
  suffixes: string[];
}
interface CapitalInfo {
  latlng: number[];
}

interface CoatOfArms {
  png: string;
  svg: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt: string;
}

interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}
export interface CountryCurrencies {
  [key: string]: {
    name: string;
    symbol: string;
  };
}
export interface Demonyms {
  [key: string]: {
    f: string;
    m: string;
  };
}
export interface Car {
  signs: string[];
  side: string;
}

export interface Gini {
  [key: string]: number;
}
export interface PostalCode {
  format: string;
  regex: string;
}
