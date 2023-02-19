import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Map } from './map';
import { createURLGoogle, createURLOpen } from '../../service/maps/maps';

jest.mock('../../service/maps/maps');

const renderElement = (source: string) => {
  const url = '';
  const latLng: number[] = [];
  const area = 0;
  const country = '';
  render(
    <Map
      source={source}
      url={url}
      latLng={latLng}
      area={area}
      country={country}
    ></Map>
  );
  return [screen.getByRole('link'), screen.getByRole('presentation')];
};

describe('Given Map component rendered', () => {
  describe('When the source is "Open Street"', () => {
    test('Then it should render de link and the iframe', () => {
      const source = 'Open Street Maps';
      const elements = renderElement(source);
      expect(elements[0]).toBeInTheDocument();
      expect(elements[1]).toBeInTheDocument();
      expect(createURLOpen).toHaveBeenCalled();
    });
  });

  describe('When the source is "Google"', () => {
    test('Then it should ...', () => {
      const source = 'Googel Maps';
      const elements = renderElement(source);
      expect(elements[0]).toBeInTheDocument();
      expect(elements[1]).toBeInTheDocument();
      expect(createURLGoogle).toHaveBeenCalled();
    });
  });
});
