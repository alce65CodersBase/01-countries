import { BaseCountry } from '../../models/country';
import { BasicCard } from '../basic.card/basic.card';
import { countriesList, noCountries } from './list.countries.module.scss';

type ListCountriesProps = { countries: BaseCountry[] };
export function ListCountries({ countries }: ListCountriesProps) {
  return (
    <>
      {' '}
      {countries.length ? (
        <ul className={countriesList}>
          {countries.map((item) => (
            <li key={item.id}>
              <BasicCard country={item}></BasicCard>
            </li>
          ))}
        </ul>
      ) : (
        <p className={noCountries}>No countries: start a search</p>
      )}
    </>
  );
}
