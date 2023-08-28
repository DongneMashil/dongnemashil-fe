import React, { useEffect, useRef } from 'react';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);

  useEffect(() => {
    console.log('🗺 map mount start!');
    mapRef.current = document.getElementById('map');

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_KEY}&libraries=services,clusterer,drawing&autoload=false`;

    document.head.appendChild(script);

    script.onload = () => {
      const { kakao } = window;
      console.log('window.kakao ', window.kakao);

      window.kakao.maps.load(() => {
        if (mapRef.current) {
          const options = {
            center: new kakao.maps.LatLng(37.545043, 127.039245),
            level: 3,
          };

          mapRef.current = new kakao.maps.Map(mapRef.current, options);

          if (initMap) {
            initMap(mapRef.current);
          }
        }
      });
    };

    return () => {
      // 지도 클린업
      console.log('🗺 map unmount');
      script.remove();
    };
  }, []);

  return <div id="map" style={{ width, height }}></div>;
};
