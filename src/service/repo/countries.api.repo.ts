import {
  API_URL_ALL,
  API_URL_COUNTRY,
  API_URL_LANG,
  API_URL_REGION,
  API_URL_SUB_REGION,
} from '../../config';
import {
  BaseCountry,
  BasicResponseCountry,
  FullCountry,
} from '../../models/country';

export const languagesCollection: { [key: string]: string } = {};

export const getLanguages = async () => {
  type Response = {
    altSpellings: string[];
    languages: { [key: string]: string };
  };

  if (Object.keys(languagesCollection).length) {
    console.log('Cache: ', languagesCollection);
    return Object.values(languagesCollection).sort();
  }

  const response = await fetch(API_URL_ALL + '?fields=languages');
  const data: Response[] = await response.json();
  const languagesArrays = data.map((item) =>
    Object.entries(item.languages).flat()
  );
  languagesArrays.forEach((item) => {
    item.forEach((_item, i) => {
      if (i % 2 !== 0) return;
      if (item[i + 1] === undefined) return;
      languagesCollection[item[i]] = item[i + 1];
    });
  });
  console.log('Created: ', languagesCollection);
  const sortLanguages = Object.values(languagesCollection).sort();
  console.log('Sort Languages: ', sortLanguages);
  return sortLanguages;
};

export const getContinents = async () => {
  const response = await fetch(API_URL_ALL + '?fields=region');
  const data: { region: string }[] = await response.json();
  const continents = [...new Set(data.map((item) => item.region))];
  return continents;
};

export const getRegions = async (region: string) => {
  const url = API_URL_REGION + region + '?fields=subregion';
  const response = await fetch(url);
  const data: { subregion: string }[] = await response.json();
  const regions = [...new Set(data.map((item) => item.subregion))];
  return regions;
};

export const getBaseCountriesByContinent = async (region: string) => {
  const url =
    API_URL_REGION +
    region +
    '?fields=name,capital,flags,cca2,region,subregion';
  const response = await fetch(url);
  const data: BasicResponseCountry[] = await response.json();
  return mapBaseCountries(data);
};

export const getBaseCountriesByRegion = async (subregion: string) => {
  const url =
    API_URL_SUB_REGION +
    subregion +
    '?fields=name,capital,flags,cca2,region,subregion';
  const response = await fetch(url);
  const data: BasicResponseCountry[] = await response.json();
  return mapBaseCountries(data);
};

export const getBaseCountriesByLanguage = async (language: string) => {
  const url =
    API_URL_LANG +
    language +
    '?fields=name,capital,flags,cca2,region,subregion';
  const response = await fetch(url);
  const data: BasicResponseCountry[] = await response.json();
  return mapBaseCountries(data);
};

const mapBaseCountries = (data: BasicResponseCountry[]) => {
  if (!Array.isArray(data)) return [];
  const finalData: BaseCountry[] = data.map((item) => ({
    id: item.cca2,
    name: item.name.common,
    capital: item.capital[0],
    flag: item.flags.svg,
    continent: item.region,
    region: item.subregion,
  }));
  return finalData;
};

export const getCountryById = async (id: string): Promise<FullCountry> => {
  const response = await fetch(API_URL_COUNTRY + id);
  const data: FullCountry[] = await response.json();
  console.log('Country DATA', data[0]);
  return data[0];
};

export const queryCountry = async ({ queryKey }: { queryKey: string[] }) => {
  const id = queryKey[1];
  const response = await fetch(API_URL_COUNTRY + id);
  if (!response.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }

  return response.json();
};
