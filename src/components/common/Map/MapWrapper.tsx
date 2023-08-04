import React from 'react';
import Map from './Map';
import { useSetRecoilState } from 'recoil';
import { mapState } from 'recoil/map/map';

const MapWrapper = () => {
  const setMap = useSetRecoilState(mapState);
  // const [map, setMap] = useRecoilState(mapState);

  // const initMap = (newMap: kakao.maps.Map) => {
  //   const updatedMap = setMapState(map, newMap); // 새로운 상태 생성
  //   setMap(updatedMap); // 상태 업데이트
  // };

  // const initMap = (newMap: kakao.maps.Map) => {
  //   const updatedMap = setMapState(map, newMap);
  //   setMap(updatedMap); // 상태 업데이트
  //   kakao.maps.event.addListener(
  //     newMap,
  //     'click',
  //     (mouseEvent: kakao.maps.event.MouseEvent) => {
  //       const latLng = mouseEvent.latLng;
  //       console.log('Clicked at', latLng.getLat(), latLng.getLng());
  //     }
  //   );
  // };

  const initMap = (map: kakao.maps.Map) => {
    setMap(map);
    kakao.maps.event.addListener(map, 'dragend', () => {
      // 지도 중심좌표를 얻어옵니다
      const latlng = map.getCenter();

      const message = '변경된 지도 중심좌표는 ' + latlng.getLat() + ' 이고, ';
      message += '경도는 ' + latlng.getLng() + ' 입니다';

      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = message;
    });
  };
  console.log(Object.isExtensible(initMap));
  return (
    <>
      <Map width="100%" height="100%" initMap={initMap} />
    </>
  );
};

export default MapWrapper;
