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

export const getLanguages = async () => {
  type Response = {
    altSpellings: string[];
    languages: { [key: string]: string };
  };
  const response = await fetch(API_URL_ALL + '?fields=languages');
  const data: Response[] = await response.json();
  console.log('DATA', data);
  const languages = data.map((item) => Object.values(item.languages)).flat();
  const sortLanguages = [...new Set(languages)].sort();
  console.log(sortLanguages);
  return sortLanguages;
};

export const getContinents = async () => {
  const response = await fetch(API_URL_ALL + '?fields=region');
  const data: { region: string }[] = await response.json();
  const continents = [...new Set(data.map((item) => item.region))];
  console.log(continents);
  return continents;
};

export const getRegions = async (region: string) => {
  const url = API_URL_REGION + region + '?fields=subregion';
  const response = await fetch(url);
  const data: { subregion: string }[] = await response.json();
  const regions = [...new Set(data.map((item) => item.subregion))];
  console.log(regions);
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
  console.log(data);
  return mapBaseCountries(data);
};

export const getBaseCountriesByLanguage = async (language: string) => {
  const url =
    API_URL_LANG +
    language +
    '?fields=name,capital,flags,cca2,region,subregion';
  const response = await fetch(url);
  const data: BasicResponseCountry[] = await response.json();
  console.log(data);

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
  console.log(finalData);
  return finalData;
};

export const getCountryById = async (id: string): Promise<FullCountry> => {
  const response = await fetch(API_URL_COUNTRY + id);
  const data: FullCountry[] = await response.json();
  console.log('DATA', data[0]);
  return data[0];
};
