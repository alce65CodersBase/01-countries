import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GoToModal } from './goto.modal';

import { Modal } from '../../modal/modal';

jest.mock('../../modal/modal');

describe('Given GoToModal component rendered', () => {
  const handleClickCancel = jest.fn();
  (Modal as jest.Mock).mockImplementation(({ children }) => children);

  let elements: HTMLElement[];
  beforeEach(() => {
    render(
      <GoToModal country="any" handleClick={handleClickCancel}></GoToModal>
    );
    elements = screen.getAllByRole('button');
  });
  describe('When the user click on the Go button', () => {
    test('Then it should ...', () => {
      fireEvent.click(elements[0]);
    });
  });
  describe('When the user click on the Cancel button', () => {
    test('Then it should run the cancel function', () => {
      fireEvent.click(elements[1]);
      expect(handleClickCancel).toHaveBeenCalled();
    });
  });
});
