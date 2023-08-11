import React from 'react';
import {
  CenteredBox,
  CoverImageButton,
  SlideContainer,
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
  return (
    <SlideContainer>
      {files.map((file, index) => (
        <StyledImageContainer key={index}>
          {file.type === 'image' ? (
            <>
              <StyledImage
                src={URL.createObjectURL(images[index])}
                alt={`Upload Preview ${index}`}
                onClick={() =>
                  onSelectedCoverImage && onSelectedCoverImage(images[index])
                }
              />
              <CoverImageButton
                isActive={isCoverImage(images[index])}
                onClick={() => setCoverImage(images[index])}
              >
                대표
              </CoverImageButton>
            </>
          ) : (
            <StyledVideo src={URL.createObjectURL(images[index])} controls />
          )}
        </StyledImageContainer>
      ))}
      <CenteredBox>
        <StPlusButton onClick={onAddImage}>
          <FileUpload />
          <p>{`${images.length} / 5`}</p>
        </StPlusButton>
      </CenteredBox>
    </SlideContainer>
  );
};
