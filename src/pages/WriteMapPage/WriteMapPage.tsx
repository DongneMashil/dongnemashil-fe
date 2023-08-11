import React, { useState } from 'react';
import { CommonLayout } from 'components/layout';
import {
  StCurrentLocationContainer,
  StCurrentLocationText,
  StCurrentLocationTitle,
  StInputWrapper,
  StMarker,
  StPostButton,
} from './WriteMapPage.styles.ts';
import { Geolocation } from 'components/writeMapPage';

export const WriteMapPage = () => {
  const [currentAddress, setCurrentAddress] = useState<string>('');

  return (
    <CommonLayout>
      <StCurrentLocationContainer>
        <StCurrentLocationTitle>
          산책 지점을 먼저 선택해주세요!
        </StCurrentLocationTitle>
        <StInputWrapper>
          <StMarker />
          <StCurrentLocationText>
            현위치: {currentAddress}
          </StCurrentLocationText>
        </StInputWrapper>
        <StPostButton>글 작성</StPostButton>
      </StCurrentLocationContainer>
      <Geolocation onAddressUpdate={setCurrentAddress} />
    </CommonLayout>
  );
};
