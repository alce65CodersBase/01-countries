import { API_URL_ALL, API_URL_REGION } from '../../config';

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

// TEMP export const getCountries()
