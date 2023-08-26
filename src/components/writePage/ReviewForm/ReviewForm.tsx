import React, { ChangeEvent, RefObject, useEffect, useState } from 'react';
import {
  StContentBox,
  StTitle,
  StHiddenButton,
  StFormWrapper,
  StByteSizeTag,
  StContentWrapper,
} from './ReviewForm.styles';
import { FileSlider } from '../FileSlider/FileSlider';
import { MediaFile, MediaFileType } from 'recoil/mediaFile/mediaFileAtom';
import { getStringByteSize } from '../getStirngByTeSize/getStringBySize';

interface ReviewFormProps {
  formValues: {
    title: string;
    content: string;
  };
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  mediaFiles: MediaFile[];
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  onAddImage: () => void;
  setCoverImage: (targetFile: MediaFileType) => void;
  onDeleteImage: (targetFile: MediaFileType) => void;
  determineIsCoverImage: (targetFile: MediaFileType) => boolean;
  fileInputRef: RefObject<HTMLInputElement>;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  formValues,
  onInputChange,
  mediaFiles,
  onFileChange,
  currentPage,
  setCurrentPage,
  onAddImage,
  setCoverImage,
  onDeleteImage,
  determineIsCoverImage,
  fileInputRef,
}) => {
  const [contentByteSize, setContentByteSize] = useState(0);

  useEffect(() => {
    setContentByteSize(getStringByteSize(formValues.content));
  }, [formValues.content]);

  return (
    <StFormWrapper>
      <StTitle
        type="text"
        name="title"
        value={formValues.title}
        onChange={onInputChange}
        placeholder="제목"
      />
      <FileSlider
        files={mediaFiles}
        images={mediaFiles.map((file) => file.file)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onAddImage={onAddImage}
        onSelectedCoverImage={setCoverImage}
        isCoverImage={determineIsCoverImage}
        setCoverImage={setCoverImage}
        onDeleteImage={onDeleteImage}
      />
      <StHiddenButton
        ref={fileInputRef}
        type="file"
        accept="image/*, video/*"
        multiple
        onChange={onFileChange}
      />
      <StContentWrapper>
        <StContentBox
          name="content"
          value={formValues.content}
          onChange={onInputChange}
          placeholder="산책은 어땠나요?"
        />
        <StByteSizeTag>{contentByteSize} / 500</StByteSizeTag>
      </StContentWrapper>
    </StFormWrapper>
  );
};
