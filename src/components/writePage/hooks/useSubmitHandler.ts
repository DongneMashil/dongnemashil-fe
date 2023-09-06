import { useMutation } from '@tanstack/react-query';
import { submitReview, updateReview } from 'api/reviews';
import { MediaFile, mediaFilesAtom } from 'recoil/mediaFile/mediaFileAtom';
import { getExtensionName } from 'components/myProfilePage';
import { getImageMimeType, getVideoMimeType } from 'utils';
import { useNavigate } from 'react-router-dom';
import { getStringByteSize } from '../getStirngByTeSize/getStringBySize';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { formValuesAtom, selectedTagsAtom } from 'utils/formValues';
import { latitudeAtom, longitudeAtom } from 'recoil/address/selectedAddressAtom';

type UseSubmitHandlerProps = {
  reviewId: number;
  formValues: { title: string; content: string };
  mediaFiles: MediaFile[];
  selectedTags: string[];
  addressData: { fullAddress: string; roadName: string };
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalMessage: React.Dispatch<React.SetStateAction<string>>;

};

export const useSubmitHandler = ({
  reviewId,
  formValues,
  mediaFiles,
  selectedTags,
  addressData,
  setIsModalOpen,
  setModalMessage,
}: UseSubmitHandlerProps) => {
  const navigate = useNavigate();
  const mutation = useMutation(submitReview);
  const [isLoading, setIsLoading] = useState(false);

  const setStoredMediaFiles = useSetRecoilState(mediaFilesAtom);
  const setFormValues = useSetRecoilState(formValuesAtom);
  const setSelectedTags = useSetRecoilState(selectedTagsAtom);
  const setLatitude = useSetRecoilState(latitudeAtom);
  const setLongitude = useSetRecoilState(longitudeAtom);

  const updateMutation = useMutation((formData: FormData) =>
    updateReview(reviewId, formData)
  );

  const handleSubmit = async () => {
    if (formValues.title.trim() === '') {
      setModalMessage('제목을 입력해주세요.');
      setIsModalOpen(true);
      return;
    }

    if (formValues.content.trim() === '') {
      setModalMessage('내용을 입력해주세요.');
      setIsModalOpen(true);
      return;
    }

    if (selectedTags.length === 0) {
      setModalMessage('태그는 최소 하나 선택해주세요.');
      setIsModalOpen(true);
      return;
    }

    if (mediaFiles.length === 0) {
      setModalMessage('최소 하나의 이미지를 추가해야 합니다.');
      setIsModalOpen(true);
      return;
    }
    if (!mediaFiles.some((file) => file.type === 'image')) {
      setModalMessage('최소 하나의 이미지를 추가해야 합니다.');
      setIsModalOpen(true);
      return;
    }

    if (getStringByteSize(formValues.title) > 500) {
      setModalMessage('제목은 500바이트를 초과할 수 없습니다.');
      setIsModalOpen(true);
      return;
    }

    if (getStringByteSize(formValues.content) > 500) {
      setModalMessage('내용은 500바이트를 초과할 수 없습니다.');
      setIsModalOpen(true);
      return;
    }

    const formData = new FormData();
    const jsonData = {
      title: formValues.title,
      content: formValues.content,
      address: addressData.fullAddress,
      roadName: addressData.roadName,
      tag: selectedTags,
      latitude: setLatitude,
      longitude:setLongitude
    };

    const blob = new Blob([JSON.stringify(jsonData)], {
      type: 'application/json',
    });
    formData.append('data', blob);

    const coverImage = mediaFiles.find(
      (file) => file.isCover && file.type === 'image'
    );

    if (!coverImage) {
      setModalMessage('대표 이미지를 선택해주세요.');
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);

    try {
      if (coverImage) {
        if (typeof coverImage.file === 'string') {
          const response = await fetch(`${coverImage.file}?cacheblock=true`);
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

      let i = 0;
      for (const file of mediaFiles) {
        i++;
        if (typeof file.file === 'string' && !file.isCover) {
          const response = await fetch(`${file.file}?cacheblock=true`);
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
          const fileObject = new File([blob], `file${i}}.${finalFileName}`, {
            type: fileMimeType,
          });

          if (file.type === 'image' && !file.isCover) {
            formData.append('subImgUrl', fileObject);
          } else if (file.type === 'video') {
            formData.append('videoUrl', fileObject);
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
      return;
    }

    if (reviewId) {
      updateMutation.mutate(formData, {
        onSuccess: (response) => {
          navigate(`/review/${response.id}`);
          setStoredMediaFiles([]);
          setIsLoading(false);
          setFormValues({
            title: '',
            content: '',
          });
          setSelectedTags([]);
        },
        onError: (error: unknown) => {
          if (typeof error === 'string') {
            console.log('수정 실패', error);
          } else if (error instanceof Error) {
            console.log('수정 실패', error.message);
          } else {
            console.log('수정 실패', error);
          }
          setIsLoading(false);
        },
      });
    } else {
      mutation.mutate(formData, {
        onSuccess: (response) => {
          console.log('등록성공', response);
          navigate(`/review/${response.id}`);
          setStoredMediaFiles([]);
          setIsLoading(false);
          setFormValues({
            title: '',
            content: '',
          });
          setSelectedTags([]);
        },
        onError: (error: unknown) => {
          if (typeof error === 'string') {
            console.log('실패', error);
          } else if (error instanceof Error) {
            console.log('실패', error.message);
          } else {
            console.log('실패', error);
          }
          setIsLoading(false);
        },
      });
    }
  };
  useEffect(() => {
    return () => {
      setIsLoading(false);
      setStoredMediaFiles([]);
    };
  }, []);

  return { handleSubmit, isLoading };
};
