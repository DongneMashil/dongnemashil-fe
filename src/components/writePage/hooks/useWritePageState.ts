import { useEffect, useState, ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { addressSelector } from 'recoil/address/addressSelector';
import { selectedAddressAtom } from 'recoil/address/selectedAddressAtom';
import { useQuery } from '@tanstack/react-query';
import { getReview } from 'api/reviews';
import { getStringByteSize } from '../getStirngByTeSize/getStringBySize';

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
    const inputValue = e.target.value;
    const inputByteSize = getStringByteSize(inputValue);

    if (inputByteSize <= 500) {
      setFormValues({
        ...formValues,
        [name]: inputValue,
      });
    }
  };

  return {
    reviewId,
    reviewData,
    formValues,
    setFormValues,
    selectedTags,
    setSelectedTags,
    addressData,
    setAddress,
    onInputChange,
  };
};
