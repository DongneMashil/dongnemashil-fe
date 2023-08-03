import React from 'react';

interface InputProps {
  name: string;
  label: string;
  placeholder: string;
}

/**
 * @description Input 컴포넌트
 * @param {string} name - input name
 * @param {string} label - input label
 * @param {string} placeholder - input placeholder
 */
export const Input = ({ name, label, placeholder }: InputProps) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} name={name} placeholder={placeholder} />
    </div>
  );
};
