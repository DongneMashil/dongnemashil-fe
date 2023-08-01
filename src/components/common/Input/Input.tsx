import React from 'react';

interface InputProps {
  name: string;
  label: string;
  placeholder: string;
}

export const Input = ({ name, label, placeholder }: InputProps) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} name={name} placeholder={placeholder} />
    </div>
  );
};
