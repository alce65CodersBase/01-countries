import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
// TEMP import userEvent from '@testing-library/user-event';
import { useContinentsList } from './use.continents.list';
import { getContinents } from '../service/repo/countries.api.repo';

jest.mock('../service/repo/countries.api.repo');

describe('Given useContinentsList hook', () => {
  describe('When is used in a test component', () => {
    const TestComponent = () => {
      useContinentsList();
      return <></>;
    };

    render(<TestComponent></TestComponent>);
    test('Then it should call a repo function', () => {
      expect(getContinents).toHaveBeenCalled();
    });
  });
});
