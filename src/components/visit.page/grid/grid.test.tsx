import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Grid } from './grid';
import { BasePhoto, Urls } from '../../../models/photos';

describe('Given Grid component rendered', () => {
  describe('When receive an array of photos ', () => {
    test('Then it should display it', () => {
      const photos: BasePhoto[] = [{ id: '1', urls: {} as Urls } as BasePhoto];
      render(<Grid photos={photos} photoGrid="css"></Grid>);
      const elements = [screen.getByRole('list'), screen.getByRole('listitem')];
      expect(elements.length).toBe(2);
    });
  });
});
