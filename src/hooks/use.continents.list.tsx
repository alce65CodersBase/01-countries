import { queryContinents } from '../service/repo/countries.api.repo';
import { QueryStatus, useQuery } from '@tanstack/react-query';

// Previous version without React-Query
// export const useContinentsList = () => {
//   const [continents, setContinents] = useState(CONTINENTS);
//   const loadContinents = async () => {
//     const continents = await getContinents();
//     setContinents(continents);
//   };
//   useEffect(() => {
//     loadContinents();
//   }, []);
//   return {
//     continents,
//   };
// };

export const useContinentsList = () => {
  const results = useQuery(['continents'], queryContinents);

  if (results.isLoading) {
    return { continents: [] };
  }

  return {
    continents: results.data ?? [],
    status: results.status,
  } as { continents: string[]; status: QueryStatus };
};
