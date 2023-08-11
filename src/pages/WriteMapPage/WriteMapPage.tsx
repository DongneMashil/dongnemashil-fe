import React from 'react';
import { CommonLayout } from 'components/layout';
import {
  StCurrentLocationContainer,
  StCurrentLocationText,
  StCurrentLocationTitle,
  StInputWrapper,
  StMarker,
  StPostButton,
} from './WriteMapPage.styles.ts';
import { Geolocation } from 'components/mapWritePage';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { addressSelector } from 'recoil/address/addressSelector';
import { selectedAddressAtom } from 'recoil/address/selectedAddressAtom';

export const WriteMapPage = () => {
  const addressData = useRecoilValue(addressSelector);
  const setCurrentAddress = useSetRecoilState(selectedAddressAtom);
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
            현위치: {addressData.fullAddress}
          </StCurrentLocationText>
        </StInputWrapper>
        <StPostButton onClick={onGoWritePageHandler}>글 작성</StPostButton>
      </StCurrentLocationContainer>
      <Geolocation onAddressUpdate={setCurrentAddress} />
    </CommonLayout>
  );
};
