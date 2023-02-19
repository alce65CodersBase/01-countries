import { FullCountry } from '../../../models/country';
import { languagesCollection } from '../../../service/repo/countries.api.repo';
import { geoStatsSection } from './geo.stats.module.scss';

export function GeoStats({
  area,
  population,
  timezones,
  demonyms,
}: FullCountry) {
  return (
    <section className={geoStatsSection}>
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
}
