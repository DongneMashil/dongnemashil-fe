import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { LocationButton, Map } from 'components/common';
import { BackButton } from 'components/common';
import Marker from 'assets/icons/Marker.png';
import MarkerSelected from 'assets/icons/MarkerSelected.png';
import {
  StResultMapContainer,
  StLocationButtonBox,
} from './SearchResultMapPage.styles';
import { ReviewsList } from 'api/reviewsApi';
import Tooltip from 'assets/images/Tooltip.svg';
import Icon from 'assets/logo/DongDong.svg';

export const SearchResultMapPage = ({
  reviewList,
  onToggle,
}: {
  reviewList: ReviewsList[];
  onToggle: () => void;
}) => {
  const [initialMapPos, setInitialMapPos] = useState<kakao.maps.LatLng | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const hasInitialMapPosSet = useRef<boolean>(false);
  const tooltipImgPreload = () => {
    const img = new Image();
    img.src = Tooltip;
  };
  const mapInstance = useRef<kakao.maps.Map | null>(null);

  // 현위치 마커
  const showCurrentLocation = (map: kakao.maps.Map, loc: kakao.maps.LatLng) => {
    const curPosMarker = new kakao.maps.CustomOverlay({
      position: loc,
      content: `
              <div style="
                width:50px;
                height:50px;
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

  const moveToCurrentLocation = (map: kakao.maps.Map) => {
    console.log('moveToCurrentLocation 진입');
    setIsLoading(true);
    if (navigator.geolocation) {
      console.log('moveToCurrentLocation 분기 진입');
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const location = new kakao.maps.LatLng(
            pos.coords.latitude,
            pos.coords.longitude
          );
          // 동동이 띄우기
          await showCurrentLocation(map, location);
          setIsLoading(false);
        },
        () => {
          console.log('moveToCurrentLocation 에러 진입');
          const location = new kakao.maps.LatLng(37.545043, 127.039245);
          setCenter(map, location, true);
          onCurrentPosHandler();
          setIsLoading(false);
        }
      );
    }
  };

  // 지도 중심 이동
  const setCenter = (
    map: kakao.maps.Map,
    location: kakao.maps.LatLng,
    isPanTo: boolean = false
  ) => {
    isPanTo ? map.panTo(location) : map.setCenter(location);
  };

  // 주소 -> 좌표
  const addressSearch = (
    address: string
  ): Promise<{
    x: string;
    y: string;
  }> => {
    return new Promise((resolve, reject) => {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          resolve({ x: result[0].x, y: result[0].y });
        } else {
          reject(status);
        }
      });
    });
  };

  const initMap = async (map: kakao.maps.Map) => {
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

    // 마커 및 오버레이 세팅
    for (let i = 0; i < reviewList.length; ++i) {
      const data = reviewList[i];
      if (data.address) {
        try {
          const result = await addressSearch(data.address);
          const coord = new kakao.maps.LatLng(
            Number(result.y),
            Number(result.x)
          );
          if (!hasInitialMapPosSet.current) {
            setInitialMapPos(coord);
            hasInitialMapPosSet.current = true;
          }

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
          console.error(
            'Error fetching coordinates for address:',
            data.address,
            err
          );
        }
      }
    }
  };

  const onBackHandler = () => {
    onToggle();
  };

  const onClickCurPos = () => {
    console.log('onClickCurPos 진입');
    if (mapInstance.current) {
      console.log('onClickCurPos execute');
      moveToCurrentLocation(mapInstance.current);
    }
  };

  const onCurrentPosHandler = () => {
    if (mapInstance.current) {
      moveToCurrentLocation(mapInstance.current);
    } else {
      // console.log('no map instance found');
    }
  };

  useEffect(() => {
    if (initialMapPos && mapInstance.current) {
      setCenter(mapInstance.current, initialMapPos, false); // 첫 번째 마커 좌표로 지도 이동
    }
  }, [initialMapPos]);

  useLayoutEffect(() => {
    tooltipImgPreload();
  }, []);

  return (
    <StResultMapContainer>
      <Map width="100%" height="100%" initMap={initMap} />
      <BackButton onClick={onBackHandler} />
      <StLocationButtonBox>
        <LocationButton onClick={onClickCurPos} isLoading={isLoading} />
      </StLocationButtonBox>
    </StResultMapContainer>
  );
};
