import React from 'react';
import { ReactComponent as Location } from 'assets/icons/Location.svg';
import { StLocationButton } from './LocationButton.styles';
import { StLoadingSpinner } from '../LoadingSpinner/LoadingSpinner.styles';

interface BackButtonProps {
  onClick?: () => void;
  distance?: number | null;
  isDistanceVisible?: boolean;
  isLoading?: boolean;
}

export const LocationButton: React.FC<BackButtonProps> = ({
  onClick,
  distance,
  isDistanceVisible = false,
  isLoading = false,
}) => {
  return (
    <StLocationButton onClick={onClick}>
      {isLoading ? (
        <StLoadingSpinner />
      ) : isDistanceVisible && distance ? (
        `${distance}km`
      ) : (
        <Location />
      )}
      {}
    </StLocationButton>
  );
};
