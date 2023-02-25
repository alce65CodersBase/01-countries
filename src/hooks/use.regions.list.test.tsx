import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as reactQuery from '@tanstack/react-query';
import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRegionLists } from './use.regions.list';
import { queryRegions } from '../service/repo/countries.api.repo';

jest.mock('../service/repo/countries.api.repo');
const spyUseQuery = jest.spyOn(reactQuery, 'useQuery');
const queryClient = new QueryClient();

const renderElement = async (continent: string) => {
  const TestComponent = () => {
    const { regions } = useRegionLists(continent);
    return (
      <>
        <p>Regions: {regions?.length}</p>
      </>
    );
  };

  await act(async () =>
    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent></TestComponent>
      </QueryClientProvider>
    )
  );
};

describe('Given useRegionLists hook', () => {
  describe('When is used in a component with a valid argument', () => {
    beforeEach(() => {
      (queryRegions as jest.Mock).mockResolvedValue(['Region']);
    });
    beforeEach(async () => {
      await renderElement('TestContinent');
    });

    test('Then it should render 1 region', async () => {
      expect(queryRegions).toHaveBeenCalled();
      expect(spyUseQuery).toHaveBeenCalled();
      const element = await screen.findByText('Regions: 1');
      expect(element).toBeInTheDocument();
    });
  });

  describe('When is used in a component with NO valid argument', () => {
    beforeEach(() => {
      (queryRegions as jest.Mock).mockResolvedValue(null);
    });

    beforeEach(async () => {
      await renderElement('');
    });

    test('Then it should render 0 regions', () => {
      const element = screen.getByText('Regions: 0');
      expect(element).toBeInTheDocument();
      expect(queryRegions).toHaveBeenCalled();
      expect(spyUseQuery).toHaveBeenCalled();
    });
  });

  describe(`When is used in a test component
        and de useQuery NOT return a valid result`, () => {
    beforeEach(() => {
      (queryRegions as jest.Mock).mockResolvedValue([]);
      spyUseQuery.mockReturnValue({
        data: null,
        isLoading: false,
      } as reactQuery.UseQueryResult);
    });
    beforeEach(async () => {
      await renderElement('TestContinent');
    });
    test('Then it should render 0 regions', async () => {
      const element = screen.getByText('Regions: 0');
      expect(element).toBeInTheDocument();
      expect(queryRegions).toHaveBeenCalled();
      expect(spyUseQuery).toHaveBeenCalled();
    });
  });
});
