import { Button } from 'components/common';
import React from 'react';
import { StLocationContainer,StLocationBox } from './PostMapPage.styles';
export const PostMapPage = () => {

  return (
    <>
      <div>
        <Button url={"/"} />
        <span>좋았던 산책 지점을 선택해주세요</span>
      </div>
      <div>지도가 들어갈 부분</div>
      <StLocationContainer>
        <StLocationBox className='hello'>위치 들어갈 div</StLocationBox>
        <Button url="/post" />
      </StLocationContainer>
    </>
  );
};
