import { useMutation } from '@tanstack/react-query';
import { submitReview, updateReview } from 'api/reviews';
import { MediaFile } from 'recoil/mediaFile/mediaFileAtom';
import { getExtensionName } from 'components/myProfilePage';
import { getImageMimeType, getVideoMimeType } from 'utils';
import { useNavigate } from 'react-router-dom';

type UseSubmitHandlerProps = {
  reviewId: number;
  formValues: { title: string; content: string };
  mediaFiles: MediaFile[];
  selectedTags: string[];
  addressData: { fullAddress: string; roadName: string };
};

export const useSubmitHandler = ({
  reviewId,
  formValues,
  mediaFiles,
  selectedTags,
  addressData,
}: UseSubmitHandlerProps) => {
  const navigate = useNavigate();
  const mutation = useMutation(submitReview);

  const updateMutation = useMutation((formData: FormData) =>
    updateReview(reviewId, formData)
  );

  const getStringByteSize = (s: string): number => {
    return encodeURI(s).split(/%..|./).length - 1;
  };

  const handleSubmit = async () => {
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

    if (getStringByteSize(formValues.title) > 500) {
      alert('제목은 500바이트를 초과합니다.');
      return;
    }

    if (getStringByteSize(formValues.content) > 500) {
      alert('내용은 500바이트를 초과합니다.');
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

      for (const file of mediaFiles) {
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

  return { handleSubmit };
};
