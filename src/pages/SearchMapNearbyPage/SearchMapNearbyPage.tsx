import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map } from 'components/common';
import { BackButton } from 'components/common';
import { StNearbyMapContainer } from './SearchMapNearbyPage.styles';
import { NearbyReviewsList, fetchNearbyReviews } from 'api/reviewsApi';
import Marker from 'assets/icons/Marker.svg';
import MarkerSelected from 'assets/icons/MarkerSelected.svg';
import Tooltip from 'assets/images/Tooltip.svg';

const RADIUS = 2;

export const SearchMapNearbyPage = () => {
  const navigate = useNavigate();
  const startPoint = useRef({ x: 0, y: 0 });
  const overlayPoint = useRef({ x: 0, y: 0 });
  const startX = useRef(0);
  const startY = useRef(0);
  const startOverlayPoint = useRef<kakao.maps.Point | null>(null);
  const [reviewList, setReviewList] = useState<NearbyReviewsList[]>([]);
  const markers = useRef<kakao.maps.Marker[]>([]);
  const overlays = useRef<kakao.maps.CustomOverlay[]>([]);
  const selectedMarker = useRef<kakao.maps.Marker | null>(null);
  const selectedOverlay = useRef<kakao.maps.CustomOverlay | null>(null);

  const onBackHandler = () => {
    navigate(-1);
  };

  const mapInstance = useRef<kakao.maps.Map | null>(null);

  // 유저 현재 위치
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
            console.error(error.message);
            resolve(new kakao.maps.LatLng(37.545043, 127.039245));
          }
        );
      } else {
        resolve(new kakao.maps.LatLng(37.545043, 127.039245));
      }
    });
  };

  // 지도 중심 이동 (중복)
  const setCenter = (
    map: kakao.maps.Map,
    location: kakao.maps.LatLng,
    isPanTo: boolean = false
  ) => {
    isPanTo ? map.panTo(location) : map.setCenter(location);
  };

  const initMap = async (map: kakao.maps.Map) => {
    const zoomLevel = map.getLevel();
    // let curPosMarker: kakao.maps.Marker | null = null;
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
    const newList: NearbyReviewsList[] = await fetchNearbyReviews(
      curUserPos.getLat(),
      curUserPos.getLng(),
      RADIUS
    );
    setReviewList(newList);

    // 유저 현위치 마커
    const curCoord = new kakao.maps.LatLng(
      curUserPos.getLat(),
      curUserPos.getLng()
    );

    const content = document.createElement('div');
    content.className = 'overlay';

    const curPosOverlay = new kakao.maps.CustomOverlay({
      map: map,
      position: curCoord,
      content: content,
      zIndex: 10,
    });

    curPosOverlay.setMap(map);
    setCenter(map, curCoord);

    // 현위치 오버레이 이벤트 함수
    const onMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      // console.log('onMove');
      const { clientX, clientY } = getClientPosition(e);
      const proj = map.getProjection();
      const deltaX = startPoint.current.x - clientX;
      const deltaY = startPoint.current.y - clientY;
      const newPoint = new kakao.maps.Point(
        overlayPoint.current.x - deltaX,
        overlayPoint.current.y - deltaY
      );
      const newPos = proj.coordsFromContainerPoint(newPoint);

      curPosOverlay.setPosition(newPos);
      circle.setPosition(newPos);
    };

    const onEnd = async () => {
      // console.log('onEnd');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('touchmove', onMove);
      const newPos = curPosOverlay.getPosition();
      const newList: NearbyReviewsList[] = await fetchNearbyReviews(
        newPos.getLat(),
        newPos.getLng(),
        RADIUS
      );
      setReviewList(newList);
    };

    const onStart = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();

      // console.log('onStart');
      const { clientX, clientY } = getClientPosition(e);
      const proj = map.getProjection();
      const overlayPos = curPosOverlay.getPosition();

      kakao.maps.event.preventMap();

      startX.current = clientX;
      startY.current = clientY;
      startOverlayPoint.current = proj.containerPointFromCoords(overlayPos);

      document.addEventListener('mousemove', onMove);
      document.addEventListener('touchmove', onMove);
    };

    // console.log(content);
    content.addEventListener('mousedown', onStart);
    content.addEventListener('touchstart', onStart);
    content.addEventListener('mouseup', onEnd);
    content.addEventListener('touchend', onEnd);

    setMarkers(map);
  };

  const getClientPosition = (e: MouseEvent | TouchEvent) => {
    if (e instanceof TouchEvent && e.touches.length > 0) {
      return {
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
      };
    } else if (e instanceof MouseEvent) {
      return {
        clientX: e.clientX,
        clientY: e.clientY,
      };
    }
    return { clientX: 0, clientY: 0 };
  };

  const setMarkers = (map: kakao.maps.Map) => {
    const markerImage = new kakao.maps.MarkerImage(
      Marker,
      new kakao.maps.Size(21, 28)
    );
    const markerSelectedImage = new kakao.maps.MarkerImage(
      MarkerSelected,
      new kakao.maps.Size(36, 48)
    );

    emptyMarkers();

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
          markers.current.push(marker);

          // 툴팁 생성
          const overlay = new kakao.maps.CustomOverlay({
            position: coord,
            content: `<div style="background-image: url(${Tooltip}); width: 184px; height: 208px; padding: 10px 10px 34px;">
            <a href="/review/${data.id}" style="display: block; position: relative; width:164px; height: 164px; border-radius: 12px; overflow: hidden;">
            <img src='${data.smallMainImgUrl}' style="position: absolute; top: 0; left: 0; transform: translate(50, 50); width: 100%; height: 100%; object-fit: cover; margin: auto;"/>
            </a>
            </div>`,
            xAnchor: 0.5,
            yAnchor: 1.22,
            clickable: true,
          });
          overlays.current.push(overlay);

          kakao.maps.event.addListener(marker, 'click', () => {
            if (!selectedMarker.current) {
              marker.setImage(markerSelectedImage);
            } else if (selectedMarker.current !== marker) {
              marker.setImage(markerSelectedImage);
              selectedMarker.current.setImage(markerImage);
              selectedOverlay.current?.setMap(null);
              selectedMarker.current.setZIndex(0);
              selectedOverlay.current?.setZIndex(0);
            }
            overlay.setMap(map); // 툴팁 열기 이벤트 리스너 추가
            selectedMarker.current = marker;
            selectedOverlay.current = overlay;

            selectedMarker.current.setZIndex(100);
            selectedOverlay.current.setZIndex(100);
          });
          kakao.maps.event.addListener(map, 'click', () => {
            selectedMarker.current?.setImage(markerImage);
            selectedMarker.current = null;
            overlay.setMap(null); // 툴팁 닫기 이벤트 리스너 추가
          });
        } catch (err) {
          console.error('Error fetching coordinates for address:', data, err);
        }
      }
    }
  };

  const emptyMarkers = () => {
    for (let i = 0; i < markers.current.length; ++i) {
      markers.current[i].setMap(null);
      overlays.current[i].setMap(null);
    }
    selectedMarker.current = null;
    selectedOverlay.current = null;
  };

  useEffect(() => {
    if (mapInstance.current) {
      setMarkers(mapInstance.current);
    }
    return () => {
      emptyMarkers();
    };
  }, [reviewList]);

  return (
    <StNearbyMapContainer>
      <Map width="100%" height="100%" initMap={initMap} />
      <BackButton onClick={onBackHandler} />
    </StNearbyMapContainer>
  );
};

// 6. 마커 이동시 새로 api 호출
// 7. 리렌더링
