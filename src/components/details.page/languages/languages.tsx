import { FullCountry } from '../../../models/country';
import { languagesSection } from './languages.module.scss';

export function Languages({ languages }: FullCountry) {
  return (
    <section className={languagesSection}>
      <h3>Languages</h3>
      {Object.entries(languages).map((item) => (
        <p key={item[0]}>
          <span className="Key">{item[0].toUpperCase()}: </span>
          <span>{item[1]}</span>
        </p>
      ))}
    </section>
  );
}
