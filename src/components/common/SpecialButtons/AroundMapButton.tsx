import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as AroundMap } from 'assets/icons/SeeMapMarker.svg';

interface AroundMapButtonProps {
  onClick?: () => void;
}
export const AroundMapButton = ({
  onClick = () => {},
}: AroundMapButtonProps) => {
  return (
    <StAroundMapButtonContainer onClick={onClick}>
      <AroundMap />
      <StText>지도 보기</StText>
    </StAroundMapButtonContainer>
  );
};

const StAroundMapButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 1.6875rem;
  width: fit-content;
  background-color: #9a7b9a;
  opacity: 0.9;
  border-radius: 1rem;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.18);

  padding: 0.5rem 0.8rem;
  gap: 0.4rem;
  cursor: pointer;
`;

const StText = styled.h5`
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
