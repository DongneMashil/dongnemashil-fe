import React from 'react';
import {
  StCenteredBox,
  StCoverImageButton,
  StSlideContainer,
  StPlusButton,
  StyledImage,
  StyledImageContainer,
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
  onAddImage,
  onSelectedCoverImage,
  isCoverImage,
  setCoverImage,
  files,
}) => {
  const onImageClick = (image: File) => {
    onSelectedCoverImage && onSelectedCoverImage(image);
  };

  const onCoverButtonClick = (image: File) => {
    setCoverImage(image);
  };

  return (
    <StSlideContainer>
      {files.map((file, index) => (
        <StyledImageContainer key={index}>
          {file.type === 'image' ? (
            <>
              <StyledImage
                src={URL.createObjectURL(images[index])}
                alt={`Upload Preview ${index}`}
                onClick={() => onImageClick(images[index])}
              />
              <StCoverImageButton
                isActive={isCoverImage(images[index])}
                onClick={() => onCoverButtonClick(images[index])}
              >
                대표
              </StCoverImageButton>
            </>
          ) : (
            <StyledVideo src={URL.createObjectURL(images[index])} controls />
          )}
        </StyledImageContainer>
      ))}
      <StCenteredBox>
        <StPlusButton onClick={onAddImage}>
          <FileUpload />
          <p>{`${images.length} / 5`}</p>
        </StPlusButton>
      </StCenteredBox>
    </StSlideContainer>
  );
};
