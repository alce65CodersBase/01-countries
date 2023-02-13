import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from './app';

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
    test.todo('Then its child components should to be called');
  });
});
