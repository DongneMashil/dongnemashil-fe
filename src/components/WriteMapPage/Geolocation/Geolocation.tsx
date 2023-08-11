import Map from 'components/common/Map/Map';
import React from 'react';

interface IProps {
  onMarkerClick?: () => void;
  onAddressUpdate?: (address: string) => void;
}

interface IMarkerOptions {
  map: kakao.maps.Map;
  position: kakao.maps.LatLng;
  draggable: boolean;
}

export const Geolocation: React.FC<IProps> = ({
  onMarkerClick,
  onAddressUpdate,
}) => {
  const initMap = (map: kakao.maps.Map) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const locPosition = new kakao.maps.LatLng(lat, lon);
        const message = '<div style="padding:5px;">여기에 계신가요?!</div>';

        displayMarker(map, locPosition, message, onMarkerClick);
      });
    } else {
      const locPosition = new kakao.maps.LatLng(37.545043, 127.039245);
      const message = 'geolocation을 사용할 수 없어요..';

      displayMarker(map, locPosition, message, onMarkerClick);
    }
  };

  const displayMarker = (
    map: kakao.maps.Map,
    locPosition: kakao.maps.LatLng,
    message: string,
    onClick?: () => void
  ) => {
    const markerOptions: IMarkerOptions = {
      map: map,
      position: locPosition,
      draggable: true,
    };

    const marker = new kakao.maps.Marker(markerOptions);

    const infowindow = new kakao.maps.InfoWindow({
      content: message,
      removable: true,
    });

    kakao.maps.event.addListener(marker, 'click', function () {
      infowindow.open(map, marker);
      if (onClick) onClick();
    });

    kakao.maps.event.addListener(marker, 'dragend', function () {
      const position = marker.getPosition();

      new kakao.maps.services.Geocoder().coord2Address(
        position.getLng(),
        position.getLat(),
        function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            const detailAddr = result[0].road_address?.address_name || '';
            if (onAddressUpdate) {
              onAddressUpdate(detailAddr); // 주소 업데이트를 위한 콜백 함수 호출
            }
          }
        }
      );
    });

    map.setCenter(locPosition);
  };

  return (
      <Map width="100%" height="100%" initMap={initMap} />
  );
};
