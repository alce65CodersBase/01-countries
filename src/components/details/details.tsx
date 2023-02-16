import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FullCountry } from '../../models/country';
import { getCountryById } from '../../service/repo/countries.api.repo';
import { countryCard, countryId } from './details.module.scss';

export function Details() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [country, setCountry] = useState<FullCountry | null>(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const loadCountry = async () => {
      if (!id) return navigate('/', { replace: true });
      const countryData = await getCountryById(id);
      setCountry(countryData);
      setTitle(countryData.name.common);
    };

    loadCountry();
  });

  return (
    <section className={countryCard}>
      <header>
        <h2>
          {title} <span className={countryId}>[{id}]</span>
          <Link to="/">Back</Link>
        </h2>
      </header>
      {country === null ? (
        <></>
      ) : (
        <ul>
          <li>{country.name.common}</li>
          <li>{country.capital}</li>
        </ul>
      )}
    </section>
  );
}
