import { FullCountry } from '../../../models/country';
import { localization, bordersGrid } from './localization.module.scss';

export function Localization({
  region,
  subregion,
  borders,
  children,
}: FullCountry & { children: globalThis.JSX.Element }) {
  return (
    <section className={localization}>
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
      {children}
    </section>
  );
}
