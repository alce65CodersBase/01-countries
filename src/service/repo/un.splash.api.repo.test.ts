import { BasePhoto } from '../../models/photos';
import { getPhotos } from './un.splash.api.repo';

describe('Given getPhotos function', () => {
  describe('When the fetch response is ok', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({
          results: [
            {
              id: 1,
            } as unknown as BasePhoto,
          ],
        }),
      });
    });
    test('Then it should return the mapped data', async () => {
      const result = await getPhotos('any country');
      expect(result.length).toBe(1);
      expect(result[0]).toHaveProperty('id', 1);
    });
  });

  describe('When the fetch response is ok', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        json: jest.fn(),
      });
    });
    test('Then it should throw an error', () => {
      expect(async () => getPhotos('')).rejects.toThrow();
    });
  });
});
