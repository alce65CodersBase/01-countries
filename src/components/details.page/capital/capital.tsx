import { FullCountry } from '../../../models/country';
import { capitalSection } from './capital.module.scss';

export function Capital({
  capital,
  children,
}: FullCountry & { children: globalThis.JSX.Element }) {
  return (
    <section className={capitalSection}>
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
      {children}
    </section>
  );
}
