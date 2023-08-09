import React from 'react';
import { StButton } from './Button.styles';
import { useNavigate } from 'react-router-dom';

export interface ButtonProps {
  children?: React.ReactNode;
  type?: 'icon' | 'normal' | 'circle' | 'onlytext';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  url?: string;
}

export const Button = ({
  children,
  type = 'normal',
  onClick,
  url,
}: ButtonProps) => {
  const navigate = useNavigate();

  return (
    <StButton className={type} onClick={url ? () => navigate(url) : onClick}>
      {children}
    </StButton>
  );
};
