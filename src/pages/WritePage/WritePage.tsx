import { Input } from 'components/common';
import React, { ChangeEvent, useRef, useState } from 'react';
import { StHiddenButton } from './WritePage.styles';
import { FileSlider } from 'components/WritePage/FileSlider/FileSlider';

interface FormValues {
  title: string;
  content: string;
}

export const WritePage = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    title: '',
    content: '',
  });
  const [images, setImages] = useState<string[]>([]);
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

    const currentVideoCount = images.filter((img) =>
      img.startsWith('data:video')
    ).length;
    const currentImageCount = images.length - currentVideoCount;

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

    const newItems: string[] = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = function () {
        newItems.push(reader.result as string);

        if (newItems.length === files.length) {
          setImages((prevImages) => [...prevImages, ...newItems]);
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
      <div>header</div>
      <Input
        type="text"
        name="title"
        value={formValues.title}
        onChange={onInputChange}
      />
      <FileSlider
        images={images}
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
    </>
  );
};
