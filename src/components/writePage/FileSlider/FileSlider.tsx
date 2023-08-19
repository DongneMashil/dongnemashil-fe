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
import { ReactComponent as TrashCan } from 'assets/icons/TrashCan.svg';
import { MediaFile, MediaFileType } from 'recoil/mediaFile/mediaFileAtom';


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
  const onImageClick = (image: MediaFileType) => {
    onSelectedCoverImage && onSelectedCoverImage(image);
  };

  const onCoverButtonClick = (image: MediaFileType) => {
    setCoverImage(image);
  };

  const onImageDelete = (file: MediaFileType) => {
    onDeleteImage(file);
  };

  const renderFileOrUrl = (file: MediaFile, index: number) => {
    const isFileObject = typeof file.file === 'object';
    const url = isFileObject
      ? URL.createObjectURL(file.file as File)
      : (file.file as string);

    return file.type === 'image' ? (
      <>
        <StImage
          src={url}
          alt={`Upload Preview ${index}`}
          onClick={() => onImageClick(file.file)}
        />
        <StCoverImageButton
          isActive={isCoverImage(images[index])}
          onClick={() => onCoverButtonClick(file.file)}
        >
          대표
        </StCoverImageButton>
      </>
    ) : (
      <StVideo src={url} controls />
    );
  };

  return (
    <StSlideContainer>
      {files.map((file, index) => (
        <StImageContainer key={index}>
          {renderFileOrUrl(file, index)}
          <StDelete onClick={() => onImageDelete(file.file)}>
            <TrashCan />
          </StDelete>
        </StImageContainer>
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
