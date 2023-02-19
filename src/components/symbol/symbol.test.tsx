import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Symbol } from './symbol';

describe('Given Symbol component rendered', () => {
  describe('When it receive a source with svg url and alt text', () => {
    const mockAltText = 'Alt text';
    const source = {
      svg: 'http',
      png: 'http',
      alt: mockAltText,
    };
    beforeEach(() => {
      render(<Symbol source={source}></Symbol>);
    });

    test('Then it should render the image', () => {
      const element = screen.getByAltText(mockAltText);
      expect(element).toBeInTheDocument();
    });
  });

  describe('When it receive a source png url and alt text', () => {
    const mockAltText = 'Alt text';
    const source = {
      svg: '',
      png: 'http',
      alt: mockAltText,
    };
    beforeEach(() => {
      render(<Symbol source={source}></Symbol>);
    });

    test('Then it should render the image', () => {
      const element = screen.getByAltText(mockAltText);
      expect(element).toBeInTheDocument();
    });
  });

  describe('When it receive as source with only svg url ', () => {
    const mockAltText = 'Coat of Arms';
    const source = {
      svg: 'http',
    };
    beforeEach(() => {
      render(<Symbol source={source}></Symbol>);
    });

    test('Then it should render the image', () => {
      const element = screen.getByAltText(mockAltText);
      expect(element).toBeInTheDocument();
    });
  });
  describe('When it receive a source without urls', () => {
    const mockAltText = 'Alt text';
    const source = {
      svg: '',
      png: '',
      alt: mockAltText,
    };
    beforeEach(() => {
      render(<Symbol source={source}></Symbol>);
    });

    test('Then it should render a fragment', () => {
      const element = screen.queryByAltText(mockAltText);
      expect(element).toBe(null);
    });
  });
});
