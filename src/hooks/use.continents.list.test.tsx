import { act, render } from '@testing-library/react';
import '@testing-library/jest-dom';
// TEMP import userEvent from '@testing-library/user-event';
import { useContinentsList } from './use.continents.list';
import { queryContinents } from '../service/repo/countries.api.repo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('../service/repo/countries.api.repo');

const queryClient = new QueryClient();

describe('Given useContinentsList hook', () => {
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
      expect(queryContinents).toHaveBeenCalled();
    });
  });

  describe('When is used in a test component // BaD', () => {
    beforeEach(() => {
      (queryContinents as jest.Mock).mockRejectedValue(new Error());
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
      expect(queryContinents).toHaveBeenCalled();
    });
  });
});
