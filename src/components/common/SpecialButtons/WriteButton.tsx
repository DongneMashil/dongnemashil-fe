import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as Pen } from 'assets/icons/Pen.svg';
interface WiteButtonProps {
  onClick?: () => void;
}
export const WriteButton = ({ onClick = () => {} }: WiteButtonProps) => {
  return (
    <StWriteButtonContainer onClick={onClick}>
      <Pen />
    </StWriteButtonContainer>
  );
};

const StWriteButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 3.75rem;
  height: 3.75rem;

  background-color: rgba(247, 246, 246, 0.8);
  border: 2px solid #9a7b9a;
  border-radius: 50%;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.18);

  cursor: pointer;
`;
