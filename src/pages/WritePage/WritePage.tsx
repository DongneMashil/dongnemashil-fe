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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
  
    if (imageFiles.length > 5) {
      alert('You can select up to 5 images.');
      return;
    }

    const newImages = imageFiles.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = function() {
          resolve(reader.result as string);
        }
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newImages).then(setImages);
  };

  const onButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
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
      <div>
        <div>이미지</div>
        <div>
          <StPlusButton onClick={onButtonClick}>+</StPlusButton>
          <StHiddenButton
            ref={fileInputRef}
            type="file"
            accept="image/*, video/*"
            multiple
            onChange={onFileChange}
          />
        </div>
        {images.map((image, index) => (
          <img src={image} key={index} alt={`Upload Preview ${index}`} />
        ))}
      </div>
      <textarea />
    </>
  );
};
