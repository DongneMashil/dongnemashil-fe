import React, { useEffect, useState } from 'react';
import {
  CenteredBox,
  Indicator,
  PageIndicators,
  SingleSlide,
  SlideContainer,
  SlideWrapper,
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
  const [startX, setStartX] = useState<number | null>(null);

  const slideWidth = 18.75;

  useEffect(() => {
    console.log('currentPage:', currentPage);
  }, [currentPage]);

  const onMouseDownHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    const clientX = e.clientX;

    if (clientX > window.innerWidth / 2 && currentPage < images.length - 1) {
      setCurrentPage((prev) => prev + 1);
    } else if (clientX <= window.innerWidth / 2 && currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const onMouseMoveHandler = (e: React.MouseEvent) => {
    if (startX === null) return;
    const updateState = () => {
      const currentEndX = e.nativeEvent.clientX;
      const difference = currentEndX - startX;
      if (difference > 50 && currentPage > 0) {
        setCurrentPage((prev) => prev - 1);
        setStartX(null);
      }
      if (difference < -50 && currentPage < images.length - 1) {
        setCurrentPage((prev) => prev + 1);
        setStartX(null);
      }
    };
    requestAnimationFrame(updateState);
  };

  const onMouseUpHandler = () => {
    setStartX(null);
  };

  const onMouseLeaveHandler = () => {
    setStartX(null);
  };

  const calculateTranslateValue = (): string => {
    return `-${currentPage * slideWidth}rem`;
  };

  const calculateWrapperWidth = (): string => {
    return `${(images.length + 1) * slideWidth}rem`;
  };

  return (
    <div>
      <SlideContainer
        onMouseDown={onMouseDownHandler}
        onMouseMove={onMouseMoveHandler}
        onMouseUp={onMouseUpHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        <SlideWrapper
          $translateX={calculateTranslateValue()}
          $width={calculateWrapperWidth()}
        >
          {images.map((img, index) => (
            <SingleSlide key={index} $width={slideWidth.toString()}>
              {img.startsWith('data:image') ? (
                <StyledImage src={img} alt={`Upload Preview ${index}`} />
              ) : (
                <StyledVideo src={img} controls />
              )}
            </SingleSlide>
          ))}
          <SingleSlide $width={slideWidth.toString()}>
            <CenteredBox>
              <StPlusButton onClick={onAddImage}>+</StPlusButton>
            </CenteredBox>
          </SingleSlide>
        </SlideWrapper>
      </SlideContainer>
      <PageIndicators>
        {Array.from({ length: images.length + 1 }).map((_, index) => (
          <Indicator key={index} $isActive={index === currentPage} />
        ))}
      </PageIndicators>
    </div>
  );
};
