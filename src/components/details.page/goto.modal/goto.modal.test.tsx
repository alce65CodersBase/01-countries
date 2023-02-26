import { MemoryRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GoToModal } from './goto.modal';

import { Modal } from '../../modal/modal';
import { AppContext, CountryUseState } from '../../../context/app.context';

jest.mock('../../modal/modal');

describe('Given GoToModal component rendered', () => {
  const handleClose = jest.fn();
  (Modal as jest.Mock).mockImplementation(({ children }) => children);

  let elements: HTMLElement[];
  let context: CountryUseState;
  beforeEach(() => {
    context = [{ country: 'any' }, jest.fn()];
    render(
      <AppContext.Provider value={context}>
        <Router>
          <GoToModal country="any" handleClose={handleClose}></GoToModal>
        </Router>
      </AppContext.Provider>
    );
    elements = screen.getAllByRole('button');
  });
  describe('When the user click on the Go button', () => {
    test('Then it should ...', () => {
      fireEvent.click(elements[0]);
      expect(context[1]).toHaveBeenCalled();
      expect(handleClose).toHaveBeenCalled();
    });
  });
  describe('When the user click on the Cancel button', () => {
    test('Then it should run the cancel function', () => {
      fireEvent.click(elements[1]);
      expect(handleClose).toHaveBeenCalled();
    });
  });
});
