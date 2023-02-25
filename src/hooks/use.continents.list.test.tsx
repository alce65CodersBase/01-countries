import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as reactQuery from '@tanstack/react-query';
import { act, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useContinentsList } from './use.continents.list';
import { queryContinents } from '../service/repo/countries.api.repo';

jest.mock('../service/repo/countries.api.repo');
const spyUseQuery = jest.spyOn(reactQuery, 'useQuery');
const queryClient = new QueryClient();

describe('Given useContinentsList hook', () => {
  beforeEach(() => {
    (queryContinents as jest.Mock).mockResolvedValue(['Continent']);
  });
  describe('When is used in a test component', () => {
    beforeEach(async () => {
      const TestComponent = () => {
        useContinentsList();
        return <></>;
      };

      await act(async () => {
        render(
          <QueryClientProvider client={queryClient}>
            <TestComponent></TestComponent>
          </QueryClientProvider>
        );
      });
    });
    test('Then it should call a repo function', () => {
      expect(spyUseQuery).toHaveBeenCalled();
      expect(queryContinents).toHaveBeenCalled();
    });
  });

  describe(`When is used in a test component
        and de useQuery NOT return a valid result`, () => {
    beforeEach(() => {
      spyUseQuery.mockReturnValue({
        data: null,
        isLoading: false,
      } as reactQuery.UseQueryResult);
    });
    beforeEach(async () => {
      const TestComponent = () => {
        useContinentsList();
        return <></>;
      };

      await act(async () => {
        render(
          <QueryClientProvider client={queryClient}>
            <TestComponent></TestComponent>
          </QueryClientProvider>
        );
      });
    });
    test('Then it should call a repo function', () => {
      expect(spyUseQuery).toHaveBeenCalled();
      expect(queryContinents).toHaveBeenCalled();
    });
  });
});
