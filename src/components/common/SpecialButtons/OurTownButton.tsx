import React from 'react';
import { styled } from 'styled-components';

interface OurTownButtonProps {
  onClick?: () => void;
}
export const OurTownButton = ({ onClick = () => {} }: OurTownButtonProps) => {
  return (
    <StOurTownButtonContainer onClick={onClick}>
      <StText>우리 동네</StText>
    </StOurTownButtonContainer>
  );
};

const StOurTownButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 3.3rem;
  height: 3.3rem;

  background-color: #8f6c8f;
  opacity: 0.9;
  border-radius: 50%;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.18);

  cursor: pointer;
`;

const StText = styled.p`
  width: 2rem;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
