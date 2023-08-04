import { Button } from 'components/common';
import React from 'react';
import { StLocationWrapper,StLocationBox } from './WriteMapPage.styles.ts';
export const WriteMapPage = () => {

  return (
    <>
      <div>
        <Button url={"/"} />
        <span>좋았던 산책 지점을 선택해주세요</span>
      </div>
      <div>지도가 들어갈 부분</div>
      <StLocationWrapper>
        <StLocationBox>위치 들어갈 div</StLocationBox>
        <Button url="/write" />
      </StLocationWrapper>
    </>
  );
};
