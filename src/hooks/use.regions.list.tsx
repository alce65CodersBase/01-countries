import { queryRegions } from '../service/repo/countries.api.repo';
import { useQuery } from '@tanstack/react-query';

// Previous version without React-Query
// const localCache: { [key: string]: any } = {};

// export const useRegionLists = (continent: string) => {
//   const [regions, setRegions] = useState<string[]>([]);
//   // Tracking status is very useful for the test
//   const [status, setStatus] = useState('unloaded');

//   useEffect(() => {
//     const loadRegions = async (continent: string) => {
//       setRegions([]);
//       setStatus('loading');
//       const regions = await getRegions(continent);
//       localCache[continent] = regions;
//       setRegions(localCache[continent]);
//       setStatus('loaded');
//     };

//     if (!continent) {
//       setRegions([]);
//     } else if (localCache[continent]) {
//       setRegions(localCache[continent]);
//     } else {
//       loadRegions(continent);
//     }
//   }, [continent]);

//   return {
//     regions,
//     status,
//   };
// };

export const useRegionLists = (continent: string) => {
  const results = useQuery(['regions', continent], queryRegions);

  if (results.isLoading) {
    return {
      regions: [],
      status: 'loading',
    } as { regions: string[]; status: string };
  }

  return {
    regions: results.data ?? [],
    status: results.status,
  };
};
