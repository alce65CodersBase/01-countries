import { Link } from 'react-router-dom';
import { BaseCountry } from '../../../models/country';
import { card, countryId } from './basic.card.module.scss';

type BasicCardProps = {
  country: BaseCountry;
};

export function BasicCard({ country }: BasicCardProps) {
  return (
    <article className={card}>
      <h2>
        <Link to={'/details/' + country.id}>{country.name}</Link>
        <img src={country.flag} alt={country.name + ' flag'} />
      </h2>
      <p>
        <span>{country.capital}</span>
        <span className={countryId}>{country.id}</span>
      </p>
    </article>
  );
}
