import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Coordinates } from './coordinates';

describe('Given Coordinates component rendered ', () => {
  const latLng = [0, 0];
  describe('When it receive latLng array', () => {
    render(<Coordinates latLng={latLng}></Coordinates>);
    const element = screen.getByRole('group');
    test('Then it should render the component', () => {
      expect(element).toBeInTheDocument();
    });
  });
});
