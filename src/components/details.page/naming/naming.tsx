import { FullCountry } from '../../../models/country';
import { languagesCollection } from '../../../service/repo/countries.api.repo';
import { naming } from './naming.module.scss';

export function Naming({ name, altSpellings }: FullCountry) {
  return (
    <section className={naming}>
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
        {name.nativeName &&
          Object.entries(name.nativeName).map((item) => (
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
}
