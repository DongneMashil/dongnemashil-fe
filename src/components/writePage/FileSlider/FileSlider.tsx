import React from 'react';
import {
  StCenteredBox,
  StCoverImageButton,
  StSlideContainer,
  StPlusButton,
  StImage,
  StImageContainer,
  StVideo,
  StDelete,
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
  onDeleteImage: (file: File) => void;
  previewFiles: { type: 'image' | 'video'; file: File }[];
  previewImages: File[];
}

export const FileSlider: React.FC<ImageSliderProps> = ({
  images,
  onAddImage,
  onSelectedCoverImage,
  isCoverImage,
  setCoverImage,
  files,
  onDeleteImage,
  previewFiles,
  previewImages,
}) => {
  const onImageClick = (image: File) => {
    onSelectedCoverImage && onSelectedCoverImage(image);
  };

  const onCoverButtonClick = (image: File) => {
    setCoverImage(image);
  };

  const onImageDelete = (file: File) => {
    onDeleteImage(file);
  };

  return (
    <StSlideContainer>
      {files.map((file, index) => (
        <StImageContainer key={index}>
          {file.type === 'image' ? (
            <>
              <StImage
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
            <StVideo src={URL.createObjectURL(images[index])} controls />
          )}
          <StDelete onClick={() => onImageDelete(file.file)}>x</StDelete>
        </StImageContainer>
      ))}
      {previewFiles &&
        previewFiles.map((previewFile, index) => (
          <StImageContainer key={index}>
            {previewFile.type === 'image' ? (
              <>
                <StImage
                  src={URL.createObjectURL(previewFile.file)}
                  alt={`Preview ${index}`}
                  onClick={() => onImageClick(previewFile.file)}
                />
              </>
            ) : (
              <StVideo src={URL.createObjectURL(previewFile.file)} controls />
            )}
            <StDelete onClick={() => onImageDelete(previewFile.file)}>
              x
            </StDelete>
          </StImageContainer>
        ))}
      <StCenteredBox>
        <StPlusButton onClick={onAddImage}>
          <FileUpload />
          <p>{`${images.length + previewImages.length} / 5`}</p>
        </StPlusButton>
      </StCenteredBox>
    </StSlideContainer>
  );
};
