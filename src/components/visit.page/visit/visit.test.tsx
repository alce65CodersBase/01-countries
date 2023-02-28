import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Visit } from './visit';
import { AppContext, CountryUseState } from '../../../context/app.context';
import { getPhotos } from '../../../service/repo/un.splash.api.repo';
import { BasePhoto } from '../../../models/photos';
import { Carousel } from '../carousel/carousel';
import { Grid } from '../grid/grid';

jest.mock('../../../service/repo/un.splash.api.repo');
jest.mock('../grid/grid');
jest.mock('../carousel/carousel');
describe('Given Visit component', () => {
  const mockCountry = 'country';
  let elements: HTMLElement[];
  beforeEach(() => {
    (getPhotos as jest.Mock).mockImplementation((query) => {
      if (query === mockCountry) return [];
      if (query === 'region') return [];
      return [{ id: '1', urls: {} } as BasePhoto];
    });
  });
  describe('When there are not photos for the country and region', () => {
    beforeEach(async () => {
      const context: CountryUseState = [
        { country: mockCountry, region: 'region', continent: 'continent' },
        jest.fn(),
      ];
      await act(async () => {
        render(
          <AppContext.Provider value={context}>
            <Visit></Visit>
          </AppContext.Provider>
        );
      });
      elements = [screen.getByRole('heading')];
    });
    test('Then continent photos should display in a carrousel ', () => {
      expect(elements[0].textContent).toContain(mockCountry);
      expect(getPhotos).toHaveBeenCalled();
      expect(Carousel).toHaveBeenCalled();
    });
  });

  describe('When the output is "grid"', () => {
    const mockCountry = 'any country';
    beforeEach(async () => {
      const context: CountryUseState = [
        { country: mockCountry, region: '', continent: '' },
        jest.fn(),
      ];
      await act(async () => {
        render(
          <AppContext.Provider value={context}>
            <Visit type="grid"></Visit>
          </AppContext.Provider>
        );
      });
      elements = screen.getAllByRole('heading');
    });
    test('Then continent photos should display in a grid ', () => {
      expect(elements[0].textContent).toContain(mockCountry);
      expect(getPhotos).toHaveBeenCalled();
      expect(Grid).toHaveBeenCalled();
    });
  });
});
