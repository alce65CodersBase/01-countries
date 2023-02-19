import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Naming } from './naming';
import { FullCountry, CountryName } from '../../../models/country';
describe('Given Naming component rendered ', () => {
  const country = {
    name: {
      common: '',
      official: '',
      nativeName: { any: { common: '', official: '' } },
    } as CountryName,
    altSpellings: [''],
  } as FullCountry;
  describe('When it receive a name object and the altSpellings array', () => {
    render(<Naming {...country}></Naming>);
    const element = screen.getByRole('heading');
    test('Then it should render the component', () => {
      expect(element).toBeInTheDocument();
    });
  });
});
