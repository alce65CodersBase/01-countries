import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchParams } from './search.params';

jest.mock('../../service/repo/countries.api.repo');
jest.mock('../basic.card/basic.card');
describe('Given SearchParams component rendered', () => {
  render(<SearchParams></SearchParams>);
  const elements = [
    screen.getByRole('textbox'),
    ...screen.getAllByRole('combobox'),
    screen.getByRole('button'),
  ];
  describe('When there are still NO data from the user ', () => {
    test('Then form controls should be in the document', () => {
      expect(elements.length).toBe(4);
      elements.forEach((item) => expect(item).toBeInTheDocument());
    });
  });
});
