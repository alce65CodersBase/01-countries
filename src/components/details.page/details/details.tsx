import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FullCountry } from '../../../models/country';
import {
  languagesCollection,
  queryCountry,
} from '../../../service/repo/countries.api.repo';
import { Symbol } from '../symbol/symbol';
import { Map } from '../map/map';
import {
  countryCard,
  countryId,
  bordersGrid,
  map,
} from './details.module.scss';

const naming = ({ name, altSpellings }: FullCountry) => (
  <section className="naming">
    <h3>Names</h3>
    <details>
      <summary>
        <strong>{name.common}</strong>
      </summary>
      <ul>
        {altSpellings.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </details>
    <p>
      Official: <strong>{name.official}</strong>
    </p>
    <div>
      {Object.entries(name.nativeName).map((item) => (
        <div key={item[0]}>
          <p>Native name in {languagesCollection[item[0]]}: </p>
          <ul>
            <li>Common: {item[1].common}</li>
            <li>Official:{item[1].official}</li>
          </ul>
        </div>
      ))}
    </div>
  </section>
);
const codes = ({ cca2, cca3, ccn3, cioc, fifa, tld, idd }: FullCountry) => (
  <section className="codes">
    <h3>Codes</h3>
    <ul>
      <li>cca2: {cca2}</li>
      <li>cca3: {cca3}</li>
      <li>ccn3: {ccn3}</li>
      <li>cioc: {cioc}</li>
      <li>fifa: {fifa}</li>
      <li>
        Top-level domains:
        <ul>
          {tld.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </li>
      <li>
        IDD : {idd.root}
        <span> | suffixes: </span>
        <span>
          {idd.suffixes.map((item) => (
            <span key={item}>{item}, </span>
          ))}
        </span>
        <small>(international direct dialing)</small>
      </li>
    </ul>
  </section>
);

const coordinates = (latLng: number[]) => (
  <dl>
    <dt>Latitude</dt>
    <dd>{latLng[0].toString()}</dd>
    <dt>Longitude</dt>
    <dd>{latLng[1].toString()}</dd>
  </dl>
);

const capital = ({ capital, capitalInfo }: FullCountry) => (
  <section className="capital">
    <h3>Capital</h3>
    <ul>
      {capital.map((item) => (
        <li key={item}>
          <strong>{item}</strong>
        </li>
      ))}
    </ul>
    <br />
    <p>Capital coordinates</p>
    {coordinates(capitalInfo.latlng)}
  </section>
);

const localization = ({ region, subregion, borders, latlng }: FullCountry) => (
  <section className="localization">
    <h3>Localization</h3>
    <p>
      Continent: <strong>{region}</strong>
    </p>
    <p>
      Region: <strong> {subregion}</strong>
    </p>
    <p>Borders</p>
    <ul className={bordersGrid}>
      {borders && borders.map((item) => <li key={item}>{item}</li>)}
    </ul>
    <p>Coordinates</p>
    {coordinates(latlng)}
  </section>
);

const geoStats = ({ area, population, timezones, demonyms }: FullCountry) => (
  <section className="geo-stats">
    <h3>Geographical Stats</h3>
    <p>Area: {area.toLocaleString()}</p>
    <p>Population: {population.toLocaleString()}</p>
    <p>Time Zones</p>
    <ul>
      {timezones.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
    {Object.entries(demonyms).map((item) => (
      <div key={item[0]}>
        <p className="Key">Demonyms in {languagesCollection[item[0]]}:</p>
        <ul>
          <li>male: {item[1].m}</li>
          <li>female:{item[1].f}</li>
        </ul>
      </div>
    ))}
  </section>
);

const politicalStats = ({
  status,
  independent,
  unMember,
  landlocked,
  startOfWeek,
  car,
}: FullCountry) => (
  <section className="p-stats">
    <h3>Political stats</h3>
    <p>Status: {status}</p>
    <p>{independent && 'Independent'}</p>
    <p>{unMember && 'UN Member'}</p>
    <p>{landlocked && 'landlocked'}</p>
    <p>startOfWeek {startOfWeek}</p>
    <p>Car signs</p>
    <ul>
      {car.signs.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
    <p>Car side: {car.side}</p>
  </section>
);

const currencies = ({ currencies }: FullCountry) => (
  <section className="currencies">
    <h3>Currencies</h3>
    {Object.entries(currencies).map((item) => (
      <div key={item[0]}>
        <p className="Key">{item[0].toUpperCase()}:</p>
        <ul>
          <li>Common: {item[1].name}</li>
          <li>Official:{item[1].symbol}</li>
        </ul>
      </div>
    ))}
  </section>
);

const languages = ({ languages }: FullCountry) => (
  <section className="languages">
    <h3>Languages</h3>
    {Object.entries(languages).map((item) => (
      <p key={item[0]}>
        <span className="Key">{item[0].toUpperCase()}: </span>
        <span>{item[1]}</span>
      </p>
    ))}
  </section>
);

// eslint-disable-next-line no-unused-vars
const maps = ({ maps }: FullCountry) => (
  <section className="maps">
    <h3>Maps</h3>
    <p>
      <a href={maps.googleMaps} rel="noreferrer" target="_blank">
        Google Maps
      </a>
    </p>
    <p>
      <a href={maps.openStreetMaps} rel="noreferrer" target="_blank">
        OpenStreet Maps
      </a>
    </p>
  </section>
);

const others = ({ postalCode, gini }: FullCountry) => (
  <section>
    <h3>Others</h3>
    <p>Postal Code</p>
    <ul>
      <li>Format: {postalCode.format}</li>
      <li>Regex: {postalCode.regex}</li>
    </ul>
    {gini && (
      <>
        <p>Gini</p>
        <ul>
          {Object.entries(gini).map((item) => (
            <li key={item[0]}>
              <span className="year">{item[0]}: </span>
              <span>{item[1]}</span>
            </li>
          ))}
        </ul>
      </>
    )}
  </section>
);

const translations = ({ translations }: FullCountry) => (
  <section className="translations">
    <h3>Translations</h3>
    {Object.entries(translations).map((item) => (
      <details key={item[0]}>
        <summary className="lang">
          {languagesCollection[item[0]]} ({item[0]}):{' '}
        </summary>
        <dl>
          <dt>Common</dt>
          <dd>{item[1].common}</dd>
          <dt>Official</dt>
          <dd>{item[1].official}</dd>
        </dl>
      </details>
    ))}
  </section>
);

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
      {country === null ? (
        <></>
      ) : (
        <article className="country">
          {naming(country)}
          <div className="flag">
            <Symbol source={country.flags} classCSS="large"></Symbol>
          </div>
          {codes(country)}
          <div className="arms">
            <Symbol source={country.coatOfArms} classCSS="large"></Symbol>
          </div>
          {capital(country)}
          {localization(country)}
          {currencies(country)}
          {languages(country)}
          <div className={map}>
            <Map
              url={country.maps.openStreetMaps}
              source="Open Street Maps"
              latLng={country.latlng}
              country={country.name.common}
              area={country.area}
            ></Map>
          </div>
          {geoStats(country)}
          {politicalStats(country)}
          <div className={map}>
            <Map
              url={country.maps.googleMaps}
              source="Google Maps"
              latLng={country.latlng}
              country={country.name.common}
              area={country.area}
            ></Map>
          </div>
          {others(country)}
          {translations(country)}
        </article>
      )}
    </section>
  );
}
