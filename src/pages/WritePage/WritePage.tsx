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
        <textarea />
      </CommonLayout>
    </>
  );
};
