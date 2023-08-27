import React from 'react';
import { ReactComponent as Icon } from 'assets/icons/CurrentPosition.svg';
import { StCurrentPosButton } from './CurrentPosButton.styles';

export const CurrentPosButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <StCurrentPosButton onClick={onClick}>
      <Icon />
    </StCurrentPosButton>
  );
};
