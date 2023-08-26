/* eslint-disable react/prop-types */
import React from 'react';
import { MediaFile, MediaFileType } from 'recoil/mediaFile/mediaFileAtom';
import { StCoverImageButton, StImage, StVideo } from './RenderFileOrUrl.styles';

interface RenderFileOrUrlProps {
  file: MediaFile;
  index: number;
  onImageClick: (image: MediaFileType) => void;
  isCoverImage: (image: MediaFileType) => boolean;
  onCoverButtonClick: (image: MediaFileType) => void;
  images: MediaFileType[];
}

export const RenderFileOrUrl: React.FC<RenderFileOrUrlProps> = ({
  file,
  index,
  onImageClick,
  isCoverImage,
  onCoverButtonClick,
  images,
}) => {
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

RenderFileOrUrl.displayName = 'RenderFileOrUrl';