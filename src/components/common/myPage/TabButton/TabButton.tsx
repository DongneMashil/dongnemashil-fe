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
  width: 50%;
  height: 3rem;
  border: none;
  border-radius: 1.2rem 1.1rem 0 0;
  background-color: ${({ $selected }) => ($selected ? '#fff' : '#f5f5f5')};
  box-shadow: ${({ $selected }) =>
    $selected ? '-2px -5px 20px 2px rgba(0, 0, 0, 0.1)' : 'none'};
  cursor: pointer;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  &:hover {
    color: #8f6c8f;
  }
  z-index: 1;
`;
