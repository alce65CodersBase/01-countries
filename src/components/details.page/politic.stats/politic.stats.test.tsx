import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PoliticStats } from './politic.stats';
import { Car, FullCountry } from '../../../models/country';
describe('Given PoliticStats component rendered ', () => {
  describe('When it receive', () => {
    const country = {
      status: '',
      independent: true,
      unMember: true,
      landlocked: true,
      startOfWeek: '',
      car: { signs: [''], side: '' } as Car,
    } as unknown as FullCountry;
    render(<PoliticStats {...country}></PoliticStats>);
    const element = screen.getByRole('heading');
    test('Then it should render the component', () => {
      expect(element).toBeInTheDocument();
    });
  });
});
