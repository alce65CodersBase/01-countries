import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SearchParams } from './search.params';
import { searchCountries } from '../../../service/repo/countries.api.repo';
import { useContinentsList } from '../../../hooks/use.continents.list';
import { useRegionLists } from '../../../hooks/use.regions.list';
import { ListCountries } from '../list.countries/list.countries';
import { LanguageInput } from '../language.input/language.input';

jest.mock('../../../service/repo/countries.api.repo');
jest.mock('../basic.card/basic.card');
jest.mock('../list.countries/list.countries');
jest.mock('../../../hooks/use.continents.list');
jest.mock('../../../hooks/use.regions.list');
jest.mock('../language.input/language.input');

(useContinentsList as jest.Mock).mockReturnValue({
  continents: ['some continent'],
});
(useRegionLists as jest.Mock).mockReturnValue({
  regions: ['some region'],
  status: 'loading',
});

(LanguageInput as jest.Mock).mockImplementation(
  ({ language, handleLanguage }) => {
    setTimeout(() => {
      handleLanguage(language);
    });
  }
);

describe('Given SearchParams component rendered', () => {
  let elements: HTMLFormElement[];
  const mockContinent = 'some continent';
  const mockRegion = 'some region';

  beforeEach(async () => {
    await act(async () => render(<SearchParams></SearchParams>));
    elements = [
      ...screen.getAllByRole<HTMLFormElement>('combobox'),
      screen.getByRole('button'),
    ];
  });

  describe('When there are still NO data from the user ', () => {
    test('Then form controls should be in the document', () => {
      expect(elements.length).toBe(3);
      elements.forEach((item) => expect(item).toBeInTheDocument());
      expect(LanguageInput).toHaveBeenCalled();
    });

    test('Then ListCountries should be in the document', () => {
      expect(ListCountries).toHaveBeenCalled();
    });
  });
  describe('When the user use the form', () => {
    test('A continent could be search', async () => {
      await userEvent.selectOptions(elements[0], mockContinent);
      expect(elements[0]).toHaveValue(mockContinent);
      await act(async () => {
        fireEvent.click(elements[2]);
      });
      expect(searchCountries).toHaveBeenCalled();
    });

    test('A continent & region could be search', async () => {
      await userEvent.selectOptions(elements[0], mockContinent);
      await userEvent.selectOptions(elements[1], mockRegion);
      expect(elements[0]).toHaveValue(mockContinent);
      expect(elements[1]).toHaveValue(mockRegion);
      await act(async () => {
        fireEvent.click(elements[2]);
      });
      expect(searchCountries).toHaveBeenCalled();
    });

    test('A region of a continent could be select', async () => {
      await userEvent.selectOptions(elements[0], mockContinent);
      await userEvent.selectOptions(elements[1], mockRegion);
      expect(elements[1]).toHaveValue(mockRegion);
      await act(async () => {
        fireEvent.click(elements[2]);
      });
    });
  });
});
