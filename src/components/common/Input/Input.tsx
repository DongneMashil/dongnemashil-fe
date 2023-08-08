import React from 'react';
import { StInput } from './Input.styles';

interface InputProps {
  type?: string;
  name?: string;
  id?: string; // undefined일 경우 name값으로 동일하게 할당
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const Input = ({
  type = 'text',
  name = '',
  id = name,
  value = '',
  onChange = () => {},
  placeholder = '',
}: InputProps) => {
  return (
    <StInput
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
