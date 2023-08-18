import React from 'react';
import { StBackButton } from './BackButton.styles';
import { ReactComponent as Back } from 'assets/icons/Back.svg';

interface BackButtonProps {
  onClick?: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <StBackButton onClick={onClick}>
      <Back />
    </StBackButton>
  );
};
