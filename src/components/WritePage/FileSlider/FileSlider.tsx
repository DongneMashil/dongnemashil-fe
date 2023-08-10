import React from 'react';
import {
  ArrowButton,
  CenteredBox,
  CoverImageButton,
  SlideContainer,
  StPlusButton,
  StyledImage,
  StyledVideo,
} from './FileSlider.styles';
import { ReactComponent as FileUpload } from 'assets/icons/FileUpload.svg';

interface ImageSliderProps {
  images: File[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  onAddImage: () => void;
  onSelectedCoverImage?: (file: File) => void;
  isCoverImage: (file: File) => boolean;
  setCoverImage: (file: File) => void;
  files: { type: 'image' | 'video'; file: File }[];
}

export const FileSlider: React.FC<ImageSliderProps> = ({
  images,
  currentPage,
  setCurrentPage,
  onAddImage,
  onSelectedCoverImage,
  isCoverImage,
  setCoverImage,
  files,
}) => {
  const onSlideButtonHandler = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === 'right' && currentPage < images.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div>
      <SlideContainer>
        <ArrowButton
          onClick={() => onSlideButtonHandler('left')}
          disabled={currentPage === 0}
          left
        >
          &larr;
        </ArrowButton>
        {currentPage === images.length ? (
          <CenteredBox>
            <StPlusButton onClick={onAddImage}>
              <FileUpload />
              <p>{`${images.length} / 5`}</p>
            </StPlusButton>
          </CenteredBox>
        ) : files[currentPage].type === 'image' ? (
          <>
            <StyledImage
              src={URL.createObjectURL(images[currentPage])}
              alt={`Upload Preview ${currentPage}`}
              onClick={() =>
                onSelectedCoverImage &&
                onSelectedCoverImage(images[currentPage])
              }
            />
            <CoverImageButton
              isActive={isCoverImage(images[currentPage])}
              onClick={() => setCoverImage(images[currentPage])}
            >
              대표
            </CoverImageButton>
          </>
        ) : (
          <StyledVideo
            src={URL.createObjectURL(images[currentPage])}
            controls
          />
        )}
        ..
        <ArrowButton
          onClick={() => onSlideButtonHandler('right')}
          disabled={currentPage === images.length}
        >
          &rarr;
        </ArrowButton>
      </SlideContainer>
    </div>
  );
};
