import { queryContinents } from '../service/repo/countries.api.repo';
import { useQuery } from '@tanstack/react-query';

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

// eslint-disable-next-line no-unused-vars
export const useContinentsList = () => {
  const results = useQuery(['continent'], queryContinents);

  if (results.isLoading) {
    return { continents: [] };
  }

  const continents = results.data === undefined ? [] : results.data;
  return {
    continents,
  };
};
