import { FullCountry } from '../../../models/country';
import { languagesCollection } from '../../../service/repo/countries.api.repo';
import { translationsSection } from './translations.module.scss';

export function Translations({ translations }: FullCountry) {
  return (
    <section className={translationsSection}>
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
}
