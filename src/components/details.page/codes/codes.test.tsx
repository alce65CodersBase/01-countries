import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Codes } from './codes';
import { FullCountry } from '../../../models/country';
describe('Given Codes component rendered ', () => {
  const country = {
    cca2: '',
    cca3: '',
    ccn3: '',
    cioc: '',
    fifa: '',
    tld: [''],
    idd: { root: '', suffixes: [''] },
  } as FullCountry;
  describe('When it receive the country codes', () => {
    render(<Codes {...country}></Codes>);
    const element = screen.getByRole('heading');
    test('Then it should render the component...', () => {
      expect(element).toBeInTheDocument();
    });
  });
});
