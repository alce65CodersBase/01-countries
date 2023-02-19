import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FullCountry } from '../../models/country';
import { queryCountry } from '../../service/repo/countries.api.repo';
import { countryCard, countryId } from './details.module.scss';

export function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!id) {
    navigate('/', { replace: true });
    return <></>;
  }

  // NO useQUERY
  // const [country, setCountry] = useState<FullCountry | null>(null);
  // const [title, setTitle] = useState('');

  // useEffect(() => {
  //   const loadCountry = async () => {
  //     if (!id) return navigate('/', { replace: true });
  //     const countryData = await getCountryById(id);
  //     setCountry(countryData);
  //     setTitle(countryData.name.common);
  //   };

  //   loadCountry();
  // });

  const results = useQuery(['details', id], queryCountry);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const country: FullCountry = results.data[0];
  const title = country.name.common;

  return (
    <section className={countryCard}>
      <header>
        <h2>
          <span>
            {title} <span className={countryId}>[{id}]</span>
          </span>
          <Link to="/">Back</Link>
        </h2>
      </header>
      {country === null ? <></> : <article className="country"></article>}
    </section>
  );
}
