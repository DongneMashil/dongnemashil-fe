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
import { useNavigate } from 'react-router-dom';

export const WriteMapPage = () => {
  const [currentAddress, setCurrentAddress] = useState<string>('');
  const navigate = useNavigate();

  const onGoWritePageHandler = () => {
    navigate('/write');
  };

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
        <StPostButton onClick={onGoWritePageHandler}>글 작성</StPostButton>
      </StCurrentLocationContainer>
      <Geolocation onAddressUpdate={setCurrentAddress} />
    </CommonLayout>
  );
};
