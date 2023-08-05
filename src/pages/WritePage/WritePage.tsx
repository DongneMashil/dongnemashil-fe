import { Input } from 'components/common';
import React, { ChangeEvent, useRef, useState } from 'react';
import { StHiddenButton, StPlusButton } from './WritePage.styles';

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

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
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

  const onButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const onSlideButtonHandeler = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentPage((prev) => (prev === 0 ? images.length : prev - 1));
    } else {
      setCurrentPage((prev) => (prev === images.length ? 0 : prev + 1));
    }
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
      <div style={{ position: 'relative', minHeight: '200px' }}>
        <button onClick={() => onSlideButtonHandeler('left')}>Prev</button>

        {/* 현재 페이지가 images.length일 경우 +버튼을 보여줍니다. */}
        {currentPage === images.length ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <StPlusButton onClick={onButtonClick}>+</StPlusButton>
          </div>
        ) : images[currentPage].startsWith('data:image') ? (
          <img
            src={images[currentPage]}
            alt={`Upload Preview ${currentPage}`}
          />
        ) : (
          <video src={images[currentPage]} controls />
        )}

        <button onClick={() => onSlideButtonHandeler('right')}>Next</button>

        <StHiddenButton
          ref={fileInputRef}
          type="file"
          accept="image/*, video/*"
          multiple
          onChange={onFileChange}
        />
      </div>
      <textarea />
    </>
  );
};
