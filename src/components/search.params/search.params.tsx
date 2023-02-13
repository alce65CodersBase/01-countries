import { SyntheticEvent, useEffect, useState } from 'react';
import { CONTINENTS } from '../../config';

import './search.params.scss';
import {
  getContinents,
  getRegions,
} from '../../service/repo/countries.api.repo';

export const SearchParams = () => {
  // Controlled form for get language, continent & region
  const [language, setLanguage] = useState('any');
  const [continent, setContinent] = useState('');
  const [region, setRegion] = useState('');

  const [continents, setContinents] = useState(CONTINENTS);
  const [regions, setRegions] = useState<string[]>([]);

  const handleSubmit = (ev: SyntheticEvent) => {
    ev.preventDefault();
  };

  const loadContinents = async () => {
    setContinents(await getContinents());
  };

  const loadRegions = async (continent: string) => {
    if (!continent) return;
    setRegions(await getRegions(continent));
  };

  useEffect(() => {
    loadContinents();
  }, []);

  useEffect(() => {
    loadRegions(continent);
  }, [continent]);

  return (
    <div className="search-params">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Language</label>
          <input
            name="language"
            value={language}
            onChange={(ev: SyntheticEvent) => {
              setLanguage((ev.target as HTMLInputElement).value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="continent">Continente</label>
          <select
            id="continent"
            name="continent"
            value={continent}
            onChange={(ev: SyntheticEvent) => {
              setContinent((ev.target as HTMLInputElement).value);
            }}
          >
            <option></option>
            {continents.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="region">Region</label>
          <select
            name="region"
            value={region}
            onChange={(ev: SyntheticEvent) => {
              setRegion((ev.target as HTMLInputElement).value);
            }}
            disabled={!regions.length}
          >
            <option></option>
            {regions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <button>Buscar</button>
        </div>
      </form>

      <h2>Results</h2>
      <p>
        {continent} - {region} - {language}
      </p>
    </div>
  );
};
