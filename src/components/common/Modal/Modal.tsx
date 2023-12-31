import React, { FC, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import {
  StModalButtonWrpper,
  StModalContentWrapper,
  StModalOverlay,
  StModalWindow,
} from './Modal.styles';

interface Props {
  isOpen: boolean;
  onCloseHandler?: () => void;
  onSubmitHandler?: () => void;
  onSubmitText?: string;
  title?: string | null;
  firstLine?: string | null;
  secondLine?: string | null;
}

export const Modal: FC<Props> = ({
  isOpen,
  onCloseHandler,
  onSubmitHandler,
  onSubmitText,
  title,
  firstLine,
  secondLine,
}) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  const modalWindowRef = useRef<HTMLDivElement | null>(null);

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
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (onSubmitHandler) {
        onSubmitHandler();
      } else if (onCloseHandler) {
        onCloseHandler();
      }
    }
  };
  useEffect(() => {
    if (isOpen && modalWindowRef.current) {
      modalWindowRef.current.focus();
    }
  }, [isOpen]);

  return isOpen
    ? ReactDOM.createPortal(
        <StModalOverlay onClick={onCloseHandler}>
          <StModalWindow
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
            ref={modalWindowRef}
            tabIndex={0}
          >
            <StModalContentWrapper>
              <h1>{title && title}</h1>
              <h2>
                {firstLine && firstLine}
                {secondLine && (
                  <>
                    <br />
                    {secondLine}
                  </>
                )}
              </h2>
            </StModalContentWrapper>
            <StModalButtonWrpper>
              {onSubmitHandler ? (
                <>
                  <button className="left" onClick={onCloseHandler}>
                    취소
                  </button>
                  <button className="right" onClick={onSubmitHandler}>
                    {onSubmitText}
                  </button>
                </>
              ) : (
                <button className="center" onClick={onCloseHandler}>
                  {onSubmitText ? onSubmitText : '확인'}
                </button>
              )}
            </StModalButtonWrpper>
          </StModalWindow>
        </StModalOverlay>,
        elRef.current as Element
      )
    : null;
};

export default Modal;
