import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FullCountry } from '../../../models/country';
import { queryCountry } from '../../../service/repo/countries.api.repo';
import { Symbol } from '../symbol/symbol';
import { Map } from '../map/map';
import { Naming } from '../naming/naming';
import { Codes } from '../codes/codes';
import { Capital } from '../capital/capital';
import { Coordinates } from '../coordinates/coordinates';
import { Localization } from '../localization/localization';
import { Currencies } from '../currencies/currencies';
import { Languages } from '../languages/languages';
import { GeoStats } from '../geo.stats/geo.stats';
import { PoliticStats } from '../politic.stats/politic.stats';
import { Translations } from '../translations/translations';
import { Others } from '../others/others';
import { countryCard, countryId, map } from './details.module.scss';

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

  const countries = results.data;
  if (countries === undefined) return <p>No country found</p>;
  const country: FullCountry = countries[0];
  const title = country.name.common;

  console.log({ country });

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
      <article className="country">
        <Naming {...country}></Naming>
        <div className="flag">
          <Symbol source={country.flags} classCSS="large"></Symbol>
        </div>
        <Codes {...country}></Codes>
        <div className="arms">
          <Symbol source={country.coatOfArms} classCSS="large"></Symbol>
        </div>
        <Capital {...country}>
          <Coordinates latLng={country.capitalInfo.latlng}></Coordinates>
        </Capital>
        <Localization {...country}>
          <Coordinates latLng={country.latlng}></Coordinates>
        </Localization>
        <Currencies {...country}></Currencies>
        <Languages {...country}></Languages>
        <div className={map}>
          <Map
            url={country.maps.openStreetMaps}
            source="Open Street Maps"
            latLng={country.latlng}
            country={country.name.common}
            area={country.area}
          ></Map>
        </div>
        <GeoStats {...country}></GeoStats>
        <PoliticStats {...country}></PoliticStats>
        <div className={map}>
          <Map
            url={country.maps.googleMaps}
            source="Google Maps"
            latLng={country.latlng}
            country={country.name.common}
            area={country.area}
          ></Map>
        </div>
        <Others {...country}></Others>
        <Translations {...country}></Translations>
      </article>
    </section>
  );
}
