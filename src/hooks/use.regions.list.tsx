import { useState, useEffect } from 'react';
import { getRegions } from '../service/repo/countries.api.repo';

const localCache: { [key: string]: any } = {};

export const useRegionLists = (continent: string) => {
  const [regions, setRegions] = useState<string[]>([]);

  // Tracking status is very useful for the test
  const [status, setStatus] = useState('unloaded');

  const loadRegions = async (continent: string) => {
    setRegions([]);
    setStatus('loading');
    const regions = await getRegions(continent);
    localCache[continent] = regions;
    setRegions(localCache[continent]);
    setStatus('loaded');
  };

  useEffect(() => {
    if (!continent) {
      setRegions([]);
    } else if (localCache[continent]) {
      setRegions(localCache[continent]);
    } else {
      loadRegions(continent);
    }
  }, [continent]);

  return {
    regions,
    status,
  };
};
