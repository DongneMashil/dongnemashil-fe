import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Map } from 'components/common';
// import { BackButton } from 'components/common';
// import { CurrentPosButton } from 'pages/SearchResultMapPage/CurrentPosButton/CurrentPosButton';

export const SearchMapNearbyPage = () => {
  // const navigate = useNavigate();
  // const onBackHandler = () => {
  //   navigate(-1);
  // };

  // const [initialMapPos, setInitialMapPos] = useState<kakao.maps.LatLng | null>(
  //   null
  // );

  // const mapInstance = useRef<kakao.maps.Map | null>(null);

  // const onCurrentPosHandler = () => {
  //   if (mapInstance.current) {
  //     moveToCurrentLocation(mapInstance.current);
  //   } else {
  //     console.log('no map instance found');
  //   }
  // };

  // const moveToCurrentLocation = (map: kakao.maps.Map) => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (pos) => {
  //         const location = new kakao.maps.LatLng(
  //           pos.coords.latitude,
  //           pos.coords.longitude
  //         );
  //         setCenter(map, location, true);
  //       },
  //       () => {
  //         const location = new kakao.maps.LatLng(37.545043, 127.039245);
  //         setCenter(map, location, true);
  //       }
  //     );
  //   }
  // };

  // // 지도 중심 이동
  // const setCenter = (
  //   map: kakao.maps.Map,
  //   location: kakao.maps.LatLng,
  //   isPanTo: boolean = false
  // ) => {
  //   isPanTo ? map.panTo(location) : map.setCenter(location);
  // };

  // const initMap = async (map: kakao.maps.Map) => {};

  // useEffect(() => {
  //   if (initialMapPos && mapInstance.current) {
  //     setCenter(mapInstance.current, initialMapPos, false); // 첫 번째 마커 좌표로 지도 이동
  //   }
  // }, [initialMapPos]);

  return (
    <div>
      {/* <Map width="100%" height="100%" initMap={initMap} />
      <BackButton onClick={onBackHandler} />
      <CurrentPosButton onClick={onCurrentPosHandler} /> */}
    </div>
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
