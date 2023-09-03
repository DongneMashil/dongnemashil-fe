import React, { FC, useEffect, useRef, useState, ChangeEvent } from 'react';
import 'cropperjs/dist/cropper.css';

import ReactDOM from 'react-dom';
import {
  StModalButtonWrpper,
  StModalOverlay,
  StModalWindow,
} from './CropModal.styles';
import Cropper, { ReactCropperElement } from 'react-cropper';
import { useRecoilState, useSetRecoilState } from 'recoil';
import imageCompression from 'browser-image-compression';

import { cropProfileImageAtom } from 'recoil/cropProfileImage/cropProfileImageAtom';
import { ReactComponent as ArrowDown } from 'assets/icons/ArrowDown.svg';
import { mediaFilesAtom } from 'recoil/mediaFile/mediaFileAtom';
import { ReactComponent as Close } from 'assets/icons/close-x.svg';
import Modal from '../Modal/Modal';
interface Props {
  isOpen: boolean;
  onCloseHandler?: () => void;
  fixedAspectRatio?: boolean;
  isWriteReview?: boolean; // 동영상 허용 여부를 결정하는 prop
  isVideoSubmitted?: boolean; // 동영상이 제출되었는지 여부를 결정하는 prop
}

export const CropModal: FC<Props> = ({
  isOpen,
  onCloseHandler,
  fixedAspectRatio = false,
  isWriteReview = false,
  isVideoSubmitted = false,
}) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  if (!elRef.current) {
    const div = document.createElement('div');
    elRef.current = div;
  }
  // 로컬 상태로 이미지 URL 관리
  const [localSrc, setLocalSrc] = useState<string | undefined>();

  // 파일 선택 핸들러
  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type.includes('video') && isWriteReview) {
        // Check if the video file exceeds 100MB
        if (file.size > 100 * 1024 * 1024) {
          setModalMessage(`100MB를 초과하므로 업로드할 수 없습니다.`);
          return;
        }
        setMediaFiles([
          ...mediaFiles,
          {
            type: 'video',
            file: file,
            isCover: false,
          },
        ]);

        onCloseHandler!(); // <-- 이 부분을 추가. 동영상 선택 후 모달 닫기
      } else if (file.type.includes('image')) {
        // console.log('이미지 파일이 들어왔습니다.');
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = (e.target as FileReader).result as string;
          setLocalSrc(imageUrl);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const onFileButtonClick = () => {
    fileInputRef.current?.click();
  };
  const setCropData = useSetRecoilState(cropProfileImageAtom);
  const [mediaFiles, setMediaFiles] = useRecoilState(mediaFilesAtom);

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
  // 모달이 열리면 파일 선택 창을 띄우기
  useEffect(() => {
    if (isOpen) {
      fileInputRef.current?.click();
    }
  }, [isOpen]);

  const getCropData = () => {
    if (cropperRef.current?.cropper) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();

      //압축하기
      if (croppedCanvas) {
        const dataURL = croppedCanvas.toDataURL('image/jpeg', 0.9);
        fetch(dataURL)
          .then((res) => res.blob())
          .then(async (blob) => {
            const file = new File([blob], 'cropped-image.jpg', {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });

            const profileOptions = {
              maxSizeMB: 0.1,
              maxWidthOrHeight: 100,
              useWebWorker: true,
            };
            const reviewOptions = {
              maxSizeMB: 1,
              maxWidthOrHeight: 1440,
              useWebWorker: true,
            };

            try {
              const compressedFile = await imageCompression(
                file,
                isWriteReview ? reviewOptions : profileOptions
              );
              const imgUrl = URL.createObjectURL(compressedFile);
              if (isWriteReview) {
                if (
                  (mediaFiles[0]?.type === 'video' &&
                    mediaFiles.length === 1) ||
                  mediaFiles.length === 0
                ) {
                  setMediaFiles([
                    ...mediaFiles,
                    {
                      type: 'image',
                      file: compressedFile,
                      isCover: true,
                    },
                  ]);
                } else {
                  setMediaFiles([
                    ...mediaFiles,
                    {
                      type: 'image',
                      file: compressedFile,
                      isCover: false,
                    },
                  ]);
                }
              } else {
                setCropData({
                  file: file,
                  imgUrl: imgUrl,
                });
              }
            } catch (error) {
              console.error(error);
            }
          });
      }
    }
  };

  const onClickCloseHandler = () => {
    if (localSrc) {
      // 이미지가 선택되었는지 확인
      getCropData();
    }
    onCloseHandler!();
  };

  const setZoomToFit = () => {
    if (!cropperRef.current || !cropperRef.current.cropper) return;
    const cropperInstance = cropperRef.current.cropper;
    const containerData = cropperInstance.getContainerData();
    const imageData = cropperInstance.getImageData();

    if (!containerData || !imageData) return;

    if (isWriteReview) {
      // 이미지가 컨테이너보다 큰 경우에만 줌을 조절합니다.
      if (
        imageData.naturalWidth > containerData.width ||
        imageData.naturalHeight > containerData.height
      ) {
        const widthRatio = containerData.width / imageData.naturalWidth;
        const heightRatio = containerData.height / imageData.naturalHeight;

        const minRatio = Math.min(widthRatio, heightRatio);

        cropperInstance.zoomTo(minRatio);
      }

      // 크롭 박스의 크기를 이미지의 크기에 맞게 설정합니다.
      cropperInstance.setCropBoxData({
        left: 0,
        top: 0,
        width: imageData.width,
        height: imageData.height,
      });
    } else {
      const aspectRatio = containerData.width / imageData.naturalWidth;
      cropperInstance.zoomTo(aspectRatio);
    }
  };

  return isOpen
    ? ReactDOM.createPortal(
        <StModalOverlay>
          <StModalWindow onClick={(e) => e.stopPropagation()}>
            {!localSrc && (
              <>
                <p className="message">
                  <ArrowDown />
                  {isWriteReview
                    ? `${
                        isVideoSubmitted
                          ? '(동영상 선택 완료) 이미지를 선택해주세요📸 '
                          : '동영상, 이미지를 선택해주세요📸'
                      }`
                    : '이미지를 선택해주세요📸'}
                </p>
              </>
            )}
            <Cropper
              className="cropper"
              ref={cropperRef}
              ready={setZoomToFit}
              zoomTo={1}
              initialAspectRatio={1}
              aspectRatio={fixedAspectRatio ? 1 : undefined}
              preview=".img-preview"
              src={localSrc}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={0.5}
              checkOrientation={false}
              guides={true}
            />
            <button className="close" onClick={onCloseHandler}>
              <Close width="30px" />
            </button>
            <StModalButtonWrpper>
              <input
                type="file"
                accept={
                  isWriteReview
                    ? `image/png, image/jpeg, image/jpg, ${
                        !isVideoSubmitted && 'video/mp4, video/mov'
                      }`
                    : 'image/png, image/jpeg, image/jpg'
                }
                onChange={onFileChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
              />

              <button className="left" onClick={onFileButtonClick}>
                파일 다시 선택
              </button>
              <button className="right" onClick={onClickCloseHandler}>
                자르기 완료
              </button>
            </StModalButtonWrpper>
            <Modal
              isOpen={!!modalMessage}
              onCloseHandler={() => setModalMessage(null)}
              title="알림"
              firstLine={modalMessage}
            />
          </StModalWindow>
        </StModalOverlay>,
        elRef.current as Element
      )
    : null;
};
