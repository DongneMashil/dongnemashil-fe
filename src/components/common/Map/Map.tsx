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

export const Map = ({ width, height, initMap }: MapProps) => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.545043, 127.039245),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    if (initMap) {
      initMap(map);
    }
  }, []);

  return <div id="map" style={{ width, height }}></div>;
};
