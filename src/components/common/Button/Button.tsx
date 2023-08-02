import React from 'react';

interface InputProps {
  label: string;
  onclick: () => void;
}

export const Button = ({ label, onclick }: InputProps) => {
  return <button onClick={onclick}>{label}</button>;
};

export default Button;
