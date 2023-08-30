import React, { useCallback, useLayoutEffect, useRef } from 'react';
import {
  StCenteredBox,
  StSlideContainer,
  StPlusButton,
  StImageContainer,
  StDelete,
} from './FileSlider.styles';
import { ReactComponent as FileUpload } from 'assets/icons/FileUpload.svg';
import { ReactComponent as TrashCan } from 'assets/icons/TrashCan.svg';
import { MediaFile, MediaFileType } from 'recoil/mediaFile/mediaFileAtom';
import { RenderFileOrUrl } from './RenderFileOrUrl/RenderFileOrUrl';
import { useHorizontalDragScroll } from 'hooks';

interface ImageSliderProps {
  images: MediaFileType[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  onAddImage: () => void;
  onSelectedCoverImage?: (file: MediaFileType) => void;
  isCoverImage: (file: MediaFileType) => boolean;
  setCoverImage: (file: MediaFileType) => void;
  files: MediaFile[];
  onDeleteImage: (file: MediaFileType) => void;
}

export const FileSlider: React.FC<ImageSliderProps> = ({
  images,
  onAddImage,
  onSelectedCoverImage,
  isCoverImage,
  setCoverImage,
  files,
  onDeleteImage,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (divRef.current !== null && wrapperRef.current !== null) {
      divRef.current.focus();
      const imageMargin = 0.5 * 2;
      const imageWidth = wrapperRef.current.offsetWidth;
      const centeredBoxWidth = divRef.current.offsetWidth;

      const totalWidthOfItems =
        files.length * (imageWidth + imageMargin) + centeredBoxWidth;
      const newScrollPosition =
        totalWidthOfItems - wrapperRef.current.offsetWidth;

      wrapperRef.current.scrollLeft = newScrollPosition;
    }
  }, [onAddImage]);

  useHorizontalDragScroll(wrapperRef);

  const onImageClick = useCallback((image: MediaFileType) => {
    onSelectedCoverImage && onSelectedCoverImage(image);
  }, []);

  const onCoverButtonClick = useCallback((image: MediaFileType) => {
    setCoverImage(image);
  }, []);

  const onImageDelete = useCallback((file: MediaFileType) => {
    onDeleteImage(file);
  }, []);

  return (
    <StSlideContainer ref={wrapperRef}>
      {files.map((file, index) => (
        <StImageContainer key={index}>
          <RenderFileOrUrl
            file={file}
            index={index}
            onImageClick={onImageClick}
            isCoverImage={isCoverImage}
            onCoverButtonClick={onCoverButtonClick}
            images={images}
          />
          <StDelete onClick={() => onImageDelete(file.file)}>
            <TrashCan />
          </StDelete>
        </StImageContainer>
      ))}
      <StCenteredBox ref={divRef}>
        <StPlusButton onClick={onAddImage}>
          <FileUpload />
          <p>{`${images.length} / 5`}</p>
        </StPlusButton>
      </StCenteredBox>
    </StSlideContainer>
  );
};
