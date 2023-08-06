import { Input } from 'components/common';
import React, { ChangeEvent, useRef, useState } from 'react';
import { StHiddenButton } from './WritePage.styles';
import { FileSlider } from 'components/WritePage/FileSlider/FileSlider';
import { CommonLayout, NavBar } from 'components/layout';

interface FormValues {
  title: string;
  content: string;
}

export const WritePage = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    title: '',
    content: '',
  });
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    const videoFiles = files.filter((file) => file.type.startsWith('video/'));

    const currentVideoCount = videoUrl ? 1 : 0; // 비디오가 있으면 1, 없으면 0
    const currentImageCount = imageUrls.length;

    if (
      currentImageCount +
        currentVideoCount +
        imageFiles.length +
        videoFiles.length >
      5
    ) {
      alert('이미지와 동영상의 합은 최대 5개까지 가능합니다.😱');
      return;
    }

    if (currentVideoCount + videoFiles.length > 1) {
      alert('비디오는 한개만 가능합니다.😱');
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = function () {
        if (file.type.startsWith('image/')) {
          setImageUrls((prevUrls) => [...prevUrls, reader.result as string]);
        } else if (file.type.startsWith('video/')) {
          setVideoUrl(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <CommonLayout
        header={
          <NavBar btnLeft={'back'} btnRight={'submit'}>
            주소값
          </NavBar>
        }
      >
        <div>header</div>
        <Input
          type="text"
          name="title"
          value={formValues.title}
          onChange={onInputChange}
        />
        <FileSlider
          images={[...imageUrls, videoUrl].filter(Boolean) as string[]}
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
        <textarea />
      </CommonLayout>
    </>
  );
};
