import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SearchParams } from './search.params';
import { ListCountries } from '../list.countries/list.countries';
import { searchCountries } from '../../service/repo/countries.api.repo';
import { useContinentsList } from '../../hooks/use.continents.list';
import { useRegionLists } from '../../hooks/use.regions.list';

jest.mock('../../service/repo/countries.api.repo');
jest.mock('../basic.card/basic.card');
jest.mock('../list.countries/list.countries');
jest.mock('../../hooks/use.continents.list');
jest.mock('../../hooks/use.regions.list');

(useContinentsList as jest.Mock).mockReturnValue({
  continents: ['some continent'],
});
(useRegionLists as jest.Mock).mockReturnValue({
  regions: ['some region'],
  status: 'loading',
});

describe('Given SearchParams component rendered', () => {
  let elements: HTMLFormElement[];
  const mockLanguage = 'some language';
  const mockContinent = 'some continent';
  const mockRegion = 'some region';

  beforeEach(async () => {
    await act(async () => render(<SearchParams></SearchParams>));
    elements = [
      screen.getByRole('textbox'),
      ...screen.getAllByRole<HTMLFormElement>('combobox'),
      screen.getByRole('button'),
    ];
  });

  describe('When there are still NO data from the user ', () => {
    test('Then form controls should be in the document', () => {
      expect(elements.length).toBe(4);
      elements.forEach((item) => expect(item).toBeInTheDocument());
    });

    test('Then ListCountries should be in the document', () => {
      expect(ListCountries).toHaveBeenCalled();
    });
  });
  describe('When the user use the form', () => {
    test('A language could be search', async () => {
      await userEvent.clear(elements[0]);
      await userEvent.type(elements[0], mockLanguage);
      expect(elements[0]).toHaveValue(mockLanguage);
      await act(async () => {
        fireEvent.click(elements[3]);
      });
    });

    test('A language & continent could be search', async () => {
      await userEvent.clear(elements[0]);
      await userEvent.type(elements[0], mockLanguage);
      await userEvent.selectOptions(elements[1], mockContinent);
      expect(elements[0]).toHaveValue(mockLanguage);
      expect(elements[1]).toHaveValue(mockContinent);
      await act(async () => {
        fireEvent.click(elements[3]);
      });
      expect(searchCountries).toHaveBeenCalled();
    });

    test('A language & continent & region could be search', async () => {
      await userEvent.clear(elements[0]);
      await userEvent.type(elements[0], mockLanguage);
      await userEvent.selectOptions(elements[1], mockContinent);
      await userEvent.selectOptions(elements[2], mockRegion);
      expect(elements[0]).toHaveValue(mockLanguage);
      expect(elements[1]).toHaveValue(mockContinent);
      expect(elements[2]).toHaveValue(mockRegion);
      await act(async () => {
        fireEvent.click(elements[3]);
      });
      expect(searchCountries).toHaveBeenCalled();
    });

    test('A continent could be select', async () => {
      await userEvent.selectOptions(elements[1], mockContinent);
      expect(elements[1]).toHaveValue(mockContinent);
      await act(async () => {
        fireEvent.click(elements[3]);
      });
    });
    test('A region of a continent could be select', async () => {
      await userEvent.selectOptions(elements[1], mockContinent);
      await userEvent.selectOptions(elements[2], mockRegion);
      expect(elements[2]).toHaveValue(mockRegion);
      await act(async () => {
        fireEvent.click(elements[3]);
      });
    });
  });
});
