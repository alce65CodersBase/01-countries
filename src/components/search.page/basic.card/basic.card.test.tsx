import { MemoryRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BasicCard } from './basic.card';
import { BaseCountry } from '../../../models/country';

const mockCountry: BaseCountry = {
  id: 'cu',
  name: 'Cuba',
  capital: 'Havana',
  flag: '',
  continent: '',
  region: '',
};

describe('Given BasicCard component rendered', () => {
  render(
    <Router>
      <BasicCard country={mockCountry}></BasicCard>
    </Router>
  );
  describe('When is receive a country by props', () => {
    test('Then it should display country info', () => {
      const elements = [
        screen.getByText(mockCountry.name),
        screen.getByText(mockCountry.capital),
      ];
      expect(elements[0]).toBeInTheDocument();
      expect(elements[1]).toBeInTheDocument();
    });
  });
});
