import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  children: globalThis.JSX.Element;
};
export const Modal = ({ children }: ModalProps) => {
  const modalRoot = document.querySelector('#modal') as HTMLDivElement;

  let { current } = useRef<HTMLDivElement>(null);
  if (!current) {
    current = document.createElement('div');
    current.classList.add('modal');
  }

  useEffect(() => {
    // Load Modal in modalRoot
    modalRoot.appendChild(current as HTMLDivElement);
    return () => {
      // UnLoad Modal from modalRoot
      modalRoot.removeChild(current as HTMLDivElement);
    };
  }, []);

  return createPortal(<>{children}</>, current);
};
