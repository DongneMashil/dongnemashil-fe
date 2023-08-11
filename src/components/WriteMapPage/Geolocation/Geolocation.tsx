import React, { useEffect, useRef } from 'react';

interface IProps {
  onMarkerClick?: () => void;
}

export const Geolocation: React.FC<IProps> = ({ onMarkerClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.kakao || !mapRef.current) return;

    const mapOption = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 10,
    };

    const map = new window.kakao.maps.Map(mapRef.current, mapOption);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const locPosition = new window.kakao.maps.LatLng(lat, lon);
        const message = '<div style="padding:5px;">여기에 계신가요?!</div>';

        displayMarker(map, locPosition, message, onMarkerClick);
      });
    } else {
      const locPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
      const message = 'geolocation을 사용할 수 없어요..';

      displayMarker(map, locPosition, message, onMarkerClick);
    }
  }, []);

  const displayMarker = (
    map: any,
    locPosition: any,
    message: string,
    onClick?: () => void
  ) => {
    const marker = new window.kakao.maps.Marker({
      map: map,
      position: locPosition,
    });

    const infowindow = new window.kakao.maps.InfoWindow({
      content: message,
      removable: true,
    });

    window.kakao.maps.event.addListener(marker, 'click', function () {
      infowindow.open(map, marker);
      if (onClick) onClick();
    });

    map.setCenter(locPosition);
  };

  return <div ref={mapRef} style={{ width: '100%', height: '350px' }} />;
};
