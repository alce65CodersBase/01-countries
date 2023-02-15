import { BaseCountry } from '../../models/country';
import { BasicCard } from '../basic.card/basic.card';
import { countriesList } from './list.countries.module.scss';

type ListCountriesProps = { countries: BaseCountry[] };
export function ListCountries({ countries }: ListCountriesProps) {
  return (
    <ul className={countriesList}>
      {countries.map((item) => (
        <li key={item.id}>
          <BasicCard country={item}></BasicCard>
        </li>
      ))}
    </ul>
  );
}
