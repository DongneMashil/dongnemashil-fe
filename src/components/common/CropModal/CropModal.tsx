import React, { FC, useEffect, useRef, useState, ChangeEvent } from 'react';
import 'cropperjs/dist/cropper.css';

import ReactDOM from 'react-dom';
import {
  StModalButtonWrpper,
  StModalOverlay,
  StModalWindow,
} from './CropModal.styles';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { RecoilState, useSetRecoilState } from 'recoil';
import { cropProfileImageAtom } from 'recoil/cropProfileImage/cropProfileImageAtom';
interface Props {
  isOpen: boolean;
  onCloseHandler?: () => void;
}

export const CropModal: FC<Props> = ({ isOpen, onCloseHandler }) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cropperRef = useRef<ReactCropperElement>(null);
  if (!elRef.current) {
    const div = document.createElement('div');
    elRef.current = div;
  }
  // 로컬 상태로 이미지 URL 관리
  const [localSrc, setLocalSrc] = useState<string | undefined>();

  // 파일 선택 핸들러
  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = (e.target as FileReader).result as string;
        setLocalSrc(imageUrl);
        setCropData(imageUrl); // Recoil Atom에 이미지 URL 저장
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  //   const selectFileHandler = () => {
  //     const fileInput = document.createElement('input');
  //     fileInput.type = 'file';
  //     fileInput.accept = 'image/*';
  //     fileInput.onchange = onFileChange;
  //     fileInput.click();
  //   };

  //   useEffect(() => {
  //     if (isOpen) {
  //       const fileInput = document.createElement('input');
  //       fileInput.type = 'file';
  //       fileInput.accept = 'image/*';
  //       fileInput.onchange = onFileChange;
  //       fileInput.click();
  //     }
  //   }, [isOpen]);
  const onFileButtonClick = () => {
    fileInputRef.current?.click();
  };
  const setCropData = useSetRecoilState<string | null>(
    cropProfileImageAtom as RecoilState<string | null>
  );

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

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };
  const onClickCloseHandler = () => {
    getCropData();
    onCloseHandler!();
  };
  const setZoomToFit = () => {
    if (cropperRef.current && cropperRef.current.cropper) {
      const cropperInstance = cropperRef.current.cropper;
      const containerData = cropperInstance.getContainerData();
      const imageData = cropperInstance.getImageData();

      if (containerData && imageData) {
        const aspectRatio = containerData.width / imageData.naturalWidth;
        cropperInstance.zoomTo(aspectRatio);
      }
    }
  };

  return isOpen
    ? ReactDOM.createPortal(
        <StModalOverlay onClick={onCloseHandler}>
          <StModalWindow onClick={(e) => e.stopPropagation()}>
            <Cropper
              className="cropper"
              ref={cropperRef}
              ready={setZoomToFit}
              zoomTo={1}
              initialAspectRatio={1}
              aspectRatio={1}
              preview=".img-preview"
              src={localSrc}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={0.5}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              guides={true}
            />

            <StModalButtonWrpper>
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />

              <button className="left" onClick={onFileButtonClick}>
                파일 선택
              </button>
              <button className="right" onClick={onClickCloseHandler}>
                완료
              </button>
            </StModalButtonWrpper>
          </StModalWindow>
        </StModalOverlay>,
        elRef.current as Element
      )
    : null;
};
