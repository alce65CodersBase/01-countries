import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ListCountries } from './list.countries';
import { BasicCard } from '../basic.card/basic.card';
import { BaseCountry } from '../../models/country';

jest.mock('../basic.card/basic.card');
describe('Given ListCountries component rendered', () => {
  describe('When it recibe an array of countries', () => {
    beforeEach(() => {
      render(
        <ListCountries
          countries={[{ id: 1 } as unknown as BaseCountry]}
        ></ListCountries>
      );
    });
    test('Then it should display a lists', () => {
      const element = screen.getByRole('list');
      expect(element).toBeInTheDocument();
    });
    test('Then it should display the country component for the array element', () => {
      expect(BasicCard).toHaveBeenCalled();
    });
  });
  describe('When it recibe and empty array', () => {
    beforeEach(() => {
      render(<ListCountries countries={[]}></ListCountries>);
    });
    test('Then it should display a message', () => {
      const element = screen.queryByText(/No countries/i);
      expect(element).toBeInTheDocument();
    });
  });
});
