import React, { useState } from 'react';
import { StButton, StSubmitButton } from './Button.styles';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'components/common';

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
    | 'circle'
    | 'commentInput';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  url?: string;
  inputType?: 'button' | 'submit';
  value?: string;
  $width?: string;
  $height?: string;
  $round?: string;
  $stroke?: string;
  $active?: boolean;
  $shadow?: boolean;
  modal?: {
    title?: string;
    firstLine?: string;
    secondLine?: string;
  };
}

export const Button = ({
  children,
  type = 'normal',
  onClick,
  url,
  inputType = 'button',
  $width,
  $height,
  $round,
  $stroke,
  $shadow,
  $active = true,
  modal: {
    title: modalTitle = '',
    firstLine: modalFirstLine = '',
    secondLine: modalSecondLine = '',
  } = {},
}: ButtonProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <>
      <Modal
        isOpen={isModalOpen}
        onCloseHandler={() => setIsModalOpen(false)}
        title={modalTitle}
        firstLine={modalFirstLine}
        secondLine={modalSecondLine || undefined}
      />
      <StSubmitButton
        type="submit"
        className={type}
        onClick={$active ? onClick : () => setIsModalOpen(true)}
        $active={$active}
      >
        {children}
      </StSubmitButton>
    </>
  ) : (
    <StButton
      className={type}
      onClick={handleButtonClick}
      $width={$width}
      $height={$height}
      $round={$round}
      $stroke={$stroke}
      $shadow={$shadow}
      $active={$active}
    >
      {children}
    </StButton>
  );
};
