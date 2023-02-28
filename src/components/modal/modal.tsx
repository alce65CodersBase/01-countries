import { ReactElement, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  children: ReactElement;
};
export const Modal = ({ children }: ModalProps) => {
  const modalRoot = document.querySelector('#modal');

  let { current } = useRef<HTMLDivElement>(null);
  if (!current) {
    current = document.createElement('div');
    current.classList.add('modal');
  }

  useEffect(() => {
    if (!modalRoot || !current) return;
    // Load Modal in modalRoot
    modalRoot.appendChild(current);
    return () => {
      // UnLoad Modal from modalRoot
      if (current) modalRoot.removeChild(current);
    };
  }, []);

  return createPortal(<>{children}</>, current);
};
