import React from 'react';
import {
  StCurrentLocationContainer,
  StCurrentLocationText,
  StCurrentLocationTitle,
  StInputWrapper,
  StMarker,
  StMaxSize,
  StPostButton,
  StTablet,
  StWirteMapContainer,
} from './WriteMapPage.styles.ts';
import { Geolocation } from 'components/mapWritePage';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { addressSelector } from 'recoil/address/addressSelector';
import {
  latitudeAtom,
  longitudeAtom,
  selectedAddressAtom,
} from 'recoil/address/selectedAddressAtom';
import { BackButton } from 'components/common';

export const WriteMapPage = () => {
  const addressData = useRecoilValue(addressSelector);
  const selectedAddress = useRecoilValue(selectedAddressAtom);
  const setCurrentAddress = useSetRecoilState(selectedAddressAtom);
  const setLatitude = useSetRecoilState(latitudeAtom);
  const setLongitude = useSetRecoilState(longitudeAtom);
  const navigate = useNavigate();
  const location = useLocation();
  const reviewId = location.state?.reviewId;

  const disableCurrentLocation = location.state?.fromSearch || false;

  const updateLocation = (lat: number, lon: number) => {
    setLatitude(lat);
    setLongitude(lon);
  };

  const onGoWritePageHandler = () => {
    if (reviewId) {
      navigate(`/write/${reviewId}`, { state: { reviewId: reviewId } });
    } else {
      navigate('/write');
    }
  };

  const onGoWriteMapSearchPageHandler = () => {
    if (reviewId) {
      navigate('/writemap/search', { state: { reviewId: reviewId } });
    } else {
      navigate('/writemap/search');
    }
  };

  const onGoBackHandler = () => {
    window.history.back();
  };

  return (
    <StWirteMapContainer>
      <BackButton onClick={onGoBackHandler} />
      <StCurrentLocationContainer>
        <StMaxSize>
          <StCurrentLocationTitle>
            산책 지점을 먼저 선택해주세요!
          </StCurrentLocationTitle>
          <StTablet>
            <StInputWrapper>
              <StMarker />
              <StCurrentLocationText onClick={onGoWriteMapSearchPageHandler}>
                현위치: {addressData.fullAddress}
              </StCurrentLocationText>
            </StInputWrapper>
            <StPostButton onClick={onGoWritePageHandler}>글 작성</StPostButton>
          </StTablet>
        </StMaxSize>
      </StCurrentLocationContainer>
      <Geolocation
        selectedAddress={selectedAddress}
        onAddressUpdate={setCurrentAddress}
        onLocationUpdate={updateLocation}
        disableCurrentLocation={disableCurrentLocation}
      />
    </StWirteMapContainer>
  );
};
