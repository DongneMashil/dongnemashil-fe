import React from 'react';
import { StTabButtonContainer } from './TabButton.styles';
interface TabButtonProps {
  children: React.ReactNode;
  selected: boolean;
  onClick?: () => void | undefined;
}
export const TabButton = ({ children, selected, onClick }: TabButtonProps) => {
  return (
    <StTabButtonContainer onClick={onClick} $selected={selected}>
      {children}
    </StTabButtonContainer>
  );
};
