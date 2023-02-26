import { BasePhoto, FullPhoto } from '../../models/photos';

const url = 'https://api.unsplash.com/search/photos';
const query = '?query=';
const perPages = '&per_page=20';
const pageNum = '&page=1';
const auth = '&client_id=';

export const getPhotos = async (
  topic: string,
  page = 1
): Promise<BasePhoto[]> => {
  const finalUrl =
    url +
    query +
    topic +
    perPages +
    pageNum +
    page +
    auth +
    process.env.VITE_SPLASH_Access_Key;
  console.log(finalUrl);
  const response = await fetch(finalUrl);
  if (!response.ok) throw new Error('Fetch error');
  const data: FullPhoto[] = (await response.json()).results;
  const finalData = data.map((item) => ({
    id: item.id,
    width: item.width,
    height: item.height,
    color: item.color,
    description: item.description,
    altDescription: item.alt_description,
    url: item.urls,
  }));
  return finalData;
};
