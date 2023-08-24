import React from 'react';
import { ReactComponent as Location } from 'assets/icons/Location.svg';
import { StLocationButton } from './LocationButton.styles';

interface BackButtonProps {
  onClick?: () => void;
}

export const LocationButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <StLocationButton onClick={onClick}>
      <Location />
    </StLocationButton>
  );
};
