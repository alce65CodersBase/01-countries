import { SyntheticEvent, useState } from 'react';
import { searchParams, formGroup, results } from './search.params.module.scss';
import { searchCountries } from '../../../service/repo/countries.api.repo';
import { BaseCountry } from '../../../models/country';
import { ListCountries } from '../list.countries/list.countries';
import { LanguageInput } from '../language.input/language.input';
import { useRegionLists } from '../../../hooks/use.regions.list';
import { useContinentsList } from '../../../hooks/use.continents.list';

export const SearchParams = () => {
  // Controlled form for get language, continent & region
  const [language, setLanguage] = useState('');
  const [continent, setContinent] = useState('');
  const [region, setRegion] = useState('');

  const { continents } = useContinentsList();
  const { regions, status } = useRegionLists(continent);
  const [countries, setCountries] = useState<BaseCountry[]>([]);

  const handleLanguage = (language: string) => {
    setLanguage(language);
  };

  const handleSubmit = async (ev: SyntheticEvent) => {
    ev.preventDefault();
    setCountries(await searchCountries(language, continent, region));
  };

  return (
    <section className={searchParams}>
      <header>
        <form onSubmit={handleSubmit}>
          <div className={formGroup}>
            <LanguageInput
              language={language}
              handleLanguage={handleLanguage}
            ></LanguageInput>
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
