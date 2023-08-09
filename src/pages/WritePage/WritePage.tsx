import React, { ChangeEvent, useRef, useState } from 'react';
import {
  StContentBox,
  StContentContainer,
  StHiddenButton,
  StTagBox,
  StTagWwrapper,
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
  const tags = [
    '한적',
    '연인',
    '동물',
    '사진',
    '아기',
    '자전거',
    '비',
    '밤',
    '그늘',
    '화장실',
    '자연',
    '벤치',
  ];

  const [formValues, setFormValues] = useState<FormValues>({
    title: '',
    content: '',
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [mediaFiles, setMediaFiles] = useState<
    { type: 'image' | 'video'; url: string; isCover: boolean }[]
  >([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

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
          { type: fileType, url: reader.result as string, isCover: false },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const setCoverImage = (url: string) => {
    setMediaFiles((prev) =>
      prev.map((file) =>
        file.url === url
          ? { ...file, isCover: true }
          : { ...file, isCover: false }
      )
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  const mutation = useMutation(submitReview);

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmithandler = () => {
    if (mediaFiles.length === 0) {
      alert('이미지나 동영상을 무조건 하나 선택해야 합니다.');
      return;
    }
    const formData = new FormData();
    formData.append('title', formValues.title);
    formData.append('content', formValues.content);
    formData.append('address', '서울시 영등포구 여의동로 330');
    formData.append('tag', selectedTags.join(','));
    const coverImage = mediaFiles.find(
      (file) => file.isCover && file.type === 'image'
    );
    if (coverImage) {
      formData.append('mainImgUrl', coverImage.url);
    }
    mediaFiles.forEach((file) => {
      if (file.type === 'image' && !file.isCover) {
        formData.append('subImgUrl', file.url);
      } else if (file.type === 'video') {
        formData.append('videoUrl', file.url);
      }
    });
    mutation.mutate(formData, {
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

  const determineIsCoverImage = (url: string) => {
    const file = mediaFiles.find((file) => file.url === url);
    return file ? file.isCover : false;
  };

  const renderTags = () =>
    tags.map((tag) => (
      <StTagBox
        key={tag}
        onClick={() => toggleTag(tag)}
        $isSelected={selectedTags.includes(tag)}
      >
        {tag}
      </StTagBox>
    ));

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
            onSelectedCoverImage={setCoverImage}
            isCoverImage={determineIsCoverImage}
            setCoverImage={setCoverImage}
          />
          <StHiddenButton
            ref={fileInputRef}
            type="file"
            accept="image/*, video/*"
            multiple
            onChange={onFileChange}
          />
          <StTagWwrapper>{renderTags()}</StTagWwrapper>
          <StContentBox
            name="content"
            value={formValues.content}
            onChange={onInputChange}
            placeholder="산책은 어땠나요?"
          />
        </StContentContainer>
      </CommonLayout>
    </>
  );
};
