import { act, render, screen } from '@testing-library/react';
// TEMP import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useRegionLists } from './use.regions.list';
import { queryRegions } from '../service/repo/countries.api.repo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('../service/repo/countries.api.repo');

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
    });
  });

  describe('When is used in a component with a valid argument', () => {
    beforeEach(() => {
      (queryRegions as jest.Mock).mockResolvedValue(['Region']);
    });
    beforeEach(async () => {
      await renderElement('TestContinent');
    });

    test('Then it should render 1 region', async () => {
      expect(queryRegions).toHaveBeenCalled();
      const element = await screen.findByText('Regions: 1');
      expect(element).toBeInTheDocument();
    });
  });
});
