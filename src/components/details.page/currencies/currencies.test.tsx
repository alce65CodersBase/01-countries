import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Currencies } from './currencies';
import { CountryCurrencies, FullCountry } from '../../../models/country';
describe('Given Currencies component rendered ', () => {
  describe('When it receive', () => {
    const country = {
      currencies: {
        key: { name: '', symbol: '' },
      } as CountryCurrencies,
    } as FullCountry;
    render(<Currencies {...country}></Currencies>);
    const element = screen.getByRole('heading');
    test('Then it should render the component', () => {
      expect(element).toBeInTheDocument();
    });
  });
});
