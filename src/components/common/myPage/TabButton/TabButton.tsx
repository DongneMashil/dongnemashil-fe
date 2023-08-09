import React from 'react';
import { styled } from 'styled-components';
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

export const StTabButtonContainer = styled.button<{ $selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem 1rem;
  // width: 50%;
  // height: 3rem;
  border: ${({ $selected }) => ($selected ? '1px solid #d5d5d5' : 'none')};
  border-radius: 1rem;
  background-color: ${({ $selected }) => ($selected ? '#fff' : '#f5f5f5')};

  cursor: pointer;
  font-size: 0.82rem;
  font-style: normal;
  font-weight: ${({ $selected }) => ($selected ? '600' : '300')};

  z-index: 1;
  margin: 0.5rem 0;
`;
