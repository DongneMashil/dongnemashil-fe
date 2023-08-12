import { CommonLayout, NavBar } from 'components/layout';
import React from 'react';
import { StMarker, StSearchBox, StSearchInput, StSearchWrapper } from './WriteMapSearch.styles';

export const WriteMapSearch = () => {
  return (
    <CommonLayout
      header={
        <NavBar btnLeft={'back'} btnRight={null}>
          위치 검색
        </NavBar>
      }
    >
      <StSearchWrapper>
        <StSearchBox>
          <StMarker />
          <StSearchInput type="text" placeholder="주소" />
        </StSearchBox>
      </StSearchWrapper>
    </CommonLayout>
  );
};
