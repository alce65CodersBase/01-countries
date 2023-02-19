import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Translations } from './translations';
import { FullCountry } from '../../../models/country';
describe('Given Translations component rendered ', () => {
  describe('When it receive', () => {
    const country = {
      translations: {
        key: {
          official: '',
          common: '',
        },
      },
    } as unknown as FullCountry;
    render(<Translations {...country}></Translations>);
    const element = screen.getByRole('heading');
    test('Then it should render the component', () => {
      expect(element).toBeInTheDocument();
    });
  });
});
