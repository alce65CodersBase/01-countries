import { SyntheticEvent, useEffect, useState } from 'react';
import { CONTINENTS } from '../../config';
import { searchParams, formGroup, results } from './search.params.module.scss';
import {
  getBaseCountriesByContinent,
  getBaseCountriesByLanguage,
  getBaseCountriesByRegion,
  getContinents,
} from '../../service/repo/countries.api.repo';
import { BaseCountry } from '../../models/country';
import { ListCountries } from '../list.countries/list.countries';
import { useRegionLists } from '../../hooks/use.regions.list';

export const SearchParams = () => {
  // Controlled form for get language, continent & region
  const [language, setLanguage] = useState('any');
  const [continent, setContinent] = useState('');
  const [region, setRegion] = useState('');

  const [continents, setContinents] = useState(CONTINENTS);
  const { regions, status } = useRegionLists(continent);
  const [countries, setCountries] = useState<BaseCountry[]>([]);

  const searchCountries = async (
    language: string,
    continent: string,
    region: string
  ) => {
    let languageResult: BaseCountry[] = [];
    if (language && language !== 'any') {
      languageResult = await getBaseCountriesByLanguage(language);
    }

    if (continent && !region) {
      if (languageResult.length) {
        return languageResult.filter((item) => item.continent === continent);
      }

      return getBaseCountriesByContinent(continent);
    }

    if (region) {
      if (languageResult.length) {
        return languageResult.filter((item) => item.region === region);
      }

      return getBaseCountriesByRegion(region);
    }

    return languageResult;
  };

  const handleSubmit = async (ev: SyntheticEvent) => {
    ev.preventDefault();
    setCountries(await searchCountries(language, continent, region));
  };

  const loadContinents = async () => {
    const continents = await getContinents();
    setContinents(continents);
  };

  useEffect(() => {
    loadContinents();
  }, []);

  return (
    <section className={searchParams}>
      <header>
        <form onSubmit={handleSubmit}>
          <div className={formGroup}>
            <label htmlFor="">Language</label>
            <input
              name="language"
              value={language}
              onChange={(ev: SyntheticEvent) => {
                setLanguage((ev.target as HTMLInputElement).value);
              }}
            />
          </div>
          <div className={formGroup}>
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
          <div className={formGroup}>
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
          <div className={formGroup}>
            <button>Buscar</button>
          </div>
        </form>

        <div className={results}>
          <h2>Results</h2>
          {status === 'loading' && <p>Loading...</p>}
          <ul>
            <li>{continent}</li>
            <li>{region}</li>
            <li>{language}</li>
          </ul>
        </div>
      </header>

      <ListCountries countries={countries}></ListCountries>
    </section>
  );
};
