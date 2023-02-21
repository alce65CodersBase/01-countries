import { FullCountry } from '../../../models/country';
import { politicStatsSection } from './politic.stats.module.scss';

export function PoliticStats({
  status,
  independent,
  unMember,
  landlocked,
  startOfWeek,
  car,
}: FullCountry) {
  return (
    <section className={politicStatsSection}>
      <h3>Political stats</h3>
      <p>Status: {status}</p>
      <p>{independent && 'Independent'}</p>
      <p>{unMember && 'UN Member'}</p>
      <p>{landlocked && 'landlocked'}</p>
      <p>startOfWeek {startOfWeek}</p>
      <p>Car signs</p>
      <ul>
        {Array.isArray(car.signs) &&
          car.signs.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <p>Car side: {car.side}</p>
    </section>
  );
}
