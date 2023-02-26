import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Carousel } from './carousel';
import { BasePhoto, Urls } from '../../../models/photos';

describe('Given Carousel component', () => {
  describe('When receive an array of photos ', () => {
    const photos: BasePhoto[] = [
      { id: '1', urls: {} as Urls } as BasePhoto,
      { id: '2', urls: {} as Urls } as BasePhoto,
    ];
    let elements: HTMLElement[];

    beforeEach(() => {
      render(<Carousel images={photos}></Carousel>);
      elements = screen.getAllByRole('img');
    });
    test('Then it should display it', () => {
      expect(elements.length).toBe(3);
    });

    test('Then user could select a photo', () => {
      fireEvent.click(elements[2]);
      expect(elements[2]).toHaveClass('active');
    });

    test('Then user could NOT select a photo without data-index', () => {
      delete elements[2].dataset.index;
      fireEvent.click(elements[2]);
      expect(elements[2]).not.toHaveClass('active');
    });
  });

  describe('When NOT receive an array of photos ', () => {
    beforeEach(() => {
      render(<Carousel images={[]}></Carousel>);
    });
    test('Anything should be rendered', () => {
      const element = screen.queryByRole('img');
      expect(element).toBe(null);
    });
  });
});
