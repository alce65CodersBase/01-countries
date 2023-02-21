import { useEffect, useState } from 'react';
import { CONTINENTS } from '../config';
import { getContinents } from '../service/repo/countries.api.repo';

export const useContinents = () => {
  const [continents, setContinents] = useState(CONTINENTS);
  const loadContinents = async () => {
    const continents = await getContinents();
    setContinents(continents);
  };

  useEffect(() => {
    loadContinents();
  }, []);

  return {
    continents,
  };
};
