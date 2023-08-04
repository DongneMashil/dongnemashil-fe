import React, { useEffect } from 'react';

const { kakao } = window;

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

interface MapProps {
  width: string;
  height: string;
  initMap?: (map: kakao.maps.Map) => void;
}

const Map = ({ width, height, initMap }: MapProps) => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667) as kakao.maps.LatLng,
      level: 3,
    };

    const map = new kakao.maps.Map(container, options) as kakao.maps.Map;
    if (initMap) {
      initMap(map);
    }
  }, []);

  return <div id="map" style={{ width, height }}></div>;
};

export default Map;
