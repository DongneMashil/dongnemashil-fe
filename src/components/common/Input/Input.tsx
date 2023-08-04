import React from 'react';
import { styled } from 'styled-components';

interface InputProps {
  name: string;
  label: string;
  placeholder: string;
}

/**
 * @description Input 컴포넌트. 크기는 부모 컴포넌트에 따라 달라짐
 * @param {string} name - input name
 * @param {string} label - input label
 * @param {string} placeholder - input placeholder
 */
export const Input = ({ name, label, placeholder }: InputProps) => {
  return (
    <InputLayout>
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} name={name} placeholder={placeholder} />
    </InputLayout>
  );
};

export const InputLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  label {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  input {
    border: none;
    border-radius: 0.25rem;
    padding: 0.5rem;
    font-size: 1rem;
    outline: none;
    &:focus {
      border-color: #495057;
      box-shadow: 0 0 0 0.1rem rgb(0 123 255 / 25%);
    }
  }
`;
