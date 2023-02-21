import { act, render, screen } from '@testing-library/react';
// TEMP import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useRegionLists } from './use.regions.list';
import { getRegions } from '../service/repo/countries.api.repo';

jest.mock('../service/repo/countries.api.repo');

const renderElement = async (continent: string) => {
  const TestComponent = () => {
    const { regions } = useRegionLists(continent);
    return (
      <>
        <p>Regions: {regions.length}</p>
      </>
    );
  };

  await act(async () => render(<TestComponent></TestComponent>));
};

describe('Given useRegionLists hook', () => {
  beforeEach(() => {
    (getRegions as jest.Mock).mockReturnValue(['Region']);
  });
  describe('When is used in a component with NO valid argument', () => {
    beforeEach(async () => {
      await renderElement('');
    });

    test('Then it should render 0 regions', () => {
      const element = screen.getByText('Regions: 0');
      expect(element).toBeInTheDocument();
    });
  });

  describe('When is used in a component with a valid argument', () => {
    beforeEach(async () => {
      await renderElement('TestContinent');
    });

    test('Then it should render 1 region', () => {
      expect(getRegions).toHaveBeenCalled();
      const element = screen.getByText('Regions: 1');
      expect(element).toBeInTheDocument();
      // For read local cache
      renderElement('TestContinent');
    });
  });
});
