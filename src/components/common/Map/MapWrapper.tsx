import React from 'react';
import Map from './Map';
import { useSetRecoilState } from 'recoil';
import { mapState } from 'recoil/map/map';

const MapWrapper = () => {
  const setMap = useSetRecoilState(mapState);

  const initMap = (map: kakao.maps.Map) => {
    setMap(map);
    kakao.maps.event.addListener(
      map,
      'click',
      (mouseEvent: kakao.maps.event.MouseEvent) => {
        const latLng = mouseEvent.latLng;
        console.log('Clicked at', latLng.getLat(), latLng.getLng());
      }
    );
  };
  return (
    <>
      <Map width="100%" height="100%" initMap={initMap} />
    </>
  );
};

export default MapWrapper;
