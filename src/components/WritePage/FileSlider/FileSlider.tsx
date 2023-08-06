import React from 'react';
import {
  ArrowButton,
  CenteredBox,
  Indicator,
  PageIndicators,
  SlideContainer,
  StPlusButton,
  StyledImage,
  StyledVideo,
} from './FileSlider.styles';

interface ImageSliderProps {
  images: string[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  onAddImage: () => void;
}

export const FileSlider: React.FC<ImageSliderProps> = ({
  images,
  currentPage,
  setCurrentPage,
  onAddImage,
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
            <StPlusButton onClick={onAddImage}>+</StPlusButton>
          </CenteredBox>
        ) : images[currentPage].startsWith('data:image') ? (
          <StyledImage
            src={images[currentPage]}
            alt={`Upload Preview ${currentPage}`}
          />
        ) : (
          <StyledVideo src={images[currentPage]} controls />
        )}
        <ArrowButton
          onClick={() => onSlideButtonHandler('right')}
          disabled={currentPage === images.length}
        >
          &rarr;
        </ArrowButton>
      </SlideContainer>
      <PageIndicators>
        {Array.from({ length: images.length + 1 }).map((_, index) => (
          <Indicator key={index} $isActive={index === currentPage} />
        ))}
      </PageIndicators>
    </div>
  );
};
