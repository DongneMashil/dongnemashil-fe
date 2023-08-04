import React from 'react';
import { StTempButton } from './TempButton.styles';

export interface TempButtonProps {
  children?: React.ReactNode;
  colorType?: 'black' | 'blue';
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const TempButton = ({
  children,
  colorType = 'black',
  onClick,
}: TempButtonProps) => {
  return (
    <StTempButton $colorType={colorType} onClick={onClick}>
      {children}
    </StTempButton>
  );
};
