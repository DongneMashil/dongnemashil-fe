import React, { useCallback, useState } from 'react';
import { StButton, StProfileButton } from './Button.styles';
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
    | 'commentInput'
    | 'login';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  url?: string;
  inputType?: 'button' | 'submit' | 'profile';
  value?: string;
  $width?: string;
  $height?: string;
  $round?: string;
  $stroke?: string;
  $active?: boolean;
  $shadow?: boolean;
  $opacity?: string;
  modal?: {
    title?: string;
    firstLine?: string;
    secondLine?: string;
  };
  ariaLabel?: string;
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
  $opacity,
  $active = true,
  modal: {
    title: modalTitle = '',
    firstLine: modalFirstLine = '',
    secondLine: modalSecondLine = '',
  } = {},
  ariaLabel,
}: ButtonProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (inputType === 'button') {
        if (url) {
          navigate(url);
        } else if (onClick) {
          onClick(e);
        }
      }
    },
    [inputType, url, onClick, navigate]
  );

  const onSubmitButtonClickHandler = useCallback(() => {
    if ($active) {
      if (onClick) {
        onClick({} as React.MouseEvent<HTMLElement>);
      }
    } else {
      setIsModalOpen(true);
    }
  }, [onClick, $active, setIsModalOpen]);
  const onModalCloseHandler = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return inputType === 'profile' ? (
    <>
      <Modal
        isOpen={isModalOpen}
        onCloseHandler={onModalCloseHandler}
        title={modalTitle}
        firstLine={modalFirstLine}
        secondLine={modalSecondLine || undefined}
      />
      <StProfileButton
        aria-label={ariaLabel}
        type="submit"
        className={type}
        onClick={onSubmitButtonClickHandler}
        $active={$active}
      >
        {children}
      </StProfileButton>
    </>
  ) : (
    <StButton
      aria-label={ariaLabel}
      className={type}
      onClick={handleButtonClick}
      $width={$width}
      $height={$height}
      $round={$round}
      $stroke={$stroke}
      $shadow={$shadow}
      $active={$active}
      $opacity={$opacity}
    >
      {children}
    </StButton>
  );
};
