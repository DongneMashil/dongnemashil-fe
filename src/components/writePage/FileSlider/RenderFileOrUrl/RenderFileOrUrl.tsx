/* eslint-disable react/prop-types */
import React from 'react';
import { MediaFile, MediaFileType } from 'recoil/mediaFile/mediaFileAtom';
import {
  StCoverImageButton,
  StImage,
  StVideoTablet,
} from './RenderFileOrUrl.styles';
import StVideoComponent from './Video';

interface RenderFileOrUrlProps {
  file: MediaFile;
  index: number;
  onImageClick: (image: MediaFileType) => void;
  isCoverImage: (image: MediaFileType) => boolean;
  onCoverButtonClick: (image: MediaFileType) => void;
  images: MediaFileType[];
}

export const RenderFileOrUrl: React.FC<RenderFileOrUrlProps> = React.memo(
  ({ file, index, onImageClick, isCoverImage, onCoverButtonClick, images }) => {
    const isFileObject = typeof file.file === 'object';
    const url = isFileObject
      ? URL.createObjectURL(file.file as File)
      : (file.file as string);


      const handleButtonClick = () => {
        onCoverButtonClick(file.file);
        
        const button = document.getElementById("coverImageButton");
        if (button && isCoverImage(images[index])) {
          button.style.background = '#9A7B9A';
          button.style.border = 'none';
        } else if (button) {
          button.style.background = 'rgba(154, 123, 154, 0.35)';
          button.style.border = '1.5px solid white';
        }
      };

    return file.type === 'image' ? (
      <>
        <StImage
          src={url}
          alt={`Upload Preview ${index}`}
          onClick={() => onImageClick(file.file)}
        />
        <StCoverImageButton
          onClick={handleButtonClick}
        >
          대표
        </StCoverImageButton>
      </>
    ) : (
      <StVideoTablet>
        <StVideoComponent src={url} />
      </StVideoTablet>
    );
  }
);

RenderFileOrUrl.displayName = 'RenderFileOrUrl';
