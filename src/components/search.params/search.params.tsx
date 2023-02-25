import { SyntheticEvent, useEffect, useState } from 'react';
import { searchParams, formGroup, results } from './search.params.module.scss';
import {
  getLanguages,
  searchCountries,
} from '../../service/repo/countries.api.repo';
import { BaseCountry } from '../../models/country';
import { ListCountries } from '../list.countries/list.countries';
import { useRegionLists } from '../../hooks/use.regions.list';
import { useContinentsList } from '../../hooks/use.continents.list';

export const SearchParams = () => {
  // Controlled form for get language, continent & region
  const [language, setLanguage] = useState('');

  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allLanguages, setAllLanguages] = useState<string[]>([]);
  const [continent, setContinent] = useState('');
  const [region, setRegion] = useState('');

  const { continents } = useContinentsList();

  const { regions, status } = useRegionLists(continent);
  const [countries, setCountries] = useState<BaseCountry[]>([]);

  const handleSubmit = async (ev: SyntheticEvent) => {
    ev.preventDefault();
    setCountries(await searchCountries(language, continent, region));
  };

  const handleChangeLanguage = (ev: SyntheticEvent) => {
    const { value } = ev.target as HTMLInputElement;
    setLanguage(value);
    if (value.length >= 2) {
      setShowSuggestions(true);
      const validLanguages = allLanguages.filter((item) =>
        Boolean(item.toLowerCase().includes(value.toLowerCase()))
      );
      setFilteredSuggestions(validLanguages);
    } else {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const loadLanguages = async () => {
      setAllLanguages(await getLanguages());
    };

    loadLanguages();
  }, []);

  return (
    <section className={searchParams}>
      <header>
        <form onSubmit={handleSubmit}>
          <div className={formGroup}>
            <label htmlFor="">Language</label>
            <input
              placeholder="Type a language in english"
              name="language"
              list="languages"
              value={language}
              onChange={handleChangeLanguage}
            />
          </div>
          {showSuggestions && (
            <datalist id="languages">
              {filteredSuggestions.map((item) => (
                <option key={item} value={item} />
              ))}
            </datalist>
          )}
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
