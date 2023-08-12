import React from 'react';
import { StButton, StSubmitButton } from './Button.styles';
import { useNavigate } from 'react-router-dom';

export interface ButtonProps {
  children?: React.ReactNode;
  type?:
    | 'icon'
    | 'normal'
    | 'circle'
    | 'onlytext'
    | 'onlytexttoggle'
    | 'authKakao'
    | 'authNormal'
    | 'authOutline';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  url?: string;
  inputType?: 'button' | 'submit';
  value?: string;
  $active?: boolean;
}

export const Button = ({
  children,
  type = 'normal',
  onClick,
  url,
  inputType = 'button',
  value,
  $active = true,
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
    <StSubmitButton
      type="submit"
      className={type}
      onClick={handleButtonClick}
      value={value}
    />
  ) : (
    <StButton className={type} onClick={handleButtonClick} $active={$active}>
      {children}
    </StButton>
  );
};
