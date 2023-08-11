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
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new kakao.maps.LatLng(lat, lon);

          displayMarker(map, locPosition, onMarkerClick);
        },
        () => {
          const locPosition = new kakao.maps.LatLng(37.545043, 127.039245);
          displayMarker(map, locPosition, onMarkerClick);
        }
      );
    } else {
      const locPosition = new kakao.maps.LatLng(37.545043, 127.039245);
      displayMarker(map, locPosition, onMarkerClick);
    }
  };

  const displayMarker = (
    map: kakao.maps.Map,
    locPosition: kakao.maps.LatLng,
    onClick?: () => void
  ) => {
    const markerOptions: IMarkerOptions = {
      map: map,
      position: locPosition,
      draggable: true,
    };

    const marker = new kakao.maps.Marker(markerOptions);

    const updateAddressFromPosition = (position: kakao.maps.LatLng) => {
      new kakao.maps.services.Geocoder().coord2Address(
        position.getLng(),
        position.getLat(),
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const detailAddr =
              result[0].road_address?.address_name ||
              result[0].address?.address_name ||
              '';
            if (onAddressUpdate) {
              onAddressUpdate(detailAddr);
            }
          }
        }
      );
    };

    updateAddressFromPosition(locPosition);

    kakao.maps.event.addListener(marker, 'click', () => {
      if (onClick) onClick();
    });

    kakao.maps.event.addListener(marker, 'dragend', () => {
      const position = marker.getPosition();
      updateAddressFromPosition(position);
    });

    map.setCenter(locPosition);
  };

  return <Map width="100%" height="100%" initMap={initMap} />;
};
