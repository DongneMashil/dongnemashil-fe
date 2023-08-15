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
import { ReviewData } from 'pages';

interface ImageSliderProps {
  images: File[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  onAddImage: () => void;
  onSelectedCoverImage?: (file: File) => void;
  isCoverImage: (file: File) => boolean;
  setCoverImage: (file: File) => void;
  onDeleteImage: (file: File) => void;
  files: { type: 'image' | 'video'; file: File }[];
  reviewData?: ReviewData;
}

export const FileSlider: React.FC<ImageSliderProps> = ({
  images,
  onAddImage,
  onSelectedCoverImage,
  isCoverImage,
  setCoverImage,
  files,
  reviewData,
  onDeleteImage,
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

  console.log(typeof reviewData?.subImgUrl);

  return (
    <StSlideContainer>
      {files.map((file, index) => (
        <StImageContainer key={index}>
          {file.type === 'image' ? (
            <>
              <StImage
                src={URL.createObjectURL(file.file)}
                alt={`Upload Preview ${index}`}
                onClick={() => onImageClick(file.file)}
              />
              <StCoverImageButton
                isActive={isCoverImage(file.file)}
                onClick={() => onCoverButtonClick(file.file)}
              >
                대표
              </StCoverImageButton>
            </>
          ) : (
            <StVideo src={URL.createObjectURL(file.file)} controls />
          )}
          <StDelete onClick={() => onImageDelete(file.file)}>x</StDelete>
        </StImageContainer>
      ))}

      {reviewData && (
        <StImageContainer>
          {reviewData.mainImgUrl && (
            <StImage
              src={reviewData.mainImgUrl}
              alt="Main Review Image"
              onClick={() =>
                onImageClick(reviewData.mainImgUrl as unknown as File)
              }
            />
          )}
          {reviewData.mainImgUrl && (
            <StCoverImageButton
              isActive={isCoverImage(reviewData.mainImgUrl as unknown as File)}
              onClick={() =>
                onCoverButtonClick(reviewData.mainImgUrl as unknown as File)
              }
            >
              대표
            </StCoverImageButton>
          )}
          {reviewData.videoUrl && (
            <StVideo src={reviewData.videoUrl} controls />
          )}
          <StDelete
            onClick={() =>
              onDeleteImage(reviewData.mainImgUrl as unknown as File)
            }
          >
            x
          </StDelete>
        </StImageContainer>
      )}

      <StCenteredBox>
        <StPlusButton onClick={onAddImage}>
          <FileUpload />
          <p>{`${images.length} / 5`}</p>
        </StPlusButton>
      </StCenteredBox>
    </StSlideContainer>
  );
};
