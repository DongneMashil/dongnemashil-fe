import React from 'react';
import { StPlusButton } from './FileSlider.styles';

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

  const onSlideButtonHandeler = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentPage((prev) => (prev === 0 ? images.length : prev - 1));
    } else {
      setCurrentPage((prev) => (prev === images.length ? 0 : prev + 1));
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '200px' }}>
      <button onClick={() => onSlideButtonHandeler("left")}>Prev</button>
      {currentPage === images.length ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <StPlusButton onClick={onAddImage}>+</StPlusButton>
        </div>
      ) : images[currentPage].startsWith('data:image') ? (
        <img src={images[currentPage]} alt={`Upload Preview ${currentPage}`} />
      ) : (
        <video src={images[currentPage]} controls />
      )}
      <button onClick={() => onSlideButtonHandeler("right")}>Next</button>
    </div>
  );
};
