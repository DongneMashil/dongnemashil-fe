import React from 'react';
import { StButton, StSubmitButton } from './Button.styles';
import { useNavigate } from 'react-router-dom';

export interface ButtonProps {
  children?: React.ReactNode;
  type?:
    | 'icon'
    | 'normal'
    | 'borderRound'
    | 'circleFill'
    | 'onlyText'
    | 'onlyTextToggle'
    | 'authKakao'
    | 'authNormal'
    | 'authOutline'
    | 'iconLeft'
    | 'confirm'
    | 'circle';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  url?: string;
  inputType?: 'button' | 'submit';
  value?: string;
  $width?: string;
  $height?: string;
  $round?: string;
  $stroke?: string;
  $active?: boolean;
}

export const Button = ({
  children,
  type = 'normal',
  onClick,
  url,
  inputType = 'button',
  value,
  $width,
  $height,
  $round,
  $stroke,
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
      onClick={$active ? handleButtonClick : () => {}}
      value={value}
      $width={$width}
      $height={$height}
      $round={$round}
      $stroke={$stroke}
      $active={$active}
    />
  ) : (
    <StButton
      className={type}
      onClick={handleButtonClick}
      $width={$width}
      $height={$height}
      $round={$round}
      $stroke={$stroke}
      $active={$active}
    >
      {children}
    </StButton>
  );
};
