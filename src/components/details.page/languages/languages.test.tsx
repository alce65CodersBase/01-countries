import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Languages } from './languages';
import { FullCountry } from '../../../models/country';
describe('Given Languages component rendered ', () => {
  describe('When it receive', () => {
    const country = {
      languages: { key: '' },
    } as unknown as FullCountry;
    render(<Languages {...country}></Languages>);
    const element = screen.getByRole('heading');
    test('Then it should render the component', () => {
      expect(element).toBeInTheDocument();
    });
  });
});
