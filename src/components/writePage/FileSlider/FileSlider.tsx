import React from 'react';
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

  return (
    <StSlideContainer>
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
      <StCenteredBox>
        <StPlusButton onClick={onAddImage}>
          <FileUpload />
          <p>{`${images.length} / 5`}</p>
        </StPlusButton>
      </StCenteredBox>
    </StSlideContainer>
  );
};
