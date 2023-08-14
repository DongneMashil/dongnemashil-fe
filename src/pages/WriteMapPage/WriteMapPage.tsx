import React from 'react';
import { CommonLayout } from 'components/layout';
import {
  StBackButton,
  StCurrentLocationContainer,
  StCurrentLocationText,
  StCurrentLocationTitle,
  StInputWrapper,
  StMarker,
  StPostButton,
} from './WriteMapPage.styles.ts';
import { Geolocation } from 'components/mapWritePage';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { addressSelector } from 'recoil/address/addressSelector';
import { selectedAddressAtom } from 'recoil/address/selectedAddressAtom';
import { ReactComponent as Back } from 'assets/icons/Back.svg';

export const WriteMapPage = () => {
  const addressData = useRecoilValue(addressSelector);
  const selectedAddress = useRecoilValue(selectedAddressAtom);
  const setCurrentAddress = useSetRecoilState(selectedAddressAtom);
  const navigate = useNavigate();
  const location = useLocation();

  const disableCurrentLocation = location.state?.fromSearch || false;

  const onGoWritePageHandler = () => {
    if (addressData.fullAddress.includes('서울')) {
      navigate('/write');
    } else {
      alert('서울특별시만 가능합니다😱');
    }
  };

  const onGoWriteMapSearchPageHandler = () => {
    navigate('/writemap/search');
  };

  const onGoBackHandler = () => {
    window.history.back();
  };

  return (
    <CommonLayout>
      <StBackButton onClick={onGoBackHandler}>
        <Back />
      </StBackButton>
      <StCurrentLocationContainer>
        <StCurrentLocationTitle>
          산책 지점을 먼저 선택해주세요!
        </StCurrentLocationTitle>
        <StInputWrapper>
          <StMarker />
          <StCurrentLocationText onClick={onGoWriteMapSearchPageHandler}>
            현위치: {addressData.fullAddress}
          </StCurrentLocationText>
        </StInputWrapper>
        <StPostButton onClick={onGoWritePageHandler}>글 작성</StPostButton>
      </StCurrentLocationContainer>
        <Geolocation
          selectedAddress={selectedAddress}
          onAddressUpdate={setCurrentAddress}
          disableCurrentLocation={disableCurrentLocation}
        />
    </CommonLayout>
  );
};
