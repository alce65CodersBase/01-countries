import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Capital } from './capital';
import { FullCountry } from '../../../models/country';
describe('Given Capital component rendered ', () => {
  const country = {
    capital: [''],
    capitalInfo: {
      latlng: [0, 0],
    },
  } as FullCountry;
  describe('When it receive the capitals array', () => {
    render(
      <Capital {...country}>
        <></>
      </Capital>
    );
    const element = screen.getByRole('heading');
    test('Then it should render the component', () => {
      expect(element).toBeInTheDocument();
    });
  });
});
