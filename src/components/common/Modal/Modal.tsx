import React, { FC, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { styled } from 'styled-components';

interface Props {
  isOpen: boolean;
  onCloseHandler?: () => void;
  onSubmitHandler?: () => void;
  onSubmitText?: string;
  title?: string;
  firstLine?: string;
  secondLine?: string;
  // children?: React.ReactNode;
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
        <StModalOverlay onClick={onCloseHandler}>
          <StModalWindow onClick={(e) => e.stopPropagation()}>
            <StModalContentWrapper>
              <h1>{title && title}</h1>
              <h2>
                {firstLine && firstLine}
                <br />
                {secondLine && secondLine}
              </h2>
              <h2></h2>
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
const StModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  margin-top: 1.75rem;
  width: 70%;

  padding: 0 0.625rem;

  text-align: center;

  h1 {
    color: var(--textcolor, #333);
    text-align: center;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  h2 {
    color: var(--textcolor, #333);
    text-align: center;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const StModalButtonWrpper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3.75rem;

  button {
    background: none;
    border: none;
    outline: none;
    color: var(--textcolor, #333);

    text-align: center;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    cursor: pointer;
  }
  .right {
    width: 30rem;
    height: 100%;
    right: 0;
    background-color: var(--unpressedtag, #ede1ed);
  }
  .left {
    width: 100%;
    height: 100%;
    background-color: #d8d8d8;
  }
  .center {
    width: 100%;
    height: 100%;
    background-color: var(--unpressedtag, #ede1ed);
  }
`;

const StModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  max-width: 390px; // 최대 너비 -> 추후 반응형 적용
  height: 100vh;
  max-height: 850px; // 최대 높이 -> 추후 반응형 적용
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
`;

const StModalWindow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 21.875rem;
  height: 11.25rem;
  flex-shrink: 0;
  background-color: white;
  border-radius: 0.625rem;
  overflow: hidden;
  box-shadow: 0 0.125rem 0.625rem 0 rgba(0, 0, 0, 0.1);
`;
