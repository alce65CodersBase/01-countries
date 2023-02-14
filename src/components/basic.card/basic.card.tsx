import { BaseCountry } from '../../models/country';
import { card } from './basic.card.module.scss';

type BasicCardProps = {
  country: BaseCountry;
};

export function BasicCard({ country }: BasicCardProps) {
  return (
    <article className={card}>
      <h2>
        {country.name}
        <img src={country.flag} alt={country.name + ' flag'} />
      </h2>
      <p>{country.capital}</p>
    </article>
  );
}
