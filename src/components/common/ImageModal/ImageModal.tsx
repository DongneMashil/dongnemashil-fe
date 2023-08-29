import React, { FC, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import {
  StDownloadButton,
  StModalOverlay,
  StModalWindow,
} from './ImageModal.styles';

interface Props {
  isOpen: boolean;
  onCloseHandler: () => void;
  imageSrc: string;
}

export const ImageModal: FC<Props> = ({ isOpen, onCloseHandler, imageSrc }) => {
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
          <StModalWindow onClick={onCloseHandler}>
            <img src={imageSrc} alt="리뷰 이미지" />
          </StModalWindow>
          <StDownloadButton href={imageSrc}>
            원본 이미지 다운로드
          </StDownloadButton>
        </StModalOverlay>,
        elRef.current as Element
      )
    : null;
};
