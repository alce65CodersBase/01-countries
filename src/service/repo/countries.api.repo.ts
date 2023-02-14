import { API_URL_ALL, API_URL_REGION, API_URL_SUB_REGION } from '../../config';
import { BaseCountry, BasicResponseCountry } from '../../models/country';

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

export const getBaseCountries = async (region: string, subregion: string) => {
  const url =
    API_URL_SUB_REGION + subregion + '?fields=name,capital,flags,cca2';
  const response = await fetch(url);
  const data: BasicResponseCountry[] = await response.json();
  console.log(data);
  const finalData: BaseCountry[] = data.map((item) => ({
    id: item.cca2,
    name: item.name.common,
    capital: item.capital[0],
    flag: item.flags.svg,
  }));
  console.log(finalData);
  return finalData;
};
