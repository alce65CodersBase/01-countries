import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GeoStats } from './geo.stats';
import { Demonyms, FullCountry } from '../../../models/country';
describe('Given GeoStats component rendered ', () => {
  describe('When it receive', () => {
    const country = {
      area: 0,
      population: 0,
      timezones: [''],
      demonyms: { any: { f: '', m: '' } } as Demonyms,
    } as FullCountry;
    render(<GeoStats {...country}></GeoStats>);
    const element = screen.getByRole('heading');
    test('Then it should render the component', () => {
      expect(element).toBeInTheDocument();
    });
  });
});
