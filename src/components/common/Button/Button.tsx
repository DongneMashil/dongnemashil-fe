import React from 'react';
import { StButton, StSubmitButton } from './Button.styles';
import { useNavigate } from 'react-router-dom';

export interface ButtonProps {
  children?: React.ReactNode;
  type?: 'icon' | 'normal' | 'circle' | 'onlytext';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  url?: string;
  inputType?: 'button' | 'submit';
}

export const Button = ({
  children,
  type = 'normal',
  onClick,
  url,
  inputType = 'button',
}: ButtonProps) => {
  const navigate = useNavigate();

  const handleButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    if (inputType === 'button') {
      if (url) {
        navigate(url);
      } else if (onClick) {
        onClick(e);
      }
    }
  };

  return inputType === 'submit' ? (
    <StSubmitButton className={type} onClick={handleButtonClick}>
      {' '}
      {children}
    </StSubmitButton>
  ) : (
    <StButton className={type} onClick={handleButtonClick}>
      {children}
    </StButton>
  );
};
