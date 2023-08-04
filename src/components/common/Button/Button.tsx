import React from 'react';
import { TempButton } from './Button.styles';

interface InputProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export const Button = ({ label, onClick }: InputProps) => {
  return <TempButton onClick={onClick}>{label}</TempButton>;
};

export default Button;
