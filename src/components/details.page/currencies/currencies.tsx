import { FullCountry } from '../../../models/country';
import { currenciesSection } from './currencies.module.scss';

export function Currencies({ currencies }: FullCountry) {
  return (
    <section className={currenciesSection}>
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
}
