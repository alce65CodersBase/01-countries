import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as reactQuery from '@tanstack/react-query';
import {
  Route,
  MemoryRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Details } from './details';
import { Symbol } from '../symbol/symbol';
import { Map } from '../map/map';
import { Naming } from '../naming/naming';
import { Codes } from '../codes/codes';
import { Capital } from '../capital/capital';
import { Localization } from '../localization/localization';
import { Currencies } from '../currencies/currencies';
import { Languages } from '../languages/languages';
import { GeoStats } from '../geo.stats/geo.stats';
import { PoliticStats } from '../politic.stats/politic.stats';
import { Translations } from '../translations/translations';
import { Others } from '../others/others';
import { FullCountry } from '../../../models/country';
import { queryCountry } from '../../../service/repo/countries.api.repo';

jest.mock('../symbol/symbol');
jest.mock('../map/map');
jest.mock('../naming/naming');
jest.mock('../codes/codes');
jest.mock('../capital/capital');
jest.mock('../localization/localization');
jest.mock('../currencies/currencies');
jest.mock('../languages/languages');
jest.mock('../geo.stats/geo.stats');
jest.mock('../politic.stats/politic.stats');
jest.mock('../translations/translations');
jest.mock('../others/others');

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  Navigate: jest.fn(),
}));

jest.mock('../../../service/repo/countries.api.repo');
const spyUseQuery = jest.spyOn(reactQuery, 'useQuery');
const queryClient = new QueryClient();

const validRender = async (id?: string) => {
  const entries = [id ? `/details/${id}` : '/details'];
  await act(async () => {
    render(
      <Router initialEntries={entries} initialIndex={0}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/details/:id" element={<Details></Details>}></Route>
            <Route path="/details" element={<Details></Details>}></Route>
          </Routes>
        </QueryClientProvider>
      </Router>
    );
  });
};

describe('Given Details component rendered ', () => {
  describe('When it is rendered without a param id', () => {
    beforeEach(() => {
      validRender();
    });
    test('Then it should not display any', () => {
      const element = screen.queryByRole('heading');
      expect(element).toBe(null);
      expect(Navigate).toHaveBeenCalled();
    });
  });

  describe('When it is rendered with a valid param id', () => {
    beforeEach(async () => {
      (queryCountry as jest.Mock).mockResolvedValue([
        {
          name: {
            common: 'Any name',
          },
          capitalInfo: {},
          maps: {},
        },
      ] as unknown as FullCountry[]);
      await validRender('cu');
    });
    test(`Then it should render the article
            and call all the included components`, async () => {
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
      const article = await screen.findByRole('article');
      expect(article).toBeInTheDocument();
      expect(Naming).toHaveBeenCalled();
      expect(Symbol).toHaveBeenCalled();
      expect(Map).toHaveBeenCalled();
      expect(Codes).toHaveBeenCalled();
      expect(Capital).toHaveBeenCalled();
      expect(Localization).toHaveBeenCalled();
      expect(Currencies).toHaveBeenCalled();
      expect(Languages).toHaveBeenCalled();
      expect(GeoStats).toHaveBeenCalled();
      expect(PoliticStats).toHaveBeenCalled();
      expect(Translations).toHaveBeenCalled();
      expect(Others).toHaveBeenCalled();
    });
  });

  describe(`When it is rendered with a valid param id
              and the query return is invalid`, () => {
    beforeEach(async () => {
      (queryCountry as jest.Mock).mockResolvedValue([]);
      spyUseQuery.mockReturnValue({
        data: null,
        isLoading: false,
      } as reactQuery.UseQueryResult);
      await validRender('cu');
    });
    test('It should no render anything', async () => {
      const message = await screen.findByText('No country found');
      expect(message).toBeInTheDocument();
    });
  });
});
