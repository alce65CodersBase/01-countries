import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Details } from './details';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryCountry } from '../../../service/repo/countries.api.repo';
import { Symbol } from '../symbol/symbol';
import { Map } from '../map/map';
import { Naming } from '../naming/naming';
import { Codes } from '../codes/codes';
import { Capital } from '../capital/capital';
import { Coordinates } from '../coordinates/coordinates';
import { Localization } from '../localization/localization';
import { Currencies } from '../currencies/currencies';
import { Languages } from '../languages/languages';
import { GeoStats } from '../geo.stats/geo.stats';
import { PoliticStats } from '../politic.stats/politic.stats';
import { Translations } from '../translations/translations';
import { Others } from '../_base/others';
import { FullCountry } from '../../../models/country';

jest.mock('../symbol/symbol');
jest.mock('../map/map');
jest.mock('../naming/naming');
jest.mock('../codes/codes');
jest.mock('../capital/capital');
jest.mock('../coordinates/coordinates');
jest.mock('../localization/localization');
jest.mock('../currencies/currencies');
jest.mock('../languages/languages');
jest.mock('../geo.stats/geo.stats');
jest.mock('../politic.stats/politic.stats');
jest.mock('../translations/translations');
jest.mock('../_base/others');

jest.mock('../../../service/repo/countries.api.repo');

describe('Given Details component rendered ', () => {
  describe('When it is rendered without a param id', () => {
    beforeEach(() => {
      render(
        <Router>
          <Details></Details>
        </Router>
      );
    });
    test('Then it should not display any', () => {
      const element = screen.queryByRole('heading');
      expect(element).toBe(null);
    });
  });

  describe('When it is rendered with a param id', () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
          cacheTime: Infinity,
        },
      },
    });
    beforeEach(() => {
      (queryCountry as jest.Mock).mockResolvedValue({} as FullCountry);

      render(
        <Router initialEntries={['/details/cu']} initialIndex={0}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/details/:id" element={<Details></Details>}></Route>
            </Routes>
          </QueryClientProvider>
        </Router>
      );
    });
    test('Then it should render the component header', () => {
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
      expect(Symbol).not.toHaveBeenCalled();
      expect(Map).not.toHaveBeenCalled();
      expect(Naming).not.toHaveBeenCalled();
      expect(Codes).not.toHaveBeenCalled();
      expect(Capital).not.toHaveBeenCalled();
      expect(Coordinates).not.toHaveBeenCalled();
      expect(Localization).not.toHaveBeenCalled();
      expect(Currencies).not.toHaveBeenCalled();
      expect(Languages).not.toHaveBeenCalled();
      expect(GeoStats).not.toHaveBeenCalled();
      expect(PoliticStats).not.toHaveBeenCalled();
      expect(Translations).not.toHaveBeenCalled();
      expect(Others).not.toHaveBeenCalled();
    });
  });
});
