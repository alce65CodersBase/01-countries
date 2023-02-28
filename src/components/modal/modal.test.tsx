import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Modal } from './modal';

document.body.innerHTML = '<div id="modal"></div>';

describe('Given Modal component', () => {
  describe('When there are a DOM reference for render it', () => {
    beforeEach(() => {
      render(
        <>
          <div id="modal"></div>
          <Modal>
            <h1>Modal</h1>
          </Modal>
        </>
      );
    });
    test('Then it should display the content inside it', () => {
      const element = screen.getByRole('heading');
      expect(element).toBeInTheDocument();
    });
  });
});
