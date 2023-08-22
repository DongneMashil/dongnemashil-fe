import { useEffect, useState, ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { addressSelector } from 'recoil/address/addressSelector';
import { mediaFilesAtom } from 'recoil/mediaFile/mediaFileAtom';
import { selectedAddressAtom } from 'recoil/address/selectedAddressAtom';
import { urlToMediaFile } from 'utils';
import { useQuery } from '@tanstack/react-query';
import { getReview } from 'api/reviews';

interface FormValues {
  title: string;
  content: string;
}

export const useWritePageState = () => {
  const location = useLocation();
  const reviewId = location.state?.reviewId;

  const [formValues, setFormValues] = useState<FormValues>({
    title: '',
    content: '',
  });

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const addressData = useRecoilValue(addressSelector);
  const [mediaFiles, setMediaFiles] = useRecoilState(mediaFilesAtom);
  const setAddress = useSetRecoilState(selectedAddressAtom);
  const selectedAddress = useRecoilValue(selectedAddressAtom);

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

      const mediaFilesData = [
        urlToMediaFile(reviewData.mainImgUrl, 'image', true),
        ...reviewData.subImgUrl
          .filter((url) => url.trim() !== '')
          .map((url) => urlToMediaFile(url, 'image', false)),
        reviewData.videoUrl
          ? urlToMediaFile(reviewData.videoUrl, 'video', false)
          : null,
      ].filter(Boolean) as {
        type: 'image' | 'video';
        file: string;
        isCover: boolean;
      }[];

      setMediaFiles(mediaFilesData);
    }
  }, [reviewData]);

  useEffect(() => {
    if (selectedAddressAtom) {
      setAddress(selectedAddress);
    }
  }, [selectedAddress]);

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name as keyof FormValues;
    setFormValues({
      ...formValues,
      [name]: e.target.value,
    });
  };

  return {
    reviewId,
    formValues,
    setFormValues,
    selectedTags,
    setSelectedTags,
    addressData,
    mediaFiles,
    setMediaFiles,
    setAddress,
    onInputChange,
  };
};
