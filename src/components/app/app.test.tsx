import { MemoryRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { App } from './app';
import { SearchParams } from '../search.page/search.params/search.params';

jest.mock('../search.page/search.params/search.params');
jest.mock('../details.page/details/details');
jest.mock('../visit.page/visit/visit');

describe('Given "App" component', () => {
  describe('When it is render', () => {
    let elements: HTMLElement[];
    beforeEach(() => {
      render(
        <Router>
          <App></App>
        </Router>
      );
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
