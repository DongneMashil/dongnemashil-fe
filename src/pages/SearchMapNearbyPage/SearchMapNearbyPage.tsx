import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
import { Map } from 'components/common';
import { BackButton } from 'components/common';
import { LocationButton } from 'components/common';
import {
  StNearbyLocationButtonBox,
  StNearStNearbyMapContainer,
} from './SearchMapNearbyPage.styles';
import { NearbyReviewsList, fetchNearbyReviews } from 'api/reviewsApi';
import Marker from 'assets/icons/Marker.png';
import MarkerSelected from 'assets/icons/MarkerSelected.png';
import Icon from 'assets/logo/DongDong.svg';
import Tooltip from 'assets/images/Tooltip.svg';

const RADIUS = 2;

export const SearchMapNearbyPage = () => {
  const navigate = useNavigate();

  const onBackHandler = () => {
    navigate(-1);
  };

  const mapInstance = useRef<kakao.maps.Map | null>(null);

  // 현위치 마커 (중복)
  const showCurrentLocation = (map: kakao.maps.Map, loc: kakao.maps.LatLng) => {
    const curPosMarker = new kakao.maps.CustomOverlay({
      position: loc,
      content: `
            <div style="
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
    curPosMarker.setMap(map);
    setCenter(map, loc, true);
  };

  const getCurrentLocation = () => {
    return new Promise<kakao.maps.LatLng>((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const location = new kakao.maps.LatLng(
              pos.coords.latitude,
              pos.coords.longitude
            );
            resolve(location);
          },
          (error) => {
            // handle the error here if necessary
            console.error(error.message);
            resolve(new kakao.maps.LatLng(37.545043, 127.039245)); // fallback to default location in case of error
          }
        );
      } else {
        resolve(new kakao.maps.LatLng(37.545043, 127.039245)); // fallback to default location if geolocation is not available
      }
    });
  };

  // 중복
  const setCurrentLocation = async (map: kakao.maps.Map) => {
    console.log('moveToCurrentLocation 진입');
    const location: kakao.maps.LatLng = await getCurrentLocation();
    await showCurrentLocation(map, location);
    setCenter(map, location, true);
  };

  // 지도 중심 이동 (중복)
  const setCenter = (
    map: kakao.maps.Map,
    location: kakao.maps.LatLng,
    isPanTo: boolean = false
  ) => {
    isPanTo ? map.panTo(location) : map.setCenter(location);
  };

  // ! 이동한 마커 위도 경도 받아오기

  const initMap = async (map: kakao.maps.Map) => {
    const zoomLevel = map.getLevel();
    let selectedMarker: kakao.maps.Marker | null = null;
    let selectedOverlay: kakao.maps.CustomOverlay | null = null;

    const markerImage = new kakao.maps.MarkerImage(
      Marker,
      new kakao.maps.Size(21, 28)
    );
    const markerSelectedImage = new kakao.maps.MarkerImage(
      MarkerSelected,
      new kakao.maps.Size(36, 48)
    );

    mapInstance.current = map;

    // 줌 레벨 낮추기
    map.setLevel(zoomLevel + 4);

    // 현위치 가져오기
    const curUserPos = await getCurrentLocation();

    // 원 반경 표시하기
    const circle = new kakao.maps.Circle({
      center: curUserPos,
      radius: RADIUS * 1000,
      strokeWeight: 1,
      strokeColor: '#B5A6CA',
      strokeOpacity: 0.3,
      strokeStyle: 'solid',
      fillColor: '#B5A6CA',
      fillOpacity: 0.2,
    });
    circle.setMap(map);

    // 정보 받아오기
    const reviewList: NearbyReviewsList[] = await fetchNearbyReviews(
      curUserPos.getLat(),
      curUserPos.getLng(),
      RADIUS
    );

    // 마커 및 오버레이 세팅
    for (let i = 0; i < reviewList.length; ++i) {
      const data = reviewList[i];
      if (data.latitude && data.longitude) {
        try {
          const coord = new kakao.maps.LatLng(data.latitude, data.longitude);

          // 마커 생성
          const marker = new kakao.maps.Marker({
            image: markerImage,
            position: coord,
          });
          marker.setMap(map);

          // 툴팁 생성
          const overlay = new kakao.maps.CustomOverlay({
            position: coord,
            content: `<div style="background-image: url(${Tooltip}); width: 192px; height: 208px; padding: 10px 14px 34px;">
            <a href="/review/${data.id}" style="display: block; position: relative; width:164px; height: 164px; border-radius: 12px; overflow: hidden;">
            <img src='${data.smallMainImgUrl}' style="position: absolute; top: 0; left: 0; transform: translate(50, 50); width: 100%; height: 100%; object-fit: cover; margin: auto;"/>
            </a>
            </div>`,
            xAnchor: 0.495,
            yAnchor: 1.22,
            clickable: true,
          });

          kakao.maps.event.addListener(marker, 'click', () => {
            if (!selectedMarker) {
              marker.setImage(markerSelectedImage);
            }
            if (selectedMarker !== marker) {
              marker.setImage(markerSelectedImage);
              selectedMarker?.setImage(markerImage);
              selectedOverlay?.setMap(null);
            }
            overlay.setMap(map); // 툴팁 열기 이벤트 리스너 추가
            selectedMarker = marker;
            selectedOverlay = overlay;
          });
          kakao.maps.event.addListener(map, 'click', () => {
            selectedMarker?.setImage(markerImage);
            selectedMarker = null;
            overlay.setMap(null); // 툴팁 닫기 이벤트 리스너 추가
          });
        } catch (err) {
          console.error('Error fetching coordinates for address:', data, err);
        }
      }
    }
  };

  useEffect(() => {
    if (mapInstance.current) {
      setCurrentLocation(mapInstance.current);
    }
  }, []);

  return (
    <StNearStNearbyMapContainer>
      <Map width="100%" height="100%" initMap={initMap} />
      <BackButton onClick={onBackHandler} />
      <StNearbyLocationButtonBox>
        <LocationButton />
      </StNearbyLocationButtonBox>
    </StNearStNearbyMapContainer>
  );
};

// 동동이 붙이기
// currentPosButton 태현님걸로

// 1. 데이터를 받아온다. (어디서?)
// 2. 맵을 유저 위치로 초기화한다.
// 3. 데이터를 마커로 뿌려준다.
// 4. initMap에서
// 1) 마커 설정
// 2) 마커에 이벤트 핸들러 추가
// 5. 마커 이동 기능을 추가한다.
// 6. 마커 이동시 새로 api 호출
// 7. 리렌더링
