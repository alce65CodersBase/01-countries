import { SyntheticEvent, useEffect, useState } from 'react';
import { CONTINENTS } from '../../config';
import { searchParams, formGroup, results } from './search.params.module.scss';
import {
  getBaseCountriesByContinent,
  getBaseCountriesByLanguage,
  getBaseCountriesByRegion,
  getContinents,
  getRegions,
} from '../../service/repo/countries.api.repo';
import { BaseCountry } from '../../models/country';
import { ListCountries } from '../list.countries/list.countries';

export const SearchParams = () => {
  // Controlled form for get language, continent & region
  const [language, setLanguage] = useState('any');
  const [continent, setContinent] = useState('');
  const [region, setRegion] = useState('');

  const [continents, setContinents] = useState(CONTINENTS);
  const [regions, setRegions] = useState<string[]>([]);
  const [countries, setCountries] = useState<BaseCountry[]>([]);

  const handleSubmit = async (ev: SyntheticEvent) => {
    ev.preventDefault();
    let languageResult: BaseCountry[] = [];
    if (language && language !== 'any') {
      languageResult = await getBaseCountriesByLanguage(language);
    }

    if (continent && !region) {
      if (languageResult.length) {
        setCountries(
          languageResult.filter((item) => item.continent === continent)
        );
      } else {
        setCountries(await getBaseCountriesByContinent(continent));
      }
    } else if (region) {
      if (languageResult.length) {
        setCountries(languageResult.filter((item) => item.region === region));
      } else {
        setCountries(await getBaseCountriesByRegion(region));
      }
    } else {
      setCountries(languageResult);
    }
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
