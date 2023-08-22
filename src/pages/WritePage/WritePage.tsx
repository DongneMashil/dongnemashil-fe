import React, { ChangeEvent, useRef, useState } from 'react';
import { StContentContainer } from './WritePage.styles';
import { CommonLayout, NavBar } from 'components/layout';
import { useMutation } from '@tanstack/react-query';
import { submitReview, updateReview } from 'api/reviews';
import { useNavigate } from 'react-router-dom';
import {
  ReviewForm,
  TagContainer,
  useWritePageState,
} from 'components/writePage';
import { getExtensionName } from 'components/myProfilePage';
import { MediaFileType } from 'recoil/mediaFile/mediaFileAtom';
import { getImageMimeType, getVideoMimeType } from 'utils';

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

  const mutation = useMutation(submitReview);

  const updateMutation = useMutation((formData: FormData) =>
    updateReview(reviewId, formData)
  );

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
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

    validFiles.forEach((file) => {
      const fileType: 'image' | 'video' = file.type.startsWith('image/')
        ? 'image'
        : 'video';
      hooksSetMediaFiles((prev) => {
        const updatedFiles = [
          ...prev,
          { type: fileType, file, isCover: false },
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

  const onSubmithandler = async () => {
    if (hookFormValues.title.trim() === '') {
      alert('제목을 입력해주세요.');
      return;
    }

    if (hookFormValues.content.trim() === '') {
      alert('내용을 입력해주세요.');
      return;
    }

    if (selectedTags.length === 0) {
      alert('태그를 최소 하나 선택해주세요.');
      return;
    }

    if (hookMediaFiles.length === 0) {
      alert('최소 하나의 이미지를 선택해야 합니다.');
      return;
    }
    if (!hookMediaFiles.some((file) => file.type === 'image')) {
      alert('최소 하나의 이미지를 추가해야 합니다.');
      return;
    }

    const formData = new FormData();
    const jsonData = {
      title: hookFormValues.title,
      content: hookFormValues.content,
      address: addressData.fullAddress,
      roadName: addressData.roadName,
      tag: selectedTags,
    };

    const blob = new Blob([JSON.stringify(jsonData)], {
      type: 'application/json',
    });
    formData.append('data', blob);

    const coverImage = hookMediaFiles.find(
      (file) => file.isCover && file.type === 'image'
    );
    try {
      if (coverImage) {
        if (typeof coverImage.file === 'string') {
          const response = await fetch(
            `${coverImage.file}?timestamp=${Date.now()}`
          );
          if (!response.ok) {
            throw new Error(
              `Failed to fetch cover image: ${response.statusText}`
            );
          }
          const imageBlob = await response.blob();
          const finalFileName = getExtensionName(coverImage.file);
          const imageMimeType = getImageMimeType(finalFileName);
          const imageFile = new File([imageBlob], `image.${finalFileName}`, {
            type: imageMimeType,
          });
          formData.append('mainImgUrl', imageFile);
        } else {
          formData.append('mainImgUrl', coverImage.file);
        }
      }

      for (const file of hookMediaFiles) {
        if (typeof file.file === 'string') {
          const response = await fetch(`${file.file}?timestamp=${Date.now()}`);
          if (!response.ok) {
            throw new Error(
              `Failed to fetch cover image: ${response.statusText}`
            );
          }
          const blob = await response.blob();
          const finalFileName = getExtensionName(file.file);
          const fileMimeType =
            file.type === 'image'
              ? getImageMimeType(finalFileName)
              : getVideoMimeType(finalFileName);
          const fileObject = new File([blob], `file.${finalFileName}`, {
            type: fileMimeType,
          });

          if (file.type === 'image' && !file.isCover) {
            formData.append('subImgUrl', fileObject, finalFileName);
          } else if (file.type === 'video') {
            formData.append('videoUrl', fileObject, finalFileName);
          }
        } else {
          if (file.type === 'image' && !file.isCover) {
            formData.append('subImgUrl', file.file);
          } else if (file.type === 'video') {
            formData.append('videoUrl', file.file);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching the media file:', error);
      return;
    }

    if (reviewId) {
      updateMutation.mutate(formData, {
        onSuccess: (response) => {
          console.log('수정 성공', response);
          navigate(`/review/${response.id}`);
        },
        onError: (error: unknown) => {
          if (typeof error === 'string') {
            console.log('수정 실패', error);
          } else if (error instanceof Error) {
            console.log('수정 실패', error.message);
          } else {
            console.log('수정 실패', error);
          }
        },
      });
    } else {
      mutation.mutate(formData, {
        onSuccess: (response) => {
          console.log('등록성공', response);
          navigate(`/review/${response.id}`);
        },
        onError: (error: unknown) => {
          if (typeof error === 'string') {
            console.log('실패', error);
          } else if (error instanceof Error) {
            console.log('실패', error.message);
          } else {
            console.log('실패', error);
          }
        },
      });
    }
  };

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
            onClickSubmit={onSubmithandler}
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
