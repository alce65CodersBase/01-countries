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
