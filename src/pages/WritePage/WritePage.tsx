import React, { ChangeEvent, useRef, useState } from 'react';
import { StContentContainer } from './WritePage.styles';
import { CommonLayout, NavBar } from 'components/layout';
import { useNavigate } from 'react-router-dom';
import {
  ReviewForm,
  TagContainer,
  useWritePageState,
} from 'components/writePage';
import { MediaFileType } from 'recoil/mediaFile/mediaFileAtom';
import { useSubmitHandler } from 'components/writePage/hooks/useSubmitHandler';
import imageCompression from 'browser-image-compression';

export const WritePage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    reviewId,
    formValues: hookFormValues,
    selectedTags,
    setSelectedTags,
    addressData,
    mediaFiles: hookMediaFiles,
    setMediaFiles: hooksSetMediaFiles,
    onInputChange,
  } = useWritePageState();

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const validFiles = files.filter((file) => {
      if (file.size > 100 * 1024 * 1024) {
        alert(`${file.name} 파일은 100MB를 초과하므로 업로드할 수 없습니다.😱`);
        return false;
      }
      return true;
    });

    if (hookMediaFiles.length + validFiles.length > 5) {
      alert('이미지와 동영상의 합은 최대 5개까지 가능합니다.😱');
      return;
    }

    if (
      hookMediaFiles.filter((file) => file.type === 'video').length +
        validFiles.filter((file) => file.type.startsWith('video/')).length >
      1
    ) {
      alert('동영상은 한개만 가능합니다.😱');
      return;
    }

    const compressionOptions = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1440,
      useWebWorker: true,
    };

    const compressedFiles = await Promise.all(
      validFiles.map(async (file) => {
        if (file.type.startsWith('image/')) {
          return await imageCompression(file, compressionOptions);
        }
        return file;
      })
    );

    compressedFiles.forEach((compressedFile) => {
      const fileType: 'image' | 'video' = compressedFile.type.startsWith(
        'image/'
      )
        ? 'image'
        : 'video';
      hooksSetMediaFiles((prev) => {
        const updatedFiles = [
          ...prev,
          { type: fileType, file: compressedFile, isCover: false },
        ];

        if (fileType === 'image' && !prev.some((p) => p.isCover)) {
          const index = updatedFiles.length - 1;
          updatedFiles[index].isCover = true;
        }

        return updatedFiles;
      });
    });
  };

  const setCoverImage = (targetFile: MediaFileType) => {
    hooksSetMediaFiles((prev) =>
      prev.map((file) =>
        file.file === targetFile
          ? { ...file, isCover: true }
          : { ...file, isCover: false }
      )
    );
  };

  const onDeleteImage = (targetFile: MediaFileType) => {
    hooksSetMediaFiles((prev) =>
      prev.filter((file) => file.file !== targetFile)
    );
  };

  const handleTagChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const { handleSubmit } = useSubmitHandler({
    reviewId,
    formValues: hookFormValues,
    mediaFiles: hookMediaFiles,
    selectedTags,
    addressData,
  });

  const determineIsCoverImage = (targetFile: MediaFileType) => {
    const file = hookMediaFiles.find((file) => file.file === targetFile);
    return file ? file.isCover : false;
  };

  const onGoToWriteMapPageHandler = () => {
    if (reviewId) {
      navigate('/writemap', { state: { reviewId: reviewId } });
    } else {
      navigate('/writemap');
    }
  };

  return (
    <>
      <CommonLayout
        header={
          <NavBar
            btnLeft={'back'}
            btnRight={'submit'}
            onClickSubmit={handleSubmit}
            $isWritePage={true}
          >
            {addressData.roadName}
          </NavBar>
        }
      >
        <StContentContainer>
          <TagContainer
            selectedTags={selectedTags}
            handleTagChange={handleTagChange}
            addressData={addressData}
            onGoToWriteMapPageHandler={onGoToWriteMapPageHandler}
          />
          <ReviewForm
            formValues={hookFormValues}
            onInputChange={onInputChange}
            mediaFiles={hookMediaFiles}
            onFileChange={onFileChange}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onAddImage={onButtonClick}
            setCoverImage={setCoverImage}
            onDeleteImage={onDeleteImage}
            determineIsCoverImage={determineIsCoverImage}
            fileInputRef={fileInputRef}
          />
        </StContentContainer>
      </CommonLayout>
    </>
  );
};
