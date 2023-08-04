import { Input } from 'components/common';
import React, { ChangeEvent, useState } from 'react';

interface FormValues {
  title: string;
  content: string;
}

export const WritePage = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    title: '',
    content: '',
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div>header</div>
      <div>
        <Input
          type="text"
          name="title"
          value={formValues.title}
          onChange={onInputChange}
        />
      </div>
    </>
  );
};
