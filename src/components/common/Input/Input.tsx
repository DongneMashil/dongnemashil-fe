import React from 'react';

interface InputProps {
  type: string;
  name: string;
  id?: string; // undefined일 경우 name값으로 동일하게 할당
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  type,
  name,
  id = name,
  value,
  onChange,
}: InputProps) => {
  return (
    <input type={type} id={id} name={name} value={value} onChange={onChange} />
  );
};
