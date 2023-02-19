import { Flags } from '../../models/country';
import { flag, small, middle, large } from './symbol.module.scss';

type SymbolProps = {
  source: Partial<Flags>;
  classCSS?: string;
};

export function Symbol({ source, classCSS = 'small' }: SymbolProps) {
  if (!source.svg && !source.png) return <></>;

  const cssClasses: { [key: string]: any } = {
    small,
    middle,
    large,
  };

  return (
    <figure className={flag}>
      <img
        className={cssClasses[classCSS]}
        src={source.svg ? source.svg : source.png}
        alt={source.alt || 'Coat of Arms'}
      />
    </figure>
  );
}
