import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Visit } from './visit';
import { AppContext, CountryUseState } from '../../../context/app.context';
import { getPhotos } from '../../../service/repo/un.splash.api.repo';
import { BasePhoto } from '../../../models/photos';

jest.mock('../../../service/repo/un.splash.api.repo');
describe('Given Visit component', () => {
  describe('When', () => {
    const mockCountry = 'Test';
    let elements: HTMLElement[];
    beforeEach(async () => {
      (getPhotos as jest.Mock).mockResolvedValue([
        { id: '1', urls: {} } as BasePhoto,
      ]);
      const context: CountryUseState = [{ country: mockCountry }, jest.fn()];
      await act(async () => {
        render(
          <AppContext.Provider value={context}>
            <Visit></Visit>
          </AppContext.Provider>
        );
      });
      elements = [screen.getByRole('heading')];
    });
    test('Then it should ...', () => {
      expect(elements[0].textContent).toContain(mockCountry);
      expect(getPhotos).toHaveBeenCalled();
    });
  });
});
