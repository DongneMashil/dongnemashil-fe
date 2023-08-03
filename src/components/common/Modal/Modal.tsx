import React, { FC, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal: FC<Props> = ({ isOpen, onClose, children }) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) {
    const div = document.createElement('div');
    elRef.current = div;
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    if (modalRoot && elRef.current) {
      modalRoot.appendChild(elRef.current);

      return () => {
        if (elRef.current) {
          modalRoot.removeChild(elRef.current);
        }
      };
    }
  }, []);

  return isOpen
    ? ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-window" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>,
        elRef.current as Element
      )
    : null;
};
