import { FullCountry } from '../../../models/country';
import { othersSection } from './others.module.scss';

export function Others({ postalCode, gini }: FullCountry) {
  return (
    <section className={othersSection}>
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
}
