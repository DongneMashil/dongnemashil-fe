import React, { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  width: string;
  height: string;
  // initMap?: (map: kakao.maps.Map) => void;
}

const Map = ({ width, height, initMap }: MapProps) => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    // if (initMap) {
    //   initMap(map);
    //   console.log(kakao);
    // }
  }, []);

  return <div id="map" style={{ width, height }}></div>;
};

export default Map;
