import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { StContentContainer } from './WritePage.styles';
import { CommonLayout, NavBar } from 'components/layout';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getReview, submitReview, updateReview } from 'api/reviews';
import { useLocation, useNavigate } from 'react-router-dom';
import { useVerifyUser } from 'hooks';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userIsLoggedInSelector } from 'recoil/userExample';
import { addressSelector } from 'recoil/address/addressSelector';
import { ReviewForm, TagContainer } from 'components/writePage';
import { selectedAddressAtom } from 'recoil/address/selectedAddressAtom';

interface FormValues {
  title: string;
  content: string;
}

export type MediaFileType = File | string;

export interface MediaFile {
  type: 'image' | 'video';
  file: MediaFileType;
  isCover: boolean;
}

export const WritePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const reviewId = location.state?.reviewId;
  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const addressData = useRecoilValue(addressSelector);
  const setAddress = useSetRecoilState(selectedAddressAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isLoading, isError, isSuccess } = useVerifyUser(true);
  const isLoggedIn = useRecoilValue(userIsLoggedInSelector);

  const updateMutation = useMutation((formData: FormData) =>
    updateReview(reviewId, formData)
  );

  const { data: reviewData } = useQuery(['review', reviewId], () =>
    getReview(reviewId)
  );

  useEffect(() => {
    if (reviewData) {
      setFormValues({
        title: reviewData.title,
        content: reviewData.content,
      });
      setSelectedTags(reviewData.tag.map((t) => t.name));
      setAddress(reviewData.address);

      const fetchMediaFiles = async () => {
        try {
          const mainImgBlob = await fetch(reviewData.mainImgUrl).then(
            (response) => response.blob()
          );
          const subImgPromises = reviewData.subImgUrl.map(async (url) => {
            if (url.trim() === '') {
              return null;
            }
            try {
              const response = await fetch(url);
              if (response.ok) {
                const blob = await response.blob();
                return blob;
              } else {
                console.error('Error fetching sub image:', response.statusText);
                return null;
              }
            } catch (error) {
              console.error('Error fetching sub image:', error);
              return null;
            }
          });

          const subImgBlobs = await Promise.all(subImgPromises);
          const validSubImgBlobs = subImgBlobs.filter((blob) => blob !== null);

          let videoBlob = null;
          if (reviewData.videoUrl) {
            videoBlob = await fetch(reviewData.videoUrl).then((response) =>
              response.blob()
            );
          }

          const blobToMediaFile = (
            blob: Blob | null,
            type: 'image' | 'video',
            isCover: boolean
          ) => {
            if (blob === null) {
              return null;
            }

            const fileName = type === 'image' ? 'image.jpg' : 'video.mp4';
            const file = new File([blob], fileName, { type });

            return {
              type,
              file,
              isCover,
            };
          };

          const mediaFilesData = [
            blobToMediaFile(mainImgBlob, 'image', true),
            ...validSubImgBlobs.map((blob) =>
              blobToMediaFile(blob, 'image', false)
            ),
            videoBlob ? blobToMediaFile(videoBlob, 'video', false) : null,
          ].filter(Boolean) as {
            type: 'image' | 'video';
            file: File;
            isCover: boolean;
          }[];
          setMediaFiles(mediaFilesData);
        } catch (error) {
          console.error('Error fetching and converting media files:', error);
        }
      };

      fetchMediaFiles();
    }
  }, [reviewData]);

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name as keyof FormValues;
    setFormValues({
      ...formValues,
      [name]: e.target.value,
    });
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const validFiles = files.filter((file) => {
      if (file.size > 100 * 1024 * 1024) {
        alert(`${file.name} 파일은 100MB를 초과하므로 업로드할 수 없습니다.😱`);
        return false;
      }
      return true;
    });

    if (mediaFiles.length + validFiles.length > 5) {
      alert('이미지와 동영상의 합은 최대 5개까지 가능합니다.😱');
      return;
    }

    if (
      mediaFiles.filter((file) => file.type === 'video').length +
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
      setMediaFiles((prev) => {
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
    setMediaFiles((prev) =>
      prev.map((file) =>
        file.file === targetFile
          ? { ...file, isCover: true }
          : { ...file, isCover: false }
      )
    );
  };

  const onDeleteImage = (targetFile: MediaFileType) => {
    setMediaFiles((prev) => prev.filter((file) => file.file !== targetFile));
  };

  const handleTagChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const mutation = useMutation(submitReview);

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmithandler = async () => {
    if (formValues.title.trim() === '') {
      alert('제목을 입력해주세요.');
      return;
    }

    if (formValues.content.trim() === '') {
      alert('내용을 입력해주세요.');
      return;
    }

    if (selectedTags.length === 0) {
      alert('태그를 최소 하나 선택해주세요.');
      return;
    }

    if (mediaFiles.length === 0) {
      alert('최소 하나의 이미지를 선택해야 합니다.');
      return;
    }
    if (!mediaFiles.some((file) => file.type === 'image')) {
      alert('최소 하나의 이미지를 추가해야 합니다.');
      return;
    }

    const formData = new FormData();
    const jsonData = {
      title: formValues.title,
      content: formValues.content,
      address: addressData.fullAddress,
      roadName: addressData.roadName,
      tag: selectedTags,
    };

    const blob = new Blob([JSON.stringify(jsonData)], {
      type: 'application/json',
    });
    formData.append('data', blob);

    const coverImage = mediaFiles.find(
      (file) => file.isCover && file.type === 'image'
    );
    if (coverImage) {
      formData.append('mainImgUrl', coverImage.file);
    }

    mediaFiles.forEach((file) => {
      if (file.type === 'image' && !file.isCover) {
        formData.append('subImgUrl', file.file);
      } else if (file.type === 'video') {
        formData.append('videoUrl', file.file);
      }
    });

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
    const file = mediaFiles.find((file) => file.file === targetFile);
    return file ? file.isCover : false;
  };

  if (isLoading) {
    console.log('Loading');
  }
  if (isError) {
    console.log('Error');
  }
  if (isSuccess) {
    console.log('Success, isLoggedIn: ', isLoggedIn);
  }

  const onGoToWriteMapPageHandler = () => {
    navigate('/writemap');
  };

  return (
    <>
      <CommonLayout
        header={
          <NavBar
            btnLeft={'back'}
            btnRight={'submit'}
            onClickSubmit={onSubmithandler}
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
            formValues={formValues}
            onInputChange={onInputChange}
            mediaFiles={mediaFiles}
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
