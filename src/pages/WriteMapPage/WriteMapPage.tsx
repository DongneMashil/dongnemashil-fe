import React from 'react';
import MapWrapper from 'components/common/Map/MapWrapper';
import { CommonLayout } from 'components/layout';
import {
  StCurrentLocationContainer,
  StCurrentLocationText,
  StCurrentLocationTitle,
  StInputWrapper,

  StPostButton,
} from './WriteMapPage.styles.ts';
import { Geolocation } from 'components/WriteMapPage/index.js';
// import { ReactComponent as Marker } from 'assets/icons/Marker.svg';

export const WriteMapPage = () => {
  return (
    <CommonLayout>
      <StCurrentLocationContainer>
        <StCurrentLocationTitle>
          산책 지점을 먼저 선택해주세요!
        </StCurrentLocationTitle>
        <StInputWrapper>
          <Geolocation />
          <StCurrentLocationText>현위치</StCurrentLocationText>
        </StInputWrapper>
        <StPostButton>글 작성</StPostButton>
      </StCurrentLocationContainer>
      <MapWrapper />
    </CommonLayout>
  );
};
