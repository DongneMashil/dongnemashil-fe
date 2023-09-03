interface Address {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_3depth_h_name: string;
  h_code: string;
  b_code: string;
  mountain_yn: string;
  main_address_no: string;
  sub_address_no: string;
  x: string;
  y: string;
}

interface RoadAddress {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  road_name: string;
  underground_yn: string;
  main_building_no: string;
  sub_building_no: string;
  building_name: string;
  zone_no: string;
  x: string;
  y: string;
}
interface KakaoSearchResult {
  address_name: string;
  address_type: 'REGION' | 'ROAD' | 'REGION_ADDR' | 'ROAD_ADDR';
  x: string;
  y: string;
  address: Address;
  road_address: RoadAddress;
}

type KakaoSearchStatus = 'OK' | 'ZERO_RESULT' | 'ERROR';

import { useEffect, useState } from 'react';
import React from 'react';
import Marker from 'assets/icons/Marker.svg';
import { StMapContainer, StMyLocationButton } from './DetailMap.styles';
import { LocationButton, Map } from 'components/common';
import { calculateDistance } from 'utils';
import Icon from 'assets/logo/DongDong.svg';

interface DetailMapProps {
  width: string;
  height: string;
  initMap: (
    map: kakao.maps.Map,
    setMapCenterByAddress: (address: string, map: kakao.maps.Map) => void
  ) => void;
}

export const DetailMap = ({ width, height, initMap }: DetailMapProps) => {
  const [showCurrentLocation, setShowCurrentLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewAddress, setReviewAddress] = useState<kakao.maps.LatLng | null>(
    null
  );
  const [currentLocation, setCurrentLocation] =
    useState<kakao.maps.LatLng | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const setMapCenterByAddress = async (
    address: string,
    map: kakao.maps.Map
  ) => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(
      address,
      function (result: KakaoSearchResult[], status: KakaoSearchStatus) {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(
            parseFloat(result[0].y),
            parseFloat(result[0].x)
          );
          setReviewAddress(coords);
          const svgMarkerImageSrc = Marker;
          const markerSize = new kakao.maps.Size(36, 48);
          const markerImage = new kakao.maps.MarkerImage(
            svgMarkerImageSrc,
            markerSize
          );
          new kakao.maps.Marker({
            position: coords,
            map: map, // 마커를 표시할 지도
            image: markerImage,
          });
          map.setCenter(coords);
        } else {
          console.error('Failed to get coordinates from the address.');
        }
      }
    );
  };

  const fitBoundsToMarkers = (
    map: kakao.maps.Map,
    positions: kakao.maps.LatLng[]
  ) => {
    const bounds = new kakao.maps.LatLngBounds();

    positions.forEach((position) => {
      bounds.extend(position);
    });

    map.setBounds(bounds);
  };

  const displayCurrentLocation = (map: kakao.maps.Map) => {
    setIsLoading(true); // 로딩 시작
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locPosition = new kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          setCurrentLocation(locPosition);

          // 빨간 점을 표시하는 CustomOverlay 생성
          const currentLocationOverlay = new kakao.maps.CustomOverlay({
            position: locPosition,
            content: `<div style="
                width:50px;
                height:51.23px;
                background-image: url(${Icon});
                animation: blink 1.5s infinite;
              ">
              </div>
              <style>
                @keyframes blink {
                  0% { opacity: 1; }
                  50% { opacity: 0; }
                  100% { opacity: 1; }
                }
              </style>
          `,
          });
          currentLocationOverlay.setMap(map);

          fitBoundsToMarkers(map, [locPosition, reviewAddress!]);
          setIsLoading(false); // 로딩 완료
        },
        (error) => {
          console.error('Geolocation failed: ', error);
          setIsLoading(false); // 로딩 실패
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const initializeMap = (map: kakao.maps.Map) => {
    if (showCurrentLocation) {
      displayCurrentLocation(map);
    } else if (initMap) {
      initMap(map, setMapCenterByAddress);
    }
  };

  useEffect(() => {
    const container = document.getElementById('map');
    if (!container) return;

    if (!map) {
      const options = {
        center: new kakao.maps.LatLng(37.545043, 127.039245),
        level: 5,
        scrollwheel: false,
      };

      const createdMap = new kakao.maps.Map(container, options);
      const zoomControl = new kakao.maps.ZoomControl();
      createdMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      setMap(createdMap);
    } else {
      initializeMap(map);
    }
  }, [showCurrentLocation, map]);

  const onClickMyLocation = () => {
    setShowCurrentLocation(true);
  };

  useEffect(() => {
    if (currentLocation && reviewAddress) {
      const calculatedDistance = calculateDistance(
        currentLocation.getLat(),
        currentLocation.getLng(),
        reviewAddress.getLat(),
        reviewAddress.getLng()
      );
      setDistance(Number(calculatedDistance.toFixed(0)));
    }
  }, [currentLocation]);

  return (
    <StMapContainer>
      <div id="map" style={{ width, height }}></div>
      <StMyLocationButton>
        <LocationButton
          isDistanceVisible={showCurrentLocation}
          distance={distance}
          onClick={onClickMyLocation}
          isLoading={isLoading}
        ></LocationButton>
      </StMyLocationButton>
    </StMapContainer>
  );
};

export default DetailMap;
