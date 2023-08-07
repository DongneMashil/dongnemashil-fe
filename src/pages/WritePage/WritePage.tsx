import React, { ChangeEvent, useRef, useState } from 'react';
import {
  StContentBox,
  StContentContainer,
  StHiddenButton,
  StTitle,
} from './WritePage.styles';
import { CommonLayout, NavBar } from 'components/layout';
import { FileSlider } from 'components/WritePage';
import { useMutation } from '@tanstack/react-query';
import { submitReview } from 'api/reviews';

interface FormValues {
  title: string;
  content: string;
}

export const WritePage = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    title: '',
    content: '',
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [mediaFiles, setMediaFiles] = useState<
    { type: 'image' | 'video'; url: string }[]
  >([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (mediaFiles.length + files.length > 5) {
      alert('이미지와 동영상의 합은 최대 5개까지 가능합니다.😱');
      return;
    }

    if (
      mediaFiles.filter((file) => file.type === 'video').length +
        files.filter((file) => file.type.startsWith('video/')).length >
      1
    ) {
      alert('동영상은 한개만 가능합니다.😱');
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = function () {
        const fileType = file.type.startsWith('image/') ? 'image' : 'video';
        setMediaFiles((prev) => [
          ...prev,
          { type: fileType, url: reader.result as string },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const mutation = useMutation(submitReview);

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmithandler = () => {
    const combinedUrls = mediaFiles.map((file) => file.url).join(',');
    const data = {
      title: formValues.title,
      content: formValues.content,
      img_url: combinedUrls,
      address: '서울시 영등포구 여의동로 330',
      tag: '태그입력값',
    };
    mutation.mutate(data, {
      onSuccess: (response) => {
        console.log('등록성공', response);
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
            주소값
          </NavBar>
        }
      >
        <StContentContainer>
          <StTitle
            type="text"
            name="title"
            value={formValues.title}
            onChange={onInputChange}
            placeholder="제목 입력"
          />
          <FileSlider
            images={mediaFiles.map((file) => file.url)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            onAddImage={onButtonClick}
          />
          <StHiddenButton
            ref={fileInputRef}
            type="file"
            accept="image/*, video/*"
            multiple
            onChange={onFileChange}
          />
          <StContentBox />
        </StContentContainer>
      </CommonLayout>
    </>
  );
};
