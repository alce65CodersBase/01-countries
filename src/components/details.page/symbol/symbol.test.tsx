import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Symbol } from './symbol';

describe('Given Symbol component rendered', () => {
  const mockAltText = 'Alt text';
  const source = {
    svg: 'http',
    png: 'http',
    alt: mockAltText,
  };
  describe('When it receive a source with svg url and alt text', () => {
    beforeEach(() => {
      render(<Symbol source={source}></Symbol>);
    });

    test('Then it should render the image', () => {
      const element = screen.getByAltText(mockAltText);
      expect(element).toBeInTheDocument();
    });
  });

  describe('When it receive a source png url and alt text', () => {
    beforeEach(() => {
      source.svg = '';
      render(<Symbol source={source}></Symbol>);
    });

    test('Then it should render the image', () => {
      const element = screen.getByAltText(mockAltText);
      expect(element).toBeInTheDocument();
    });
  });

  describe('When it receive as source with only svg url ', () => {
    const mockAltDefaultText = 'Coat of Arms';
    const source = {
      svg: 'http',
    };
    beforeEach(() => {
      render(<Symbol source={source}></Symbol>);
    });

    test('Then it should render the image', () => {
      const element = screen.getByAltText(mockAltDefaultText);
      expect(element).toBeInTheDocument();
    });
  });
  describe('When it receive a source without urls', () => {
    beforeEach(() => {
      source.svg = '';
      source.png = '';
      render(<Symbol source={source}></Symbol>);
    });

    test('Then it should render a fragment', () => {
      const element = screen.queryByAltText(mockAltText);
      expect(element).toBe(null);
    });
  });
});
