import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from './app';
import { SearchParams } from '../search.params/search.params';

jest.mock('../search.params/search.params');

describe('Given "App" component', () => {
  describe('When it is render', () => {
    let elements: HTMLElement[];
    beforeEach(() => {
      render(<App></App>);
      elements = [screen.getByRole('heading')];
    });
    test('Then the title should to in the document', () => {
      expect(elements[0]).toBeInTheDocument();
    });
    test('Then its child components should to be called', () => {
      expect(SearchParams).toHaveBeenCalled();
    });
  });
});
