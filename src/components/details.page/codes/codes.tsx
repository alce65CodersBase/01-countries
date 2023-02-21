import { FullCountry } from '../../../models/country';
import { codes } from './codes.module.scss';

export function Codes({ cca2, cca3, ccn3, cioc, fifa, tld, idd }: FullCountry) {
  return (
    <section className={codes}>
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
            {Array.isArray(tld) &&
              tld.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </li>
        {idd && (
          <li>
            IDD : {idd.root}
            <span> | suffixes: </span>
            <span>
              {Array.isArray(idd.suffixes) &&
                idd.suffixes.map((item) => <span key={item}>{item}, </span>)}
            </span>
            <small>(international direct dialing)</small>
          </li>
        )}
      </ul>
    </section>
  );
}
