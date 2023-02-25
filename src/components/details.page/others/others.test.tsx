import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Others } from './others';
import { FullCountry, Gini, PostalCode } from '../../../models/country';
describe('Given Others component rendered ', () => {
  describe('When it receive', () => {
    const country = {
      postalCode: { format: '', regex: '' } as PostalCode,
      gini: { key: 0 } as Gini,
    } as FullCountry;
    render(<Others {...country}></Others>);
    const element = screen.getByRole('heading');
    test('Then it should render the component', () => {
      expect(element).toBeInTheDocument();
    });
  });
});
